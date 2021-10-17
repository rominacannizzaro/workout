require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors =  require('cors')
const Log = require('./models/log')
const { request } = require('express')

app.use(express.json())

app.use(cors())

app.use(express.static('build'))

morgan.token('body', (request, response) => {
    return request.body
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/api/logs', (request, response) => {
    Log.find({}).then(logs => {
        response.json(logs)
    })
})

app.get('/info', (request, response) => {
    Log.countDocuments().then(result => {
        console.log(`Number of logs: ${result}`)
        const date = new Date()
        response.send(
                `<p>Your logs book has info for a total of ${result} workout logs.</p>
                 <p>${date}</p>`
                )
    })
})

app.get('/api/logs/:id', (request, response, next) => {
    Log.findById(request.params.id)
        .then(log => {
            if(log) {
                response.json(log)
            } else {
                response.status(404).end()
            }
    })
    .catch(error => next(error))    
})

app.delete('/api/logs/:id', (request, response) => {
    Log.findByIdAndRemove(request.params.id)
    .then(log => {
        response.status(204).end()
    })
})

const generateId = () => {
    return Math.floor(Math.random() * (1000 - 1))
}

app.post('/api/logs', (request, response, next) => {
    const body = request.body  
    const log = new Log({  
        date: body.date,
        workout: body.workout,
    })

    log
        .save()
        .then(savedLog => savedLog.toJSON())   
        .then(savedAndFormattedLog => {
          response.json(savedAndFormattedLog)
        })
    .catch(error => next(error)) 
})


app.put('/api/logs/:id', (request, response, next) => {
    const body = request.body

    const log = {
        date: body.date,
        workout: body.workout,
    }

    Log.findByIdAndUpdate(request.params.id, log, { new: true })
        .then(updatedLog => {
            response.json(updatedLog)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    } else if (error.name === 'ValidationError') { 
        return response.status(400).json({ error: error.message })
    }
    next(error)
}


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

app.use(errorHandler) 
