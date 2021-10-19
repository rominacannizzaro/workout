import React from 'react'


const AddNewLogForm = ( props ) => {

    return (
      <div>
        <form onSubmit={props.addLog}>
          <div className="md-form md-outline input-with-post-icon datepicker" inline="true">
            Date: <input 
              value={props.newDate} 
              onChange={props.handleNewDate}
              placeholder="Select date" 
              type="date" 
              className="form-control"></input>
            <label for="example">Pick a date...</label>
            <i className="fas fa-calendar input-prefix"></i>
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
      </div>
    )
}

export default AddNewLogForm
