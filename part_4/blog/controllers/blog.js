const blogsRouter = require('express').Router() //new router object
const Blog = require ('../models/blog')
const User = require('../models/user')

//NOTE: refactored to use async/await

//getting all the blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

  if(blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})
  
//posting a new blog
blogsRouter.post('/', async (request, response) => {
  //const user = await User.findById(body.userId)
  const user = await User.findById('64dccbf65717056c369fa8bf') //temp stand-in

  const blog = new Blog({...request.body, user: user.id})
  
  //probably not the correct way to do this, but otherwise it wants to throw a 500
  if (!blog.title | !blog.url) {
    response.status(400).end()
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

//deleting a single blog
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//update content on an existing blog
blogsRouter.put('/:id', async (request, response) => {
  const thisID = request.params.id
  const body = request.body
  const updates = {title: body.title, author: body.author, url: body.url, likes: body.likes}

  const savedUpdates = await Blog.findByIdAndUpdate(thisID, updates, {new: true})
  response.json(savedUpdates)
})

module.exports = blogsRouter