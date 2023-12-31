const router = require('express').Router();
const {Op} = require('sequelize'); // Op = "operator" (can't explain why I don't like this syntax)
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
  const search = req.query.search;
  let where = {};

  // add the search term to where
  if (search) {
    where = {
      [Op.or] : {
        title: {[Op.iLike]: `%${search}%`},
        author: {[Op.iLike]: `%${search}%`}
      }
    };
  };

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['username', 'name']
    },
    where,
    order: [['likes', 'DESC']]
  });

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
router.delete('/:id', tokenExtractor, isBlog, async (req, res) => {
  const thisID = req.params.id;
  const thisBlog = await Blog.findByPk(thisID);
  const thisUser = await User.findByPk(req.decodedToken.id);

  // whoops! someone's trying to delete another user's post ... cheeky devil
  if (thisBlog.userId !== thisUser.id) {
    return res.status(401).json({error: 'you can only delete your own posts'});
  }

  await Blog.destroy({where: {id: thisID}})
  return res.status(204).end();
 
});

module.exports = router;
