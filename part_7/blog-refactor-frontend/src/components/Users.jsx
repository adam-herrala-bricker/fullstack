import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const blogs = useSelector(i => i.blog)
    //array of unique users
    const users = Array.from(new Set(blogs.map(i => i.user.username)))

    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(i =>
                    <tr key = {i}>
                        <td><Link className = 'good-link' to = {`/users/${i}`}>{i}</Link></td>
                        <td>{blogs.filter(j => j.user.username === i).length}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users