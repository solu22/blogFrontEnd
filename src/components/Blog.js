import React, { useState } from 'react'

const Blog = ({ blog, updateLike, remove }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const viewDetails = { display: view ? '' : 'none' }

  return (
    <>
      <div style={blogStyle}>
        <div>
          <p>
            {blog.title}
            <button onClick={() => setView(!view)}>
              {view ? 'hide' : 'view'}
            </button>
          </p>
          <div style={viewDetails}>
            <p>Url: {blog.url}</p>
            <p>
            No of Likes: {blog.likes}
              <button onClick={() => updateLike(blog)}>like</button>
            </p>
            <p>Writted by: {blog.author}</p>
            <p>Belongs to User: {blog.user.username}</p>
            <button onClick= {() => remove(blog)}>Remove</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Blog
