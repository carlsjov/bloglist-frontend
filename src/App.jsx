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
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrormessage('wrong username or password')
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App