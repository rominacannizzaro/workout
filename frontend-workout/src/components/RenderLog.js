import React from 'react'

const RenderLog = ({ log, handleDeleteButton }) => {
   return (
     <li>
       Date: {log.date} -  Workout: {log.workout} 
       <button id={log.id} date={log.date} onClick={handleDeleteButton}>Delete</button>
    </li>
   )
}

export default RenderLog