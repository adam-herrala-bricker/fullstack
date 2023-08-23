//note: using the '=>' syntax because that's what cypress used in their example test,
//so I'm gonna assume it's probably fine
//update: oh no! using the arrows has caused the application to explode!!!
//wait. hold on. I'm now getting word that it in fact has not. 

describe('Blog app', () => {
  beforeEach(() => {
    //clear test DB each time
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    //then add user to DB each time
    const user = {
      name: 'Password Randy',
      username: 'randy_1947',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    //then visit the FE
    cy.visit('http://localhost:5173')
  })
  
  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get("input[name='Username']").type('randy_1947') //these use "name" css selectors
      cy.get("input[name='Password']").type('password')
      //cy.contains('login').click() //this would select using the text of the button
      cy.get('#login-button').click() //this uses the 'id' css selectors

      cy.contains('Logged in as Password Randy')
    })

    it('fails with incorrect password', () => {
      cy.get("input[name='Username']").type('randy_1947')
      cy.get("input[name='Password']").type('passwors')
      cy.get('#login-button').click()

      //should can match partial strings, plus css stuff
      cy.get('.error').should('contain', 'username or password incorrect')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'randy_1947', password: 'password' })
    })

    it('A blog can be created', () => {
      cy.contains('new blog').click()

      cy.get("input[name='title']").type('new title')
      cy.get("input[name='author']").type('new author')
      cy.get("input[name='url']").type('new.blog/url')

      cy.contains('create').click()

      //check that notification message works
      cy.get('.message').should('contain', 'new title')
      cy.get('.message').should('contain', 'new author')

      //title and author displayed in default view
      cy.contains('new title')
      cy.contains('new author')

    })

    it('User can like a blog', () => {
      cy.newBlog({title: 'every blog, ranked', author: 'Dave Davies', url: 'blog.com/ranked'})
      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes: 1')
    })

    it('User who creates blog can delete it', () => {
      //create new blog first
      cy.contains('new blog').click()

      cy.get("input[name='title']").type('new title')
      cy.get("input[name='author']").type('new author')
      cy.get("input[name='url']").type('new.blog/url')

      cy.contains('create').click()
      
      //then delete
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('html').should('not.contain', 'every blog ranked') //note the syntax here; html --> entire rendered page
    })

  })
})