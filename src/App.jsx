import { useState, useEffect } from 'react'
import Blog from './components/Blog'
//import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [errorMessage, setErrormessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

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
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }

  const handleLogoff = async () => {
    preventDefault()
    console.log('logging off', user)

    window.localStorage.clear()

    setUser(null)
  }

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
    const response = await blogService.create(newBlog)

    setBlogs(blogs.concat({author: response.author, title: response.title, id:response.id})) 

    setAuthor('')
    setLikes('')
    setTitle('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
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
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogoff}>
        <button type="submit">logout</button>
      </form>
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App