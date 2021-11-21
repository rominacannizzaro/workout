const router = require('express').Router()
const Log = require('../models/log')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Log.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router