const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI  

console.log('connecting to', url)

mongoose.connect(url)  
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const logSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true, minLength: 4 },
    workout: { type: String, required: true, minLength: 4 }
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
