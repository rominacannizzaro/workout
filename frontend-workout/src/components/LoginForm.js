import React from 'react';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <form onSubmit={handleLogin}>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        className="form-control"
        value={username}
        id='username'
        placeholder="Enter your username"
        onChange={({ target }) => setUsername(target.value)}
      ></input>
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        type='password'
        className="form-control"
        value={password}
        id='password'
        placeholder="Enter your password"
        onChange={({ target }) => setPassword(target.value)}
      ></input>
    </div>
    <button type="submit" id='login-button' className="btn btn-primary margin-bottom-small margin-top-small">
      Log in
    </button>
  </form>
);

export default LoginForm;