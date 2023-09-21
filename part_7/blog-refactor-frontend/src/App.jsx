import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import Blog from "./components/Blog";
import Create from "./components/Create";
import blogService from "./services/blogs";
import loginService from "./services/login";
import objectHelper from "./utils/objectHelper";
import { useSelector, useDispatch } from 'react-redux'
import { notifier } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { toggleView } from './reducers/viewReducer'

const Notification = () => {
  const notification = useSelector(i => i.notification)

  if (notification.message === null) {
    return null;
  }

  return (
    <div className = 'notification-container'>
      <div className={notification.type}>{notification.message}</div>
    </div>
  );
};

const Blogs = ({ setBlogs, user, handleLogout }) => {
  const blogs = useSelector(i => i.blog)
  //console.log(blogs)
  //helper function for sorting blogs
  const sortByLikes = (obj1, obj2) => {
    if (obj1.likes < obj2.likes) {
      return 1;
    } else if (obj1.likes > obj2.likes) {
      return -1;
    } else {
      return 0;
    }
  };

  //event handlers
  const handleLike = async (blog) => {
    const thisID = blog.id;
    const updatedEntry = { ...blog, likes: blog.likes + 1 };

    const returnedUpdate = await blogService.update(updatedEntry);

    //update currently displayed blogs
    const replaceIndex = blogs.findIndex((i) =>
      objectHelper.singleEqualityChecker(i, blog),
    );
    setBlogs(blogs.with(replaceIndex, returnedUpdate));
  };

  //sort blogs!
  //blogs.sort(sortByLikes);

  return (
    <div>
      <h2>Blogs</h2>
      <b>Logged in as {user.name} </b>
      <button onClick={handleLogout}>log out</button>
      <p> </p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          user={user}
          setBlogs={setBlogs}
          handleLike={() => handleLike(blog)}
        />
      ))}
    </div>
  );
};

const LogIn = ({ handleLogin, handleFormChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form autoComplete="off" onSubmit={handleLogin}>
        <div>
          username{" "}
          <input name="Username" value={username} onChange={handleFormChange} />
        </div>
        <div>
          password{" "}
          <input
            name="Password"
            type="password"
            value={password}
            onChange={handleFormChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

//prop types
LogIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()

  const view = useSelector(i => i.view)

  //event handlers
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notifier("username or password incorrect", "error", 5));
    }
  };

  const handleFormChange = (event) => {
    const inputField = event.target.name;
    inputField === "Username" && setUsername(event.target.value);
    inputField === "Password" && setPassword(event.target.value);
  };

  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
    window.localStorage.clear();
  };

  //effect hook originally loaded all the blogs on first go
  //seemed like a bad strategy to load everyone's blogs to FE regardless of login
  //changed to only load for one user once that user is login in
  //even better version would only get from that specific user's id, not get all
  //update: changed it back
  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification />
      {user === null ? (
        <LogIn
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleFormChange={handleFormChange}
        />
      ) : (
        <div>
          <Blogs
            user={user}
            handleLogout={handleLogout}
          />
          {view
            ? <Create/> 
            : <button onClick = {() => dispatch(toggleView())}>new blog</button>
          }
        </div>
      )}
    </div>
  );
};

export default App;
