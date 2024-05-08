import PropTypes from 'prop-types'
//{ blog, likeBlog, deleteBlog, user }
const Blog = (props) => {
  const handleLike = async (event) => {
    event.preventDefault()
    console.log('liked', props.blog.title)

    const likedBlog = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: (Number(props.blog.likes) + 1),
      user: props.blog.user,
      id: props.blog.id
    }
    props.likeBlog(likedBlog)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if(window.confirm(`Do you want to delete blog ${props.blog.title}?`)) {
      console.log('deleted:', props.blog.title)
      props.deleteBlog(props.blog)
    }
  }

  if (props.blog.user.username === props.user.username) {
    return (
      <div>
      <form>
        <br/>title: {props.blog.title}<br/> 
        author: {props.blog.author}<br/> 
        likes: {props.blog.likes} <button onClick={handleLike}>like</button><br/>
        user: {props.blog.user.name}<br/>
        <button onClick={handleDelete}>delete</button>
      </form>
    </div>  
    )
  }
  return (
    <div>
      <form onSubmit={handleLike}>
      <br/>title: {props.blog.title}<br/> 
        author: {props.blog.author}<br/> 
        likes: {props.blog.likes} <button onClick={handleLike}>like</button><br/>
        user: {props.blog.user.name}<br/>
      </form>
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired 
}

export default Blog