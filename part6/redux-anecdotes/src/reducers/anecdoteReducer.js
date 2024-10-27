// src/reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { getAnecdotes, createAnecdote, updateAnecdote as updateAnecdoteService } from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdoteAction(state, action) {
      return state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
    }
  }
});

export const { setAnecdotes, appendAnecdote, updateAnecdoteAction } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await updateAnecdoteService({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdoteAction(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
