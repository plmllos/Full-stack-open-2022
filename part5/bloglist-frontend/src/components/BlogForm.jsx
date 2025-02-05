import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={blogTitle}
          name="Title"
          id='blog-title'
          data-testid='blog-title'
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      author:
      <input
        type="text"
        value={blogAuthor}
        name="Author"
        id='blog-author'
        data-testid='blog-author'
        onChange={({ target }) => setBlogAuthor(target.value)}
      />
      <div>
        url:
        <input
          type="text"
          value={blogUrl}
          name="Url"
          id='blog-url'
          data-testid='blog-url'
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
