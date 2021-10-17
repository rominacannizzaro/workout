import React from 'react'

const AddNewLogForm = ( props ) => {
    return (
        <form onSubmit={props.addLog}>
          <div>
            Date: <input 
            value={props.newDate}
            onChange={props.handleNewDate}
            />
          </div>
          <br></br>
          <div>
            Workout description: <input 
              value={props.newWorkout}
              onChange={props.handleNewWorkout}
            />
          </div>
          <br></br>
          <button type="submit">Add</button>
        </form>
    )
}

export default AddNewLogForm

