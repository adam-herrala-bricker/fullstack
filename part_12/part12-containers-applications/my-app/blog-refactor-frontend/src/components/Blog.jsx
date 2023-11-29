import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <div className="bloggy">
      <Link className = 'good-link' to = {`/blogs/${blog.id}`}>
        {blog.title} -- {blog.author}
      </Link>
    </div>
  )
}

export default Blog
