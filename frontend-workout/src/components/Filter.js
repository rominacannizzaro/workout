import React from 'react';

const Filter = (props) => {
  return (
    <div>
      <h3 className="bordered-heading">Find a workout log by date:</h3>
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <label>Write a date: </label>
          <input
            value={props.newSearch}
            style={props.searchInputStyle}
            onChange={props.handleNewSearch}
          >
          </input>
          <button type="submit" style={props.buttonStyle} className="btn btn-primary mb-2">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;