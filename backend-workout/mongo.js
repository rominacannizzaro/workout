const mongoose = require('mongoose')

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const logSchema = new mongoose.Schema({
    name: String, 
    number: String
})

const Log = mongoose.model ('Log', logSchema)


const log = new Log({
    date: dateToAdd,
    workout: workoutToAdd,
})


log.save().then(result => {
    console.log('---new log added!---')
    mongoose.connection.close()
})

Log.find({}).then(result => {
      console.log('Workout logs:')
      result.forEach(log => {
      console.log(log.date + ' ' + person.workout)
  })
  mongoose.connection.close()
})

