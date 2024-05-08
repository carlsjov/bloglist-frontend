import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


//loppui aika kesken, en saanut löytämään input boxia
//minulla on myös noita input boxeja useampia ja löysin että jos textboxeja saisi nimettyä niin saisi tuolla {name: } tavalla
//mahdollisesti tämänkin toimimaan ja laittamaan inputin oikeaan boxiin
test('BlogForm returns correct data', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()

    render(<BlogForm createBlog={createBlog} setErrorCode={mockHandler} setErrormessage={mockHandler2}/>)
    
    const input = screen.getByRole('textbox', {name: 'title'})
    const sendButton = screen.getByText('submit')

    await user.type(input, 'testing')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing')
      
})