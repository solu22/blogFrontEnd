import React from 'react'
import  PropTypes  from 'prop-types'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
      username:{' '}
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      password:{' '}
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
        <button id="login" type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm
