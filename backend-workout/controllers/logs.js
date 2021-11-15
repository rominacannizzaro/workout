const logsRouter = require('express').Router()
const Log = require('../models/log')

logsRouter.get('/', async (request, response) => {
  const logs = await Log.find({})
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


logsRouter.post('/', async (request, response) => {
  const body = request.body

  const log = new Log({
      date: body.date,
      workout: body.workout
  })

  const savedLog = await log.save()
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