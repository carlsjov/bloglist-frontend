import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const handleLike = async (event) => {
    event.preventDefault()
    console.log('liked', blog.title)

    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (Number(blog.likes) + 1),
      user: blog.user,
      id: blog.id
    }
    likeBlog(likedBlog)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if(window.confirm(`Do you want to delete blog ${blog.title}?`)) {
      console.log('deleted:', blog.title)
      deleteBlog(blog)
    }
  }

  if (blog.user.username === user.username) {
    return (
      <div>
      <form>
        <br/>title: {blog.title}<br/> 
        author: {blog.author}<br/> 
        likes: {blog.likes} <button onClick={handleLike}>like</button><br/>
        user: {blog.user.name}<br/>
        <button onClick={handleDelete}>delete</button>
      </form>
    </div>  
    )
  }
  return (
    <div>
      <form onSubmit={handleLike}>
      <br/>title: {blog.title}<br/> 
        author: {blog.author}<br/> 
        likes: {blog.likes} <button onClick={handleLike}>like</button><br/>
        user: {blog.user.name}<br/>
      </form>
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired 
}

export default Blog