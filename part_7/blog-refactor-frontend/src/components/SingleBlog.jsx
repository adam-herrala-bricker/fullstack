import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, changeBlog } from '../reducers/blogReducer'
import  {useParams } from 'react-router-dom'

const SingleBlog = () => {
    const [commentField, setCommentField] = useState('')
    const id = useParams().id
    const dispatch = useDispatch()

    const user = useSelector(i => i.user)
    const blogs = useSelector(i => i.blog)

    const blog = blogs.filter(i => i.id === id)[0]

    const handleDelete = async () => {
        if ( window.confirm(`Are you sure that you want to remove '${blog.title}'?`)) {
          dispatch(deleteBlog(blog))
        }
      };
    
    const handleLike = async () => {
        const newBlog = {...blog, likes : blog.likes + 1}
        dispatch(changeBlog(newBlog))
        }

    const handleType = (event) => {
        setCommentField(event.target.value)
        }

    //note: not handling comments like the exercise suggested (via a seperate post request)
    //since comments aren't linked to users, only blogs, extremely unclear why we would need seperate routing
    //to handle adding comments to the DB. they're just an attribute of the blog.
    const handleComment = async (event) => {
        event.preventDefault()
        const newBlog = {...blog, comments : [...blog.comments, commentField]}
        dispatch(changeBlog(newBlog))
        setCommentField('')
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
            className={user.username === blog.user.username ? "red-button" : "ded-button"}
            onClick={handleDelete}>
            remove
          </button>
          <h3>comments</h3>
          <form autoComplete="off" onSubmit = {handleComment}>
            <input name = 'comment' value = {commentField} onChange = {handleType}/>
            <button type = 'submit'>new comment</button>
          </form>
          <ul>
          {blog.comments.map(i => 
            <li key = {i}>{i}</li>)}
          </ul>
        </div>
    )
}


export default SingleBlog