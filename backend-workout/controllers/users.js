const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.newPassword, saltRounds)

    const user = new User({
        username: body.newUsername,
        name: body.newName,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('logs', { date: 1, workout: 1 })

    response.json(users)
})

module.exports = usersRouter 