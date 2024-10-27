import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../services/anecdotes';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const [_, dispatch] = useNotification();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    if (content.length < 5) {
      dispatch({ type: 'SHOW', payload: 'Anecdote must be at least 5 characters long' });
      setTimeout(() => {
        dispatch({ type: 'HIDE' });
      }, 5000);
      return;
    }

    newAnecdoteMutation.mutate(content, {
      onSuccess: () => {
        dispatch({ type: 'SHOW', payload: `you added '${content}'` });
        setTimeout(() => {
          dispatch({ type: 'HIDE' });
        }, 5000);
      }
    });

    setContent('');
  };

  return (
    <form onSubmit={onCreate}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        name="anecdote"
      />
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
