const logsRouter = require('express').Router()
const Log = require('../models/log')
const tokenUtils = require('../utils/tokenUtils')

const getTokenFromRequest = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const getUserFromRequest = async (request) => {
  const token = await getTokenFromRequest(request)
  return await tokenUtils.getUserFromToken(token);  
}

logsRouter.get('/', async (request, response) => {
  const user = await getUserFromRequest(request)
  const loggedInUserLogs = await Log.find({ "user": {_id: user._id }})
  response.json(loggedInUserLogs)
})

logsRouter.get('/:id', async (request, response) => {
  const log = await Log.findById(request.params.id)
  if (log) {
    response.json(log)
  } else {
    response.status(404).end()
  }
})

logsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await getUserFromRequest(request)

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