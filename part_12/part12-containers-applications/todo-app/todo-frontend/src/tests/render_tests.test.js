import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SingleEntry from '../components/SingleEntry'

test('renders single item', () => {
    const item = {
        _id: '0000001',
        text: 'Never stop never stopping',
        done: false
    }

    render(<SingleEntry todo = {item}/>)

    const element = screen.getByText(item.text)

    expect(element).toBeDefined()
})