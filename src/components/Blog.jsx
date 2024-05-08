const Blog = ({ blog, likeBlog }) => {
  
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

  return (
    <div>
      <form onSubmit={handleLike}>
        {blog.title} {blog.author} {blog.likes} <button type="submit">like</button>
      </form>
    </div>  
  )
}

export default Blog