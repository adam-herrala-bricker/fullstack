import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import Create from './components/Create'
import Users from './components/Users'
import AddedBlogs from './components/AddedBlogs'
import SingleBlog from './components/SingleBlog'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { toggleView } from './reducers/viewReducer'
import { login, logout, setUser } from './reducers/userReducer'
import { notifier } from './reducers/notificationReducer'
import blogService from './services/blogs'
import { Button, Container, Input, Menu, Message, Segment } from 'semantic-ui-react'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(i => i.notification)


  if (notification.message === null) {
    return null
  }


  return (
    <div className = 'notification-container'>
      <Message compact negative = {notification.type === 'error'} header = {notification.type} content = {notification.message} onDismiss = {() => dispatch(notifier(null))}/>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector(i => i.blog)
  const user = useSelector(i => i.user)

  return (
    <div className = 'segment-container'>
      <Segment.Group>
        {blogs.map((blog) => (
          <Segment key={blog.id}>
            <Blog blog={blog} />
          </Segment>
        ))}
      </Segment.Group>
    </div>
  )
}

const LogIn = ({ handleLogin, handleFormChange, username, password }) => {
  return (
    <form autoComplete="off" onSubmit={handleLogin}>
      <div className = 'login-container'>
        <div>
          <h1>Log in to application</h1>
        </div>
        <div>
          username{' '}
          <Input name="Username" value={username} onChange={handleFormChange} />
        </div>
        <div>
          password{' '}
          <Input
            name="Password"
            type="password"
            value={password}
            onChange={handleFormChange}
          />
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </div>
    </form>
  )
}

//prop types
LogIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

const Home = ({ handleLogout }) => {
  const dispatch = useDispatch()

  const view = useSelector(i => i.view)
  const user = useSelector(i => i.user)

  if (user) {
    return (
      <div>
        <Blogs
          handleLogout={handleLogout}
        />
        {view
          ? <Create/>
          : <Button primary onClick = {() => dispatch(toggleView())}>new blog</Button>
        }
      </div>
    )
  }
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(i => i.user)

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //event handlers
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))

    //think it makes sense to keep username and password as regular react states
    setUsername('')
    setPassword('')
  }

  const handleFormChange = (event) => {
    const inputField = event.target.name
    inputField === 'Username' && setUsername(event.target.value)
    inputField === 'Password' && setPassword(event.target.value)
  }

  const handleLogout = () => {
    dispatch(logout())
    setUsername('')
    setPassword('')
    navigate('/')

  }

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, user])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      //console.log(savedUser)
      dispatch(setUser(savedUser))
      blogService.setToken(savedUser.token)
    }
  }, [dispatch])

  return(
    <Container>
      <Notification />
      {user === null ? (
        <LogIn
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleFormChange={handleFormChange}
        />
      ) : (
        <div className = 'menu-container'>
          logged in as {user.name}
          <Menu borderless inverted>
            <Menu.Item><h1>Blog app</h1></Menu.Item>
            <Menu.Item><Link className = 'good-link' to = '/'>home</Link></Menu.Item>
            <Menu.Item><Link className = 'good-link' to = '/users'>users</Link></Menu.Item>
            <Menu.Item><Button primary onClick={handleLogout}>log out</Button></Menu.Item>
          </Menu>
        </div>
      )}
      <Routes>
        <Route path = '/' element = {<Home handleLogout={handleLogout}/>} />
        <Route path = '/users' element = {<Users />} />
        <Route path = '/users/:id' element = {<AddedBlogs />} />
        <Route path = '/blogs/:id' element = {<SingleBlog />} />
      </Routes>
    </Container>

  )
}

export default App
