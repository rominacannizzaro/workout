import React from 'react';

const RegisterNewUser = ({
  handleRegisterNewUser,
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
  newName,
  setNewName
}) => (
  <form onSubmit={handleRegisterNewUser}>
    <div className="form-group">
      <label htmlFor="newUsername">Username</label>
      <input
        type="text"
        className="form-control"
        value={newUsername}
        id="newUsername"
        placeholder="Enter your username"
        onChange={({ target }) => setNewUsername(target.value)}
      ></input>
      <small className="form-text text-muted">Min 4 - max 15 characters</small>
    </div>
    <div className="form-group">
      <label htmlFor="newName">Name</label>
      <input
        type="text"
        className="form-control"
        value={newName}
        id="newName"
        placeholder="Enter your name"
        onChange={({ target }) => setNewName(target.value)}
      ></input>
      <small className="form-text text-muted">Min 4 - max 15 characters</small>
    </div>
    <div className="form-group">
      <label htmlFor="newPassword">Password</label>
      <input
        type="password"
        className="form-control"
        value={newPassword}
        id="newPassword"
        placeholder="Enter your password"
        onChange={({ target }) => setNewPassword(target.value)}
      ></input>
    </div>
    <button type="submit" className="btn btn-primary margin-bottom-small margin-top-small">
      Register
    </button>
  </form>
);

export default RegisterNewUser;
