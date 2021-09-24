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
    <div>
      <form onSubmit={addBlog}>
        Title:{' '}
        <input value={newBlog.title} onChange={handleBlogChange} name="title" />
        Author:{' '}
        <input
          value={newBlog.author}
          onChange={handleBlogChange}
          name="author"
        />
        Url:{' '}
        <input value={newBlog.url} onChange={handleBlogChange} name="url" />
        Likes:{' '}
        <input value={newBlog.likes} onChange={handleBlogChange} name="likes" />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm
