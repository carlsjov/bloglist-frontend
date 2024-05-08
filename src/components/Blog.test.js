import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'



test('renders content', () => {
    const user = {
        username: "käyttäjä",
        name: "käyttäjän nimi"
    }
    
    const blog = {
        title: 'Testi otsikko',
        author: "tekijä",
        url: "tsivu.fi",
        likes: 1,
        user: {
        username: "käyttäjä",
        name: "käyttäjän nimi"
        }
    }


    // En tiedä olisiko tätä tarvinnut tehdä, konsoliin tulee virheilmoitusta ettei likeBlogia tai deleteBlogia ole määritetty, 
    //testit menivät silti jo läpi ennen näiden lisäystä tähän (LISÄYS: ennen nappien painelutestejä tehty kommentti)
    const likeBlog = (blogObject) => {
        const likedId = blogObject.id
        blogService.like(blogObject).then(returned => {
          setBlogs(blogs.map(n => n.id === likedId ? blogObject : n))
        })
      }
    
      const deleteBlog = (blogObject) => {
        const deletedBlog = blogObject.id
        console.log(blogs.filter(n => n.id !== deletedBlog))
        blogService.del(blogObject).then(returned => {
          setBlogs(blogs.filter(n => n.id !== deletedBlog))
        })
      }

    render(<Blog blog={blog} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog}/>)

    const element = screen.getByText('Testi otsikko', { exact: false })
    const element2 = screen.getByText('tekijä', { exact: false })

    expect(element).toBeDefined()
    expect(element2).toBeDefined()
})

test('clickin the like button', async () => {
    const user2 = {
        username: "käyttäjä",
        name: "käyttäjän nimi"
    }

    const blog = {
        title: 'Testi otsikko',
        author: "tekijä",
        url: "tsivu.fi",
        likes: 1,
        user: {
        username: "käyttäjä",
        name: "käyttäjän nimi"
        }
    }

    /*const likeBlog = (blogObject) => {
        const likedId = blogObject.id
        blogService.like(blogObject).then(returned => {
          setBlogs(blogs.map(n => n.id === likedId ? blogObject : n))
        })
      }
    
      const deleteBlog = (blogObject) => {
        const deletedBlog = blogObject.id
        console.log(blogs.filter(n => n.id !== deletedBlog))
        blogService.del(blogObject).then(returned => {
          setBlogs(blogs.filter(n => n.id !== deletedBlog))
        })
      }*/
    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()

    render(<Blog blog={blog} user={user2} likeBlog={mockHandler} deleteBlog={mockHandler2}/>)
    
    const user = userEvent.setup()
    const button = await screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})