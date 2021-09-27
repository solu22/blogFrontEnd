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
          <button onClick={() => setView(!view)} id="view">
            {view ? 'hide' : 'view'}
          </button>

          <div style={viewDetails} className="details">
            <p> {blog.url}</p>
            <p className= "blog-likes">
              {blog.likes}
              <button onClick={() => updateLike(blog)} id="like">like</button>
            </p>
            <p>B{blog.user.username}</p>
            <button onClick= {() => remove(blog)} id="remove">Remove</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Blog
