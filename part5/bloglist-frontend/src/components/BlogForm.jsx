import React from 'react';

const BlogForm = ({ handleSubmit, handleInputChange, newBlog }) => {
  return (
    <form onSubmit={(event) => handleSubmit(event, newBlog)}>
      <div>
        Title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleInputChange}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleInputChange}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
