const blogsRouter = require('express').Router() //new router object
const Blog = require ('../models/blog')

//NOTE: refactored to use async/await

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  if(blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  //probably not the correct way to do this, but otherwise it wants to throw a 500
  if (!blog.title | !blog.url) {
    response.status(400).end()
  }

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
  
  
})

module.exports = blogsRouter