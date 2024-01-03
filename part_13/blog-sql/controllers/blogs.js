const router = require('express').Router();
const {tokenExtractor} = require('../util/middleware');
const {Blog, User} = require('../models');

// MW to check if blog is there
const isBlog = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) throw Error('entry not found'); // notice that the error is thrown HERE!!
  next();
}

// GET request for all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// POST request for new blog
router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date()
  });
  return res.json(blog);
});

// PUT request to update the number of likes for a blog
// (the request will have the LIKES ONLY!!)
router.put('/:id', isBlog, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save();
  return res.json(req.blog);
});

// DELETE request to remove a blog
router.delete('/:id', isBlog, async (req, res) => {
  const thisID = req.params.id;

  await Blog.destroy({where: {id: thisID}})
  return res.status(204).end();
 
});

module.exports = router;
