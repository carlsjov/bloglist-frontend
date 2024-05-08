import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const user = {
        username: "käyttäjä",
        name: "käyttäjän nimi"
    } 

    // En tiedä olisiko tätä tarvinnut tehdä, konsoliin tulee virheilmoitusta ettei likeBlogia tai deleteBlogia ole määritetty, 
    //testit menivät silti jo läpi ennen näiden lisäystä tähän
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

    const blog = {
        title: 'Testi otsikko',
        author: "tekijä",
        url: "tsivu.fi",
        likes: "37",
        user: {
        username: "käyttäjä",
        name: "käyttäjän nimi"
        }
    }

    render(<Blog blog={blog} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog}/>)

    const element = screen.getByText('Testi otsikko', { exact: false })
    const element2 = screen.getByText('tekijä', { exact: false })

    expect(element).toBeDefined()
    expect(element2).toBeDefined()
})