const express = require('express');
const { getAsync } = require('../redis/index');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const entryCounter = await getAsync('added_todos')
  res.send({'added_todos': entryCounter})
})

module.exports = router;
