const logsRouter = require('express').Router()
const Log = require('../models/log')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

logsRouter.get('/', async (request, response) => {
  const logs = await Log.
    find({}).populate('user', { username: 1, name: 1 })

  response.json(logs)
})

logsRouter.get('/:id', async (request, response) => {
  const log = await Log.findById(request.params.id)
  if (log) {
    response.json(log)
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

logsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const log = new Log({
      date: body.date,
      workout: body.workout,
      user: user._id
  })

  const savedLog = await log.save()
  user.logs = user.logs.concat(savedLog._id)
  await user.save()

  response.json(savedLog)
})

logsRouter.delete('/:id', async (request, response) => {
  await Log.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


logsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const log = {
      date: body.date,
      workout: body.workout
  }

  Log.findByIdAndUpdate(request.params.id, log, { new: true })
      .then(updatedLog => {
          response.json(updatedLog)
      })
      .catch(error => next(error))
})

module.exports = logsRouter