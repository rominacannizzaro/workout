const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const logSchema = new mongoose.Schema({
    date: { 
        type: String, 
        required: true, 
        unique: true, 
        minLength: 4 },
    workout: { 
        type: String, 
        required: true, 
        minLength: 4 },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
logSchema.plugin(uniqueValidator, { runValidators: true, context: 'query' });  

logSchema.set('toJSON', {                          
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Log', logSchema)
