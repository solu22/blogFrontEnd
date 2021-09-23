import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername]= useState('')
  const [password, setPassword]= useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event)=>{
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password})
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }

    
  }

  const logout = ()=>{
    setUser(null)
    return window.localStorage.clear()
    
  }
  
 return(
   <>
  {user === null && <div>
          <h2>Log in to application </h2>
      <form onSubmit = {handleLogin}>
        username: <input type = "text" value = {username} name = "Username" onChange = {({target})=> setUsername(target.value)}/>
        password: <input type= "password" value = {password} name = "Password" onChange = {({target})=> setPassword(target.value)}/>
        <button type = "submit">Login</button>
      </form>
    </div>
    }
   {user!== null &&
        <div>
          <h2>Welcome {user?.name}</h2>
          <button onClick = {logout}>LogOut</button>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
   }
  </>
  )
      
}

export default App