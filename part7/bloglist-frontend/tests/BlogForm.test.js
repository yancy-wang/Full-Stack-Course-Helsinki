import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../src/components/BlogForm';

test('form calls the event handler it received as props with the right details', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('Title');
  const authorInput = screen.getByPlaceholderText('Author');
  const urlInput = screen.getByPlaceholderText('URL');
  const createButton = screen.getByText('create');

  await user.type(titleInput, 'Test Blog');
  await user.type(authorInput, 'aaa');
  await user.type(urlInput, 'http://example.com');
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test Blog',
    author: 'aaa',
    url: 'http://example.com',
  });
});
