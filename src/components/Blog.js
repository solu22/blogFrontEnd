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
          <p className ="show" >
            {blog.title} by {blog.author}
          </p>
          <button onClick={() => setView(!view)}>
            {view ? 'hide' : 'view'}
          </button>

          <div style={viewDetails} className="details">
            <p> {blog.url}</p>
            <p>
              {blog.likes}
              <button onClick={() => updateLike(blog)}>like</button>
            </p>
            <p>B{blog.user.username}</p>
            <button onClick= {() => remove(blog)}>Remove</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Blog
