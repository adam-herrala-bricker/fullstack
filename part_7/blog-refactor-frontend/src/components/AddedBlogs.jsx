import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AddedBlogs = () => {
    const id = useParams().id
    const blogs = useSelector(i => i.blog)

    const theseBlogs = blogs.filter(i => i.user.username === id)

    return(
        <div>
            <h3>added blogs</h3>
            <ul>
                {theseBlogs.map(i =>
                    <li key = {i.id}>
                        {i.title}
                    </li>)}
            </ul>
        </div>
    )
} 

export default AddedBlogs