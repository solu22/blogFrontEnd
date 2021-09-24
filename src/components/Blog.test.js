import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog component', () => {
  let component, updateLike
  const blog = {
    title: 'Testing with react-testing lib by nuru ',
    author: 'nuru',
    url: 'www.test.com',
    likes: 7,
    user: {
      username: 'Rajesh',
    },
  }
  updateLike = jest.fn()
  beforeEach(() => {
    component = render(<Blog blog={blog} updateLike={updateLike} />)
  })

  test('render title and author', () => {


    const show = component.container.querySelector('.show')
    expect(show).toHaveTextContent('Testing with react-testing lib by nuru')
  })

  test('renders blog details after clicking show button',() => {
    const view = component.getByText('view')
    fireEvent.click(view)
    const div = component.container.querySelector('.details')
    expect(div).not.toHaveStyle('display:none')
  })

  test('clicking like button twice event handler is called twice',() => {

    const button =component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(updateLike.mock.calls).toHaveLength(2)

  })

})

//test blog form for adding new blog

describe('BlogForm Component', () => {

  test('<BlogForm /> creates new blog with event handlers', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('input[name="title"]')
    const author = component.container.querySelector('input[name="author"]')
    const url = component.container.querySelector('input[name="url"]')
    const likes = component.container.querySelector('input[name="likes"]')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing with react-test-library' }
    })

    fireEvent.change(author, {
      target: { value: 'tester' }
    })

    fireEvent.change(url, {
      target: { value: 'test.com' }
    })

    fireEvent.change(likes, {
      target: { value: '333' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing with react-test-library' )
    expect(createBlog.mock.calls[0][0].author).toBe('tester' )
    expect(createBlog.mock.calls[0][0].url).toBe('test.com' )
    expect(createBlog.mock.calls[0][0].likes).toBe('333' )
  })
})

