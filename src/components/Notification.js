import React from 'react'

const Notification = ({ message }) => {
  if((!message.type && !message.content))
  {
    return null
  }
  return (
    <div>
      <p className= {message.type === 'success' ? 'success': 'error'}>{message.content}</p>
    </div>
  )
}

export default Notification
