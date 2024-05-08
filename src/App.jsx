import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrormessage] = useState(null)
  const [errorCode, setErrorCode] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in' ,username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrormessage('wrong username or password')
      setErrorCode("1")
      setTimeout(() => {
        setErrormessage(null)
        setErrorCode('')
      }, 5000)
    }
  }

  const handleLogoff = async (event) => {
    event.preventDefault()
    console.log('logging off', user)

    window.localStorage.clear()

    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returned => {
      setBlogs(blogs.concat(returned))
    })
  }

  const likeBlog = (blogObject) => {
    const likedId = blogObject.id
    blogService.like(blogObject).then(returned => {
      setBlogs(blogs.map(n => n.id === likedId ? blogObject : n))
    })
  }

  if (user === null) {
    return (
      <div>
    <Notification message={errorMessage} code={errorCode}/>
    <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} code={errorCode}/>
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogoff}>
        <button type="submit">logout</button>
      </form>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} setErrormessage={setErrormessage} setErrorCode={setErrorCode} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog}/>
      )}
    </div>
  )
}

export default App