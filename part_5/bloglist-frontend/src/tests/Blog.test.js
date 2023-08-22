import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

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

const user0 = {
    username: 't.ester',
    name: 'Tester Randy'
}


const user1 = {
    username: 'randy_15',
    name: 'Password Randy'
}

test('renders default content', () => {

    //renders the component we're interested in testing
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

test('renders full content on click', async () => {
    //note: don't need to make mock event handler here bc the toggleUnroll EH is inside the Blog component

    render(<Blog blog = {blog} user = {user0}/>)

    //start session to interact with rendered component
    const user = userEvent.setup()

    const button = screen.getByText('view')

    await user.click(button)

    //likes and URL are now rendered
    screen.getByText('test.com/url', {exact: false})
    screen.getByText('17', {exact: false})
})

test.only('clicking like button twice calls like EH twice', async () => {
    //here's the mock EH
    const mockHandler = jest.fn()

    render(<Blog blog = {blog} user = {user0} handleLike = {mockHandler}/>)

    const user = userEvent.setup()
    
    //need to click view button in order to make like button visible
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    //now clicking the like button
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    //check it was clicked twice
    expect(mockHandler.mock.calls).toHaveLength(2)
})