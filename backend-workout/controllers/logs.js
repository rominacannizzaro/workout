const logsRouter = require('express').Router()
const Log = require('../models/log')

logsRouter.get('/', (request, response) => {
  Log.find({}).then(logs => {
    response.json(logs)
  })
})

logsRouter.get('/:id', (request, response, next) => {
    Log.findById(request.params.id)
      .then(log => {
        if (log) {
          response.json(log)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

  logsRouter.post('/', (request, response, next) => {
    const body = request.body
  
    const log = new Log({
        date: body.date,
        workout: body.workout
    })
  
    log.save()
      .then(savedLog => {
        response.json(savedLog)
      })
      .catch(error => next(error))
  })

  logsRouter.delete('/:id', (request, response, next) => {
    Log.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
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