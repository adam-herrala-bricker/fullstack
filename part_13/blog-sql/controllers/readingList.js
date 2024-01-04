const router = require('express').Router();
const {ReadingList} = require('../models');
const {tokenExtractor} = require('../util/middleware');

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

// PUT request to set a blog to read (requires authentication)
router.put('/:id', tokenExtractor, async (req, res) => {
  const thisEntry = await ReadingList.findByPk(req.params.id);
  
  if (thisEntry.userId !== req.decodedToken.id) {
    return res.status(401).json({error: 'you can only update your own posts'})
  }

  thisEntry.read = true
  await thisEntry.save();

  res.json(thisEntry);
})

module.exports = router;
