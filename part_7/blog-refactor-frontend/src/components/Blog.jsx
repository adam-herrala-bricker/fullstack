import { useState } from "react"
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user}) => {
  const [unroll, setUnroll] = useState(false);

  const dispatch = useDispatch()

  //event handlers
  const toggleUnroll = () => {
    setUnroll(!unroll);
  };

  const handleDelete = async () => {
    if ( window.confirm(`Are you sure that you want to remove '${blog.title}'?`)) {
      dispatch(deleteBlog(blog))
    }
  };

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }
  

  if (unroll) {
    return (
      <div className="bloggy">
        <p>
          {blog.title} -- {blog.author}{" "}
          <button onClick={toggleUnroll}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button
          className={
            user.username === blog.user.username ? "red-button" : "ded-button"
          }
          onClick={handleDelete}
        >
          remove
        </button>
      </div>
    );
  }

  return (
    <div className="bloggy">
      {blog.title} -- {blog.author} <button onClick={toggleUnroll}>view</button>
    </div>
  );
};

export default Blog;
