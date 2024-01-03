const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {User} = require('../models');
const {USER_SECRET} = require('../util/config');

// POST request to log in
router.post('/', async (req, res) => {
  const {username, password} = req.body;
  const thisUser = await User.findOne({where: {username: username}}); // this is why it'd really be nice if the unique validator was working!!

  const passwordCorrect = thisUser === null
    ? false // so bcrypt doesn't try to compare null.password
    : await bcrypt.compare(password, thisUser.passwordHash);

  if (!passwordCorrect) {
    return res.status(404).json({error: "username or password incorrect"});
  }

  const userObject = {
    id: thisUser.id,
    username: thisUser.username
  };

  const token = jwt.sign(userObject, USER_SECRET);

  res.status(200).send({...userObject, token});
});

module.exports = router;
