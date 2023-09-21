const listHelper = require("../utils/list_helper");

const emptyList = [];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const threeItemList = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "64db289de6a8f978faf5050c",
    title: "every blog, ranked",
    author: "Matt Matthews",
    url: "deadspin.com/blog-ranked",
    likes: 10,
    __v: 0,
  },
  {
    _id: "64db35af9a9396950c3b6502",
    title: "every dog, ranked",
    author: "Dave Davies",
    url: "deadspin.com/dog-ranked",
    likes: 40,
    __v: 0,
  },
];

const daveList = [
  {
    _id: "aaaaaaaaaaaaa",
    title: "How to juggle",
    author: "Randy",
    url: "juggle.org/blog",
    likes: 15,
    __v: 0,
  },
  {
    _id: "bbbbbbbbbbbb",
    title: "How to cook",
    author: "Dave",
    url: "cook.org/blog",
    likes: 17,
    __v: 0,
  },
  {
    _id: "ccccccccccccc",
    title: "How to podcast",
    author: "Nancy",
    url: "podcast.org/blog",
    likes: 15000,
    __v: 0,
  },
  {
    _id: "dddddddddddddd",
    title: "How to blog",
    author: "Dave",
    url: "blog.org/how-to",
    likes: 3,
    __v: 0,
  },
];

const lindaList = [
  {
    _id: "eeeeeeeeeeee",
    title: "Making soup",
    author: "Linda",
    url: "wikipedia.org/soup",
    likes: 47,
    __v: 0,
  },
  {
    _id: "ffffffffffffff",
    title: "Making stew",
    author: "Alex",
    url: "wikipedia.org/stew",
    likes: 49,
    __v: 0,
  },
  {
    _id: "ggggggggggggg",
    title: "Making gumbo",
    author: "Linda",
    url: "wikipedia.org/gumbo",
    likes: 54,
    __v: 0,
  },
  {
    _id: "hhhhhhhhhhh",
    title: "Fixing bad stew",
    author: "Linda",
    url: "wikipedia.org/stew_fix",
    likes: 12,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("empty list returns 0", () => {
    const results = listHelper.totalLikes(emptyList);
    expect(results).toBe(0);
  });

  test("when list has only one blog, equals the likes of that blog", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("3 item list returns the expected amount", () => {
    const result = listHelper.totalLikes(threeItemList);
    expect(result).toBe(55);
  });
});

describe("favorite blog", () => {
  test("empty list returns empty", () => {
    const result = listHelper.favoriteBlog(emptyList);
    expect(result).toEqual([]);
  });

  test("single entry list returns that single entry", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("works for 3 item list", () => {
    const result = listHelper.favoriteBlog(threeItemList);
    const expectedResult = {
      _id: "64db35af9a9396950c3b6502",
      title: "every dog, ranked",
      author: "Dave Davies",
      url: "deadspin.com/dog-ranked",
      likes: 40,
      __v: 0,
    };
    expect(result).toEqual(expectedResult);
  });
});

describe("most blogs", () => {
  test("list with most (2) by Dave", () => {
    const result = listHelper.mostBlogs(daveList);
    const expectedResults = { author: "Dave", blogs: 2 };
    expect(result).toEqual(expectedResults);
  });

  test("list with most (3) by Linda", () => {
    const result = listHelper.mostBlogs(lindaList);
    const expectedResults = { author: "Linda", blogs: 3 };
    expect(result).toEqual(expectedResults);
  });
});

describe("most likes", () => {
  test("list with most likes (15000) by Nancy", () => {
    const result = listHelper.mostLikes(daveList); //ignore the unfortunate name
    const expectedResults = { author: "Nancy", likes: 15000 };
    expect(result).toEqual(expectedResults);
  });

  test("list with most likes (113) by Linda", () => {
    const result = listHelper.mostLikes(lindaList);
    const expectedResults = { author: "Linda", likes: 113 };
    expect(result).toEqual(expectedResults);
  });

  test("list with the most likes (40) by Dave Davies", () => {
    const result = listHelper.mostLikes(threeItemList);
    const expectedResults = { author: "Dave Davies", likes: 40 };
    expect(result).toEqual(expectedResults);
  });
});
