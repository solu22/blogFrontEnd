import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  })

  const handleBlogChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setNewBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
    })
    setNewBlog(' ')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        Title:{' '}
        <input value={newBlog.title} onChange={handleBlogChange} name="title" id="title"/>
        Author:{' '}
        <input
          value={newBlog.author}
          onChange={handleBlogChange}
          name="author"
          id="author"
        />
        Url:{' '}
        <input value={newBlog.url} onChange={handleBlogChange} name="url" id="url"/>
        Likes:{' '}
        <input value={newBlog.likes} onChange={handleBlogChange} name="likes" id="likes" />
        <button id="save" type="submit" >Save</button>
      </form>
    </div>
  )
}

export default BlogForm
