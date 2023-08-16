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

const blogToAdd = {
    title: 'The Star Wars',
    author: 'George Lucas',
    url: 'wookepedia.org',
    likes: 15000
}

const blogMissingLikes = {
    title: 'Oh really, Mr. Nixon?',
    author: 'Neil Young',
    url: 'pono.org/blog'
}

const blogMissingTitle = {
    author: 'Randy',
    url: 'blog.org/untitled',
    likes: 5000
}

const blogMissingURL = {
    title: 'We are soup',
    author: 'A Soup',
    likes: 12
}

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

test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('contains id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]['id']).toBeDefined
})

test('adding a blog increases total number by 1', async () => {
    await api.post('/api/blogs').send(blogToAdd)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

test('adding blog returns object with same properties', async () => {
    const response = await api.post('/api/blogs').send(blogToAdd)
    expect(response.body.author).toEqual('George Lucas')
    expect(response.body.title).toEqual('The Star Wars')
})

test('added blog is in DB', async () => {
    const postResponse = await api.post('/api/blogs').send(blogToAdd)
    
    const getResponse = await api.get('/api/blogs')
    expect(getResponse.body).toContainEqual(postResponse.body)
})

test('missing likes --> 0 likes', async () => {
    const postResponse = await api.post('/api/blogs').send(blogMissingLikes)
    expect(postResponse.body.likes).toEqual(0)
})

test('missing title --> 400', async () => {
    await api.post('/api/blogs').send(blogMissingTitle)
    .expect(400)
})

test('missing url --> 400', async () => {
    await api.post('/api/blogs').send(blogMissingURL)
    .expect(400)
})

test('delete --> 204', async () => {
    //need to get id of blog to delete
    const getResponse = await api.get('/api/blogs' )
    deleteID = getResponse.body[0].id
    
    await api.delete(`/api/blogs/${deleteID}`)
    .expect(204)
})

test('delete results in one less blog on list', async () => {
    const getResponse = await api.get('/api/blogs' )
    const deleteID = getResponse.body[0].id

    await api.delete(`/api/blogs/${deleteID}`)

    const newGetResponse = await api.get('/api/blogs' )
    expect(newGetResponse.body).toHaveLength(getResponse.body.length - 1)
})

test('updated likes (100) works', async () => {
    //need to get id of blog to update
    const getResponse = await api.get('/api/blogs')
    const body = getResponse.body[0]
    const updateID = getResponse.body[0].id

    const newBlog = {title : body.title, author: body.author, url: body.url, likes: 100}

    const response = await api.put(`/api/blogs/${updateID}`).send(newBlog) //note the syntax!!
    
    expect(response.body.likes).toEqual(100)
})

afterAll(async () => {
    await mongoose.connection.close()
  })