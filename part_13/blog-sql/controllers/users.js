const bcrypt = require('bcrypt');
const router = require('express').Router();
const {Op} = require('sequelize');
const {Blog, User} = require('../models');

// GET request for list of all users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'author', 'id']
    }
  });
  res.json(users);
});

// GET request for just one user
router.get('/:id', async (req, res) => {
  const read = req.query.read;
  let where = {}

  if (read) where = {read}
  
  console.log(where);
  const userID = req.params.id;
  const thisUser = await User.findByPk(userID, {
    attributes: {exclude: ['id', 'createdAt','updatedAt', 'passwordHash']},
    include: [
      {
        model: Blog,
        as: 'marked_readings',
        attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
        through: {
          attributes: ['id', 'read'],
          where // notice that where goes here!!
        }
      }
    ],
  });

  res.json(thisUser);
});

// POST request for adding new user
router.post('/', async (req, res) => {
  const {name, username, password} = req.body;
  const passwordHash = await bcrypt.hash(password, 10); // 10 = salt rounds
  const newUser = await User.create({name, username, passwordHash});
  return res.json(newUser);
});

// PUT request for changing username
router.put('/:username', async (req, res) => {
  const oldUsername = req.params.username;
  const {newUsername} = req.body
  // feels like the more SQL way to do it
  const updates = await User.update({username: newUsername}, {
    where: {username: oldUsername},
    returning: true
  });

  return res.json(updates[1]); // don't need to return the number of changed rows
});

// DELETE request to delete a user by id
router.delete('/:id', async (req, res) => {
  const thisID = req.params.id;
  
  await User.destroy({where: {id: thisID}})
  return res.status(204).end();

});

module.exports = router;
