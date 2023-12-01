const blogsRouter2 = require("express").Router(); //new router object
const Blog = require("../models/blog");


//deleting a single blog
blogsRouter2.delete("/:id", async (request, response) => {
    //find the user ID of the blog creator
    const blog = await Blog.findById(request.params.id);
    //something goes wrong
    if (!blog) {
      response.status(404).json({ error: "requested blog not found" });
    }
    const userID = blog.user.toString();
  
    //token bits
    const tokenUser = request.user;
    if (!tokenUser) {
      response.status(401).json({ error: "valid token required" });
    }
  
    if (tokenUser.id === userID) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).json({ error: "token invalid" });
    }
  });
  
  //update content on an existing blog
  blogsRouter2.put("/:id", async (request, response) => {
    //token bits
    const userInfo = request.user;
  
    if (!userInfo) {
      response.status(401).json({ error: "valid token required" });
    }
  
    const thisID = request.params.id;
    const body = request.body;
    const updates = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user.id,
      comments: body.comments
    };
  
    const savedUpdates = await Blog.findByIdAndUpdate(thisID, updates, {
      new: true,
    });
  
    await savedUpdates.populate("user", { username: 1, name: 1 });
  
    response.json(savedUpdates);
  });
  
  module.exports = blogsRouter2;