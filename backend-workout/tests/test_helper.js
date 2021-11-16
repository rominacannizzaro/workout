const Log = require('../models/log')
const User = require('../models/user')

const initialLogs = [
    {
        date: '2021-10-10',
        workout: 'Yoga'
    },
    {
        date: '2021-11-11',
        workout: 'Core workout'
    },
]

const nonExistingId = async () => {
    const log = new Log({ date: 2020-12-12, workout: 'willremovethissoon' })
    await log.save()
    await log.remove()
    
    return log._id.toString()
}

const logsInDb = async () => {
    const logs = await Log.find({})
    return logs.map(log => log.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialLogs, 
    nonExistingId, 
    logsInDb,
    usersInDb,
}