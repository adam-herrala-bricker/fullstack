import { useState } from "react";
import { useDispatch } from 'react-redux'
import { notifier } from '../reducers/notificationReducer'
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, user, handleLike, setBlogs }) => {
  const [unroll, setUnroll] = useState(false);

  const dispatch = useDispatch()

  //event handlers
  const toggleUnroll = () => {
    setUnroll(!unroll);
  };

  const handleDelete = async (blog) => {
    if (
      window.confirm(`Are you sure that you want to remove '${blog.title}'?`)
    ) {
      const response = await blogService.erase(blog);
      if (response.status === 204) {
        setBlogs(blogs.filter((i) => i.id !== blog.id));
        dispatch(notifier(`'${blog.title}' deleted`, 'message', 5));
      }
    }
  };

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
          onClick={() => handleDelete(blog)}
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
