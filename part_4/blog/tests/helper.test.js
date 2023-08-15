const listHelper = require('../utils/list_helper')

const emptyList = []
    
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
    ]

const threeItemList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        },
    {
        _id: '64db289de6a8f978faf5050c',
        title: 'every blog, ranked',
        author: "Matt Matthews",
        url: "deadspin.com/blog-ranked",
        likes : 10,
        __v: 0
    },
    {
        _id: '64db35af9a9396950c3b6502',
        title: 'every dog, ranked',
        author: 'Dave Davies',
        url: 'deadspin.com/dog-ranked',
        likes: 40,
        __v: 0
    }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
      test('empty list returns 0', () => {
        const results = listHelper.totalLikes(emptyList)
        expect(results).toBe(0)
      })
    
      test('when list has only one blog, equals the likes of that blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('3 item list returns the expected amount', () => {
        const result = listHelper.totalLikes(threeItemList)
        expect(result).toBe(55)
    })

})

describe('favorite blog', () => {
    test('empty list returns empty', () =>  {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual([])
    })

    test('single entry list returns that single entry', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('works for 3 item list', () => {
        const result = listHelper.favoriteBlog(threeItemList)
        const expectedResult = {
            _id: '64db35af9a9396950c3b6502',
            title: 'every dog, ranked',
            author: 'Dave Davies',
            url: 'deadspin.com/dog-ranked',
            likes: 40,
            __v: 0
        }
        expect(result).toEqual(expectedResult)
    })





})