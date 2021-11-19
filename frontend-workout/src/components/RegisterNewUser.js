import React from 'react'

const RegisterNewUser = ({
    handleRegisterNewUser,
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    newName,
    setNewName,
}) => (
    <form onSubmit={handleRegisterNewUser}>
      <div>
        Username: (min 5 characters - max 15 characters) 
          <input
            type="text"
            value={newUsername}
            name="newUsername"
            onChange={({ target }) => setNewUsername(target.value)}
          >
          </input>
      </div>
      <div>
        Name: (min 5 characters - max 15 characters)  
          <input
            type="text"
            value={newName}
            name="newName"
            onChange={({ target }) => setNewName(target.value)}
          >
          </input>
      </div>
      <div>
        Password: 
          <input
            type="password"
            value={newPassword}
            name="newPassword"
            onChange={({ target }) => setNewPassword(target.value)}
          >
          </input>
      </div>
      <br></br>
      <button id='register-button' type="submit">Register</button>
    </form>
  )

  export default RegisterNewUser