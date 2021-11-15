const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Log = require('../models/log')

beforeEach(async () => {
    await Log.deleteMany({})
    await Log.insertMany(helper.initialLogs)
  })

describe('when there is initially some logs saved', () => {
    test('logs are returned as json', async () => {
        console.log('entered test')
        await api
            .get('/api/logs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all logs are returned', async () => {
        const response = await api.get('/api/logs')
    
        expect(response.body).toHaveLength(helper.initialLogs.length)
    })
    
    test('a specific log is within the returned logs', async () => {
        const response = await api.get('/api/logs')
    
        const workouts = response.body.map(r => r.workout)
        expect(workouts).toContain('Yoga')
    })    
})


describe('viewing a specific log', () => {
    test('succeeds with a valid id', async () => {
        const logsAtStart = await helper.logsInDb()
    
        const logToView = logsAtStart[0]
    
        const resultLog = await api
            .get(`/api/logs/${logToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(resultLog.body).toEqual(logToView)
    })

    test('fails with status code 404 if log does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()
    
        await api
          .get(`/api/logs/${validNonexistingId}`)
          .expect(404)
      })
  
      test('fails with status code 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'
  
        await api
          .get(`/api/logs/${invalidId}`)
          .expect(400)
      })
})

describe('addition of a new log', () => {
    test('succeeds with valid data', async () => {
        const newLog = {
            date: '2021-01-01',
            workout: 'Salsa class',
        }
    
        await api
            .post('/api/logs')
            .send(newLog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const logsAtEnd = await helper.logsInDb()
        expect(logsAtEnd).toHaveLength(helper.initialLogs.length + 1)
    
        const workouts = logsAtEnd.map(l => l.workout)
        expect(workouts).toContain('Salsa class')
    })

    test('fails with status code 400 if data is invalid', async () => {
        const newLog = {
            date: '2021-03-03'
        }
    
        await api   
            .post('/api/logs')
            .send(newLog)
            .expect(400)
        
        const logsAtEnd = await helper.logsInDb()
    
        expect(logsAtEnd).toHaveLength(helper.initialLogs.length)
    })
})


describe('deletion of a log', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const logsAtStart = await helper.logsInDb()
        const logToDelete = logsAtStart[0]
    
        await api
            .delete(`/api/logs/${logToDelete.id}`)
            .expect(204)
    
        const logsAtEnd = await helper.logsInDb()
    
        expect(logsAtEnd).toHaveLength(
            helper.initialLogs.length - 1
        )
    
        const workouts = logsAtEnd.map(r => r.workout)
    
        expect(workouts).not.toContain(logToDelete.workout)
    })
})


afterAll(() => {
    mongoose.connection.close()
})