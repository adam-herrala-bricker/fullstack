const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

//testing from the same state every time
const initialBlogs = [
    {
        title: 'every blog, ranked',
        author: "Matt Matthews",
        url: "deadspin.com/blog-ranked",
        likes : 10,
    },
    {
        title: 'every dog, ranked',
        author: 'Dave Davies',
        url: 'deadspin.com/dog-ranked',
        likes: 40,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 0 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test.only('contains id property', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]['id']).toBeDefined
})

afterAll(async () => {
    await mongoose.connection.close()
  })