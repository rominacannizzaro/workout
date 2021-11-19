const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 4,
        maxLength: 15
    },
    name: {
        type: String,
        minLength: 4,
        maxLength: 15
    },
    passwordHash: String,
    logs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Log'
        }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // password is not revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User