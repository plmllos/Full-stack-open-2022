import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

test("initialy shows title and author, onClick shows blog's URL and likes", () => {
    const blog = {
      id: '1',
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 10,
    };
  
    render(<Blog blog={blog} showDetails={() => {}} showBlog={null} />);
  
    const blogComponent = screen.getByText('Test Title Test Author');
    const url = screen.queryByText('https://test.com');
    const likes = screen.queryByText('likes 10');

    expect(blogComponent).toBeInTheDocument();
    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  
    const viewButton = screen.getByText('view');
    fireEvent.click(viewButton);
     
    render(<Blog blog={blog} showDetails={() => {}} showBlog="1" />);
  
    expect(screen.getByText('https://test.com')).toBeInTheDocument();
    expect(screen.getByText('likes 10')).toBeInTheDocument();
  });

  test('clicking the button calls event handler twice', async () => {
    const blog = {
      id: '1',
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 10,
    };
  
    const mockHandler = vi.fn();
    
    render(
      <Blog blog={blog} incrementLike={mockHandler} />
    );

    const viewButton = screen.getByText('view');
    fireEvent.click(viewButton);

    const user = userEvent.setup()
    const likeButton = screen.getByText('like');
    await user.click(likeButton)
    await user.click(likeButton)
  
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });