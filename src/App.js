import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: "",
  });
  const [user, setUser] = useState(null);
  const [message, setMessage]= useState({type:'', content:''})
  
 const fetchBlogData = async()=>{
   const response = await blogService.getAll()
   setBlogs(response)
 }

  useEffect(() => {
    fetchBlogData()
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({type:'success', content:`successfully login welcome ${user.username}`})
    } catch (error) {
      setMessage({type:'error', content:'invalid credentials'})
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  };

  const handleBlogChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObj = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes,
      };
      const blog = await blogService.create(blogObj);
      setMessage({type:'success', content:`A new blog ${blog.title} added`})
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      setBlogs(blogs.concat(blog));

    } catch (error) {
      setMessage({type:'error', content:`something is wrong with the post ${error}`})
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      username:{" "}
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      password:{" "}
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title:{" "}
      <input value={newBlog.title} onChange={handleBlogChange} name="title" />
      Author:{" "}
      <input value={newBlog.author} onChange={handleBlogChange} name="author" />
      Url: <input value={newBlog.url} onChange={handleBlogChange} name="url" />
      Likes:{" "}
      <input value={newBlog.likes} onChange={handleBlogChange} name="likes" />
      <button type="submit">Save</button>
    </form>
  );

  const logout = () => {
    setUser(null);
    return window.localStorage.removeItem("loggedBlogUser");
  };

  return (
    <>
    <Notification message = {message} />
      {user === null && loginForm()}
      {user !== null && 
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
          <div>
            <button onClick={logout}>LogOut</button>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default App;
