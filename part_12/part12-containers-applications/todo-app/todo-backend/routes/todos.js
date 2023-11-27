const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
router.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
router.get('/:id', async (req, res) => {
  const thisID = req.params.id
  const returnedItem = await Todo.findById(thisID)

  // this doesn't work and it's unclear why
  if (!returnedItem) {
    return res.status(404)
  }

  res.send(returnedItem)
});

/* PUT todo. */
router.put('/:id', async (req, res) => {
  const thisID = req.params.id
  const { text, done } = req.body
  const updates = {text, done}
  
  const updatedEntry = await Todo.findByIdAndUpdate(thisID, updates, {new: true})

  res.json(updatedEntry)
});

module.exports = router;
