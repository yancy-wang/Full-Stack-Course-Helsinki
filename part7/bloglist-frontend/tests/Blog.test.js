import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../src/components/Blog';

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
