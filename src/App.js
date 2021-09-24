import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggalable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ type: '', content: '' })

  const fetchBlogData = async () => {
    const response = await blogService.getAll()
    setBlogs(response)
  }

  useEffect(() => {
    fetchBlogData()
  }, [])

  useEffect(() => {
    const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedBlogUserJSON){
      const user = JSON.parse(loggedBlogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        type: 'success',
        content: `successfully login welcome ${user.username}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage({ type: 'error', content: 'invalid credentials' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObj) => {
    try {
      const blog = await blogService.create(blogObj)
      setMessage({
        type: 'success',
        content: `A new blog ${blog.title} added`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.concat(blog))
    } catch (error) {
      setMessage({
        type: 'error',
        content: `something is wrong with the post ${error}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateLike = async (blog) => {
    const blogOb = {
      ...blog,
      likes: blog.likes + 1,
      user: {
        _id: blog.user.id,
      },
    }
    try {
      const result = await blogService.update(blog.id, blogOb)
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : result)))
      setMessage({
        type: 'success',
        content: `Successfully added Like for ${blogOb.title}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      console.log(exception)
      setMessage({
        type: 'error',
        content: 'problem with updating likes of given block',
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => (
    <Togglable buttonlabel="Log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonlabel="Add new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => {
    setUser(null)
    return window.localStorage.removeItem('loggedBlogUser')
  }

  const remove = async (blog) => {

    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try{
        await blogService.remove(blog)
        setBlogs(blogs.filter((b) => { return b.id!==blog.id} ))
        setMessage({ type:'success', content: `successfully deleted ${blog.title}` })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }

      catch(exception){
        console.log(exception)
        setMessage({ type:'error', content:'cannot delete the blog...' })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    }
  }

  //sort blog by num of likes from max to min

  blogs.sort((a,b) => {
    return b.likes-a.likes
  })

  return (
    <>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>LogOut</button>
          {blogForm()}

          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                setMessage={setMessage}
                updateLike={updateLike}
                remove= {remove}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default App
