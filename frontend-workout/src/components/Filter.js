import React from 'react'

const Filter = ( props ) => {
    return (
        <input 
                value={props.newSearch}
                onChange={props.handleNewSearch} 
        />
    )
}

export default Filter 