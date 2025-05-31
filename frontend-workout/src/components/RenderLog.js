import React from 'react';

const RenderLog = ({ log, handleDeleteButton }) => {
  return (
    <li className="margin-bottom-small">
      <span className="vertical-align-middle">
        Date: {log.date} - Workout: {log.workout}
      </span>
      <button
        id={log.id}
        date={log.date}
        className="btn btn-sm btn-outline-secondary d-block d-md-inline-block ms-md-3 mt-2 mt-md-0"
        onClick={handleDeleteButton}
      >
        Delete
      </button>
    </li>
  );
};

export default RenderLog;
