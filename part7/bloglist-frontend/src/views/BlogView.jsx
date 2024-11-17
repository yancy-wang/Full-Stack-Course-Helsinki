import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import CommentForm from '../components/CommentForm';

const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  if (!blog) return null;

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeBlog(blog.id, updatedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const addComment = (comment) => {
    const updatedBlog = {
      ...blog,
      comments: [...blog.comments, comment],
    };
    dispatch(likeBlog(blog.id, updatedBlog)); // Using `likeBlog` to update comments.
  };

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <button onClick={handleDelete}>delete</button>
      <h3>comments</h3>
      <CommentForm addComment={addComment} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView; // Ensure this line exports the component as default
