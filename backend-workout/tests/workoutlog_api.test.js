const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Log = require('../models/log')
const User = require('../models/user')
const tokenUtils = require('../utils/tokenUtils')

let authHeaderValue;
const password = 'TestPassword';
const name = 'TestUser';
const username = 'TestUsername'

let testUsersOwnLogs;

beforeEach(async () => {
    await Log.deleteMany({})
    await User.deleteMany({})
    await Log.insertMany(helper.initialLogsWithNoUser)
    // Register a new user
    const requestBody = {
        newPassword: password,
        newName: name,
        newUsername: username
    }
    await api.post('/api/users').send(requestBody)
    // Log new user in and get the credentials (bearer token)
    let token;
    await api.post('/api/login').send({
        username,
        password
    }).then(response => {
        token = response.body.token
    })

    authHeaderValue = 'bearer ' + token    
    const user = await tokenUtils.getUserFromToken(token)

    testUsersOwnLogs = [
        {
            date: '2021-10-10',
            workout: 'PowerStep',
            user: user._id
        },
        {
            date: '2021-11-11',
            workout: 'Marathon',
            user: user._id
        },
    ]

    // INSERT USER'S INITIAL LOGS
    await Log.insertMany(testUsersOwnLogs)
  })

describe('when there is initially some logs saved', () => {
    test('logs are returned as json', async () => {
        // Insert bearer token to request header
        await api
            .get('/api/logs')
            .set('Authorization', authHeaderValue)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('two workout logs are returned for user', async () => {
        
        const response = await api
                                .get('/api/logs')
                                .set('Authorization', authHeaderValue)

    
        expect(response.body).toHaveLength(testUsersOwnLogs.length)
    })
    
    test('a specific log is within the returned logs', async () => {
        const response = await api
                                .get('/api/logs')
                                .set('Authorization', authHeaderValue)
    
        const workouts = response.body.map(r => r.workout)
        expect(workouts).toContain('PowerStep')
    })

    test('a log not belonging to the user is not within the returned logs', async () => {
        const response = await api
                                .get('/api/logs')
                                .set('Authorization', authHeaderValue)
    
        const workouts = response.body.map(r => r.workout)
        expect(workouts).not.toContain('Yoga')
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
            .set('Authorization', authHeaderValue)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const logsAtEnd = await helper.logsInDb()
        expect(logsAtEnd).toHaveLength(testUsersOwnLogs.length + helper.initialLogsWithNoUser.length + 1)
    
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
            .set('Authorization', authHeaderValue)
            .expect(400)
        
        const logsAtEnd = await helper.logsInDb()
    
        expect(logsAtEnd).toHaveLength(testUsersOwnLogs.length + helper.initialLogsWithNoUser.length)
    })
})


describe('deletion of a log', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const logsAtStart = await helper.logsInDb()
        const logToDelete = logsAtStart[0]
    
        await api
            .delete(`/api/logs/${logToDelete.id}`)
            .set('Authorization', authHeaderValue)
            .expect(204)
    
        const logsAtEnd = await helper.logsInDb()
    
        expect(logsAtEnd).toHaveLength(
            testUsersOwnLogs.length + helper.initialLogsWithNoUser.length - 1
        )
    
        const workouts = logsAtEnd.map(r => r.workout)
    
        expect(workouts).not.toContain(logToDelete.workout)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            newUsername: 'mford',
            newName: 'Martin Ford',
            newPassword: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.newUsername)
    })

    test('creation fails with proper status code and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            newUsername: 'root',
            newName: 'Superuser',
            newPassword: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})