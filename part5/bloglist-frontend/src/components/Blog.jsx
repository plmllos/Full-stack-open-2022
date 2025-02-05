import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLike }) => {
  const [showBlog, setShowBlog] = useState(null)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDetails = (id) => {
    setShowBlog(showBlog === id ? null : id)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => showDetails(blog.id)}>
          {showBlog === blog.id ? 'hide' : 'view'}
        </button>
      </div>

      {showBlog === blog.id && (
        <div>
          <a>{blog.url}</a>
          <p>
            likes {blog.likes}
            <button className='likeButton'
              onClick={() => {
                incrementLike(blog.id)
              }}
            >
              like
            </button>
          </p>
          <p>{blog.user?.name}</p>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Blog
