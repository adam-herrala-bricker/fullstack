const blogsRouter = require('express').Router() //new router object
const Blog = require ('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {NODE_ENV} = require('../utils/config')

//NOTE: refactored to use async/await

//getting all the blogs
blogsRouter.get('/', async (request, response) => {
  
  //populating breaks the test
  const blogs = NODE_ENV == 'testing' 
  ? await Blog.find({})
  : await Blog.find({}).populate('user', {username: 1, name: 1})

    
  if(blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})
  
//posting a new blog (note that this requires a token now)
blogsRouter.post('/', async (request, response) => {
  //token bits
  const userInfo = request.user

  if (!userInfo) {
    response.status(401).json({ error: 'valid token required' })
  }

  const user = await User.findById(userInfo.id)

  //back to regular bits
  const blog = new Blog({...request.body, user: user.id})
  
  //probably not the correct way to do this, but otherwise it wants to throw a 500
  if (!blog.title | !blog.url) {
    response.status(400).end()
  }

  const savedBlog = await blog.save()
  await savedBlog.populate('user', {username: 1, name: 1}) //note populating the document itself. this so the FE is returned the user within the blog document

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

//deleting a single blog
blogsRouter.delete('/:id', async (request, response) => {
  //find the user ID of the blog creator
  const blog = await Blog.findById(request.params.id)
  //something goes wrong
  if (!blog) {
    response.status(404).json({ error: 'requested blog not found' })
  }
  const userID = blog.user.toString()

  //token bits
  const tokenUser = request.user
  if (!tokenUser) {
    response.status(401).json({ error: 'valid token required' })
  }
  
  if (tokenUser.id === userID) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'token invalid' })
  }

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