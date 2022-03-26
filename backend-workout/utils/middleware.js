const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ 
      error: 'malformatted id' 
    })
  } else if (error.message === 'Log validation failed: date: Path `date` is required.') {
    return response.status(400).json({ 
      error: 'Please, add a date to your new log.' 
   })
  } else if (error.message === 'Log validation failed: workout: Path `workout` is required.') {
    return response.status(400).json({ 
      error: 'Please, add a workout description to your new log.' 
    })
  }  else if (error.message.includes('required')) {
      return response.status(400).json({ 
      error: 'Please, enter the required data.' 
    })
  } else if (error.message.includes('shorter')) {
    return response.status(400).json({ 
    error: 'Please, enter valid data.' 
  })
  } else if (error.message.includes('longer')) {
    return response.status(400).json({ 
    error: 'Please, enter valid data.' 
  })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ 
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Session expired. Please log in again.'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}