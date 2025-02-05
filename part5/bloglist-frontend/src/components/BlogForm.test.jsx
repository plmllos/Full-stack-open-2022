import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

test('test for the new blog form', () => {
  const mockCreateBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={mockCreateBlog} />)

  const titleInput = container.querySelector('#blog-title')
  const authorInput = container.querySelector('#blog-author')
  const urlInput = container.querySelector('#blog-url')

  fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
  fireEvent.change(authorInput, { target: { value: 'Test Author' } })
  fireEvent.change(urlInput, { target: { value: 'https://test.com' } })

  const submitButton = container.querySelector('button[type="submit"]')

  fireEvent.click(submitButton)

  expect(mockCreateBlog).toHaveBeenCalledTimes(1)

  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
  })
})