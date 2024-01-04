const router = require('express').Router();
const {Blog, ReadingList} = require('../models');

// GET request to see full reading list (not in instructions but I still want this)
router.get('/', async (req, res) => {
  const foundList = await ReadingList.findAll();

  return res.json(foundList);
});

// POST request to add new entry to reading list
router.post('/', async (req, res) => {
  // update read status in blog first
  const thisBlog = await Blog.findByPk(req.body.blogId);
  thisBlog.readStatus = 'unread';
  await thisBlog.save();

  // now add new entry to reading list
  const newEntry = await ReadingList.create({
    blogId: req.body.blogId,
    userId: req.body.userId,
  })

  return res.json(newEntry);
});

module.exports = router;
