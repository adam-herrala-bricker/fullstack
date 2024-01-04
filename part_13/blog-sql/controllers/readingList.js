const router = require('express').Router();
const {ReadingList} = require('../models');

// GET request to see full reading list (not in instructions but I still want this)
router.get('/', async (req, res) => {
  const foundList = await ReadingList.findAll();

  return res.json(foundList);
});

// POST request to add new entry to reading list
router.post('/', async (req, res) => {
  // now add new entry to reading list
  const newEntry = await ReadingList.create({
    blogId: req.body.blogId,
    userId: req.body.userId,
  })

  return res.json(newEntry);
});

module.exports = router;
