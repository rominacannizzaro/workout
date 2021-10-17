import React, { useState, useEffect } from 'react'
import RenderLog from './components/RenderLog'
import AddNewLogForm from './components/AddNewLogForm.js'
import Filter from './components/Filter'
import logService from './services/logs'
import Notification from './components/Notification'

const App = () => {
  const [ listOfLogs, setListOfLogs ] = useState([])
  const [ newDate, setNewDate ] = useState('')
  const [ newWorkout, setNewWorkout ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)


  useEffect(() => {
    logService
      .getAll()
      .then(response => {
        setListOfLogs(response)
        console.log(response)
      })
  }, [])

  const addLog = (event) => {
    event.preventDefault()
    const logObject = {
      date: newDate,
      workout: newWorkout
    }
  
  const arrayOfExistingLogs = listOfLogs.map(item => item.date)
  const enteredDateDoesNotExist = (item) => item !== newDate 
  const checkDate = arrayOfExistingLogs.every(enteredDateDoesNotExist) 
  
  const getIdToUpdateFromDate = () => {  
    const arrayWithLogWithWantedDate = listOfLogs.filter(log => log.date === newDate);
    const wantedLog = arrayWithLogWithWantedDate[0];
    const wantedId = wantedLog.id;
    return wantedId;
  }
    
  if(checkDate === false) {
    if (window.confirm(`A workout log has already been added with this date: ${newDate}. Replace the old log with a new one?`)) {
      const idToUpdate = getIdToUpdateFromDate();

      logService
        .update(idToUpdate, logObject)
        .then(updatedLog => {
          const newLogsArray = listOfLogs.map(log => log.date === updatedLog.date ? updatedLog : log)

          setListOfLogs(newLogsArray);
          setNewDate('')
          setNewWorkout('')
          setNotification(
            `The log with the date " ${newDate} " was updated.`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          const errorMessage = () =>  `Information about your log of the date " ${newDate} " was already deleted from server.`
          setNotification(errorMessage)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          })
         }
        }  
        else if (checkDate === true) {
        logService
          .create(logObject)
          .then(returnedLog => {
            setListOfLogs(listOfLogs.concat(returnedLog))
            setNewDate('')
            setNewWorkout('')
            setNotification(
              `A workout log for the date " ${newDate} " was created.`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
      })
    .catch(error => {
        console.log(error.response.data)
        const validationErrorNotification = error.response.data.error
        const errorMessageValidation = () =>  `${validationErrorNotification}`
        setNotification(errorMessageValidation)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const handleNewDate = (event) => {
    setNewDate(event.target.value)
  }

  const handleNewWorkout = (event) => {
    setNewWorkout(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }   

  const handleDeleteButton = (event) => {
    const id = event.target.id  
    const findLogToRemove = listOfLogs.filter(log => log.id.toString() !== id)  
    
  if (window.confirm(`Delete this workout log?`)) {
    logService
    .remove(id)
    .then(setListOfLogs(findLogToRemove))
    }
  }

  return (
    <div>
      <h1>Workout Log App</h1>
      <Notification message={notification} />
      <br></br>
      <div>
        Find a workout log by date:  
        <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      </div>
      <h2>Add a new workout log</h2>
        <p>Write your logs always using the same date format type (for example: DD/MM/YYY or Day Month Year) </p>
        <br></br>
        <AddNewLogForm  addLog={addLog} newDate={newDate} handleNewDate={handleNewDate} newWorkout={newWorkout} handleNewWorkout={handleNewWorkout}/>
      <h2>Your workout logs:</h2>
        <ul>
          {listOfLogs.filter(log => log.date.toLowerCase().includes(newSearch.toLowerCase())).map(log =>  
            <RenderLog key={log.id} log={log} handleDeleteButton={handleDeleteButton} />
            )} 
        </ul>
    </div>
  )
}

export default App