import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else if (message.includes('failed')) {
    return (
        <div className='errornotification'>
            {message}
        </div>
    )} else if (message.includes('was already deleted')) {
        return (
            <div className='errornotification'>
                {message}
            </div>
    )} else if (message.includes('Wrong credentails')) {
        return (
            <div className='errornotification'>
                {message}
            </div>
    )} else if (message.includes('expired')) {
        return (
            <div className='errornotification'>
                {message}
            </div>
    )} return (
        <div className='successnotification'>
            {message}
        </div>
    )
    
}

export default Notification