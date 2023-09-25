import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import  {useParams } from 'react-router-dom'

const SingleBlog = () => {
    const id = useParams().id
    const dispatch = useDispatch()

    const user = useSelector(i => i.user)
    const blogs = useSelector(i => i.blog)
    console.log(id)

    const blog = blogs.filter(i => i.id === id)[0]
    console.log(blog)

    const handleDelete = async () => {
        if ( window.confirm(`Are you sure that you want to remove '${blog.title}'?`)) {
          dispatch(deleteBlog(blog))
        }
      };
    
      const handleLike = async () => {
        dispatch(likeBlog(blog))
      }
    
    if (!blog) {
        return null
    }

    return (
        <div className="bloggy">
          <p>
            {blog.title} -- {blog.author}{" "}
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
    )
}


export default SingleBlog