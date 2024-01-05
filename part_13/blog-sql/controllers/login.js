const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {ActiveSession, User} = require('../models');
const {USER_SECRET} = require('../util/config');

// POST request to log in
router.post('/', async (req, res) => {
  const {username, password} = req.body;
  const thisUser = await User.findOne({where: {username: username}}); // this is why it'd really be nice if the unique validator was working!!

  // can't log in if user is disabled
  if (thisUser.disabled) return res.status(403).json({error: 'user disabled'});

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

  // add user id + token to active sessions
  await ActiveSession.create({userId: thisUser.id, token: token});

  // then send respond
  res.status(200).send({...userObject, token});
});

// DELETE request to log out
router.delete('/', async (req, res) => {
  const authorization = req.get('authorization');
  
  if (!authorization) {
    return res.status(404).end();
  }

  const encodedToken = authorization.substring(7);
  await ActiveSession.destroy({where: {token: encodedToken}});
  return res.status(204).end();
});

module.exports = router;
