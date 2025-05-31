import React from 'react';

const AddNewLogForm = (props) => {
  const renderLogsResultsText = () =>
    props.listOfLogs.length === 0
      ? 'No logs to show. You have not created any logs yet.'
      : 'Your logs:';

  return (
    <div>
      <h3 className="bordered-heading">Add a new workout log:</h3>
      <form className="form-inline" onSubmit={props.addLog}>
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="pickDate">Pick a date: </label>
          <input
            value={props.newDate}
            onChange={props.handleNewDate}
            placeholder="Select date"
            type="date"
            id='pickdate'
            style={props.searchInputStyle}
          />
          <i className="fas fa-calendar input-prefix"></i>
          <br></br>
          <br></br>
          <label htmlFor="newWorkout">Workout description:</label>
          <input
            id='workoutdescription'
            value={props.newWorkout}
            style={props.searchInputStyle}
            onChange={props.handleNewWorkout}
          />
          <button type="submit" id='add-button' style={props.buttonStyle} className="btn btn-primary mb-2 mt-2 mt-md-0">
            Add
          </button>
        </div>
      </form>
      <br></br>
      <h3 className="bordered-heading">{renderLogsResultsText()}</h3>
      <br></br>
    </div>
  );
};

export default AddNewLogForm;
