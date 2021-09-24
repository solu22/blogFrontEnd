import React from 'react'

const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleLogin}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
      username:{" "}
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
      password:{" "}
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
    </form>
        </div>
    )
}

export default LoginForm
