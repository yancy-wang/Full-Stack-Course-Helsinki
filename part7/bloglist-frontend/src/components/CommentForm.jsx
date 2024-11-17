import React, { useState } from 'react';

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState('');

  const handleAddComment = (event) => {
    event.preventDefault();
    addComment(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleAddComment}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">add comment</button>
    </form>
  );
};

export default CommentForm;
