import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleCreate = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter blog author"
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter blog URL"
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
