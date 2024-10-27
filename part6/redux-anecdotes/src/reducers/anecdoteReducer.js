const initialState = [
  {
    content: 'If it hurts, do it more often',
    id: '1',
    votes: 0
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: '2',
    votes: 0
  },
  {
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    id: '3',
    votes: 0
  },
  {
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    id: '4',
    votes: 0
  },
  {
    content: 'Premature optimization is the root of all evil.',
    id: '5',
    votes: 0
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    id: '6',
    votes: 0
  }
];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find(a => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export const createAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    }
  };
};

export default anecdoteReducer;
