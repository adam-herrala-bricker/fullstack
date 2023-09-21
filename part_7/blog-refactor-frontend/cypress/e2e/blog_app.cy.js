//note: using the '=>' syntax because that's what cypress used in their example test,
//so I'm gonna assume it's probably fine
//update: oh no! using the arrows has caused the application to explode!!!
//wait. hold on. I'm now getting word that it in fact has not.

describe("Blog app", () => {
  beforeEach(() => {
    //clear test DB each time
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    //then add user to DB each time
    const user = {
      name: "Password Randy",
      username: "randy_1947",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    //then visit the FE
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", () => {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("input[name='Username']").type("randy_1947"); //these use "name" css selectors
      cy.get("input[name='Password']").type("password");
      //cy.contains('login').click() //this would select using the text of the button
      cy.get("#login-button").click(); //this uses the 'id' css selectors

      cy.contains("Logged in as Password Randy");
    });

    it("fails with incorrect password", () => {
      cy.get("input[name='Username']").type("randy_1947");
      cy.get("input[name='Password']").type("passwors");
      cy.get("#login-button").click();

      //should can match partial strings, plus css stuff
      cy.get(".error").should("contain", "username or password incorrect");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", () => {
    beforeEach(() => {
      cy.login({ username: "randy_1947", password: "password" });
    });

    it("A blog can be created", () => {
      cy.contains("new blog").click();

      cy.get("input[name='title']").type("new title");
      cy.get("input[name='author']").type("new author");
      cy.get("input[name='url']").type("new.blog/url");

      cy.contains("create").click();

      //check that notification message works
      cy.get(".message").should("contain", "new title");
      cy.get(".message").should("contain", "new author");

      //title and author displayed in default view
      cy.contains("new title");
      cy.contains("new author");
    });

    it("User can like a blog", () => {
      cy.newBlog({
        title: "every blog, ranked",
        author: "Dave Davies",
        url: "blog.com/ranked",
      });
      cy.contains("view").click();
      cy.contains("like").click();

      cy.contains("likes: 1");
    });

    it("User who creates blog can delete it", () => {
      //create new blog first
      cy.contains("new blog").click();

      cy.get("input[name='title']").type("new title");
      cy.get("input[name='author']").type("new author");
      cy.get("input[name='url']").type("new.blog/url");

      cy.contains("create").click();

      //then delete
      cy.contains("view").click();
      cy.contains("remove").click();

      cy.get("html").should("not.contain", "every blog ranked"); //note the syntax here; html --> entire rendered page
    });

    it("User who didn't create blog doesn't see 'remove' button", () => {
      cy.newBlog({
        title: "every blog, ranked",
        author: "Dave Davies",
        url: "blog.com/ranked",
      });

      cy.contains("view").click();

      //'ded-button' is our css class for a hidden button
      cy.get(".ded-button").should("contain", "remove");
    });

    describe("Sorted by likes", () => {
      beforeEach(() => {
        //four blogs, added out of order but with titles corresponding w ranking
        cy.newBlog({
          title: "title2",
          author: "author2",
          url: "blog.com/url2",
          likes: 700,
        });
        cy.newBlog({
          title: "title1",
          author: "author1",
          url: "blog.com/url1",
          likes: 15000,
        });
        cy.newBlog({
          title: "title4",
          author: "author4",
          url: "blog.com/url4",
          likes: 0,
        });
        cy.newBlog({
          title: "title3",
          author: "author3",
          url: "blog.com/url3",
          likes: 1,
        });
      });

      it("Initial sorting", () => {
        cy.get(".bloggy").eq(0).should("contain", "title1"); //note the syntax for selecting the nth element of the .bloggy css class
        cy.get(".bloggy").eq(1).should("contain", "title2");
        cy.get(".bloggy").eq(2).should("contain", "title3");
        cy.get(".bloggy").eq(3).should("contain", "title4");
      });

      it("Sorting after additional clicks", () => {
        //strategy here is to click title4 multiple times, so it rises above title3
        cy.contains("title4").contains("view").click();

        cy.contains("like").click();
        cy.contains("likes: 1"); //doesn't seem necessary here, but just in case clicking is too fast for state updates
        cy.contains("like").click();

        //now title4 should have moved up
        cy.get(".bloggy").eq(2).should("contain", "title4");
        cy.get(".bloggy").eq(3).should("contain", "title3");
      });
    });
  });
});
