import React, { useState, useEffect } from 'react'
import RenderLog from './components/RenderLog'
import AddNewLogForm from './components/AddNewLogForm.js'
import Filter from './components/Filter'
import logService from './services/logs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import RegisterNewUser from './components/RegisterNewUser'
import registrationService from './services/registerNewUser'

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

const App = () => {
  const [ listOfLogs, setListOfLogs ] = useState([])
  const [ newDate, setNewDate ] = useState('')
  const [ newWorkout, setNewWorkout ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)  // If login succeeds, the server response (including token and user details) is saved to 'user'.

  const [ newUsername, setNewUsername ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ newName, setNewName ] = useState('')
   
  // If logged-in user's details are found in local storage, save them to the state of the app and to logService
   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWorkoutappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      logService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
    logService
      .getAll()
      .then(response => {
        setListOfLogs(response)
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
  }, [user])

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedWorkoutappUser', JSON.stringify(user)
      )
      setUser(user)
      logService.setToken(user.token)

      logService
      .getAll()
      .then(response => {
        setListOfLogs(response)
      })

      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleRegisterNewUser = async (event) => {
    event.preventDefault()

    try {
      const user = await registrationService.register({
        newUsername, newName, newPassword,
      })

      setNotification('You have successfully registered! Please, log in.')
      setTimeout(() => {
          setNotification(null)
      }, 3000)
      setNewUsername('')
      setNewName('')
      setNewPassword('')
    } catch (error) {
      const validationErrorNotification = error.response.data.error
      const errorMessageValidation = () =>  `${validationErrorNotification}`
      setNotification(errorMessageValidation)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout =  () => {
    window.localStorage.clear()
    logService.setToken('')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Workout Log App</h1>
      <br></br>

      <Notification message={notification} />

      {user === null ?
        <div>
        <h2>Already a user? Please, log in:</h2>
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <br></br>
        <h2>Not a user yet? Please, create your account:</h2>
        <RegisterNewUser  
          handleRegisterNewUser={handleRegisterNewUser}
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          newName={newName}
          setNewName={setNewName}
        /> 
        </div>
        :  
        <div>
          <p>{user.name} is logged in</p>
          <div>
              <button onClick={() => handleLogout()}>
            Log out
              </button>
            </div>
        <h2>Find a workout log by date:</h2>
        <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
        <br></br>
        <h2>Add a new workout log:</h2>
        <br></br>
        <AddNewLogForm  addLog={addLog} newDate={newDate} handleNewDate={handleNewDate} newWorkout={newWorkout} handleNewWorkout={handleNewWorkout} listOfLogs={listOfLogs}/>

        <ul>
          {listOfLogs.filter(log => log.date.toLowerCase().includes(newSearch.toLowerCase())).map(log =>  
            <RenderLog key={log.id} log={log} handleDeleteButton={handleDeleteButton} />
            )} 
        </ul>
        </div>  
      }
    </div>
  )
}

export default App