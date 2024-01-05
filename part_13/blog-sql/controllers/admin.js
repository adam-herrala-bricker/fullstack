// This is just a rough-and-ready way to check that the functionality works
// obviously don't do this in a real app
// (at minimum would need admin authentication + more sophisticated handling)
const router = require('express').Router();
const {ActiveSession, User} = require('../models');

// GET request to see all active sessions
router.get('/', async (req, res) => {
  const sessions = await ActiveSession.findAll();

  res.json(sessions);
});

// POST request to enable/disable users
router.post('/', async (req, res) => {
  const {userId, disabled} = req.body;
  if (!userId || disabled === undefined) return res.status(404).json({error: 'user id and status required'});

  // change user status
  const thisUser = await User.findByPk(userId);

  thisUser.disabled = disabled;

  await thisUser.save();
  // if disable --> remove all active sessions
  if (disabled) await ActiveSession.destroy({where: {userId}});

  return res.status(200).json(thisUser);
});


module.exports = router;
