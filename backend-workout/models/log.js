const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    date: { 
        type: String, 
        required: true},
    workout: { 
        type: String, 
        required: true, 
        minLength: 3 },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

logSchema.set('toJSON', {                          
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Log', logSchema)
