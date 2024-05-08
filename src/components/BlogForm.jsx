import {useState } from 'react'
import PropTypes from 'prop-types' 

const BlogForm = ({ createBlog, setErrorCode, setErrormessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')
    
    const handleBlogpost = async (event) => {
        event.preventDefault()
        console.log('new blogpost', title, author, url, likes)
    
        const newBlog = {
          author: author,
          title: title,
          url: url,
          likes: likes
        }
        console.log(newBlog)
        createBlog(newBlog)
    
        setAuthor('')
        setLikes('')
        setTitle('')
        setUrl('')
    
        setErrorCode("2")
        setErrormessage('Made new blog!')
        setTimeout(() => {
          setErrormessage('')
          setErrorCode('')
        }, 5000)
      }

    return (
    <div>
    <h3>create new</h3>
      <form onSubmit={handleBlogpost}>
        <div>
          title:
          <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
          type="text"
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    setErrorCode: PropTypes.func.isRequired, 
    setErrormessage: PropTypes.func.isRequired
}

export default BlogForm