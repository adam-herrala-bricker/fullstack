const router = require('express').Router();
const {Blog} = require('../models');

// MW to check if blog is there
const isBlog = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
}

// GET request for all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// POST request for new blog
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch(error) {
    return res.status(400).json({error});
  }
});

// PUT request to update the number of likes for a blog
// (the request will have the LIKES ONLY!!)
router.put('/:id', isBlog, async (req, res) => {
  if (req.blog) {  // check to make sure it's in there
    req.blog.likes = req.body.likes
    await req.blog.save();
    return res.json(req.blog);
  } else {
    return res.status(404).end();
  }
});

// DELETE request to remove a blog
router.delete('/:id', isBlog, async (req, res) => {
  const thisID = req.params.id;
  // check to make sure it's in there
  if (!req.blog) {
    return res.status(404).json({error: 'entry not found'});
  }

  try {
    await Blog.destroy({where: {id: thisID}})
    return res.status(204).end();
  } catch(error) {
    return res.status(400).json({error});
  }
});

module.exports = router;
