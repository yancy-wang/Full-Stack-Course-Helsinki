import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from '../services/anecdotes';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const filter = useSelector(state => state.filter);
  const [_, notificationDispatch] = useNotification();

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  });

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    }
  });

  const vote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }, {
      onSuccess: () => {
        notificationDispatch({ type: 'SHOW', payload: `you voted '${anecdote.content}'` });
        setTimeout(() => {
          notificationDispatch({ type: 'HIDE' });
        }, 5000);
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
