import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders content', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test.com/url',
        likes: 17,
        user: {
            username: 't.ester',
            name: 'Tester Randy',
            id: 'tttttttttttttttttttttttt'
        }
    }

    render(<Blog blog= {blog}/>)

    //renders title by default
    screen.getByText('test title', {exact: false}) //exact: false --> does it contain the text?

    //renders author by default
    screen.getByText('test author', {exact: false})

    //doesn't render likes or URL by default
    const likes = screen.queryByText('test.com/url', {exact: false}) //queryByText is used here bc it doesn't return an exception if the element isn't found
    expect(likes).toBeNull()

    const url = screen.queryByText('17', {exact: false})
    expect(url).toBeNull
})