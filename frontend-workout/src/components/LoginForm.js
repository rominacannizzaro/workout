import React from 'react'

const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
}) => (
    <form onSubmit={handleLogin}>
      <div>
        Username: 
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          >
          </input>
      </div>
      <div>
        Password: 
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          >
          </input>
      </div>
      <br></br>
      <button id='login-button' type="submit">Login</button>
    </form>
  )

  export default LoginForm