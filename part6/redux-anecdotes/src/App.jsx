import React from 'react';
import { NotificationProvider } from './contexts/NotificationContext';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  return (
    <NotificationProvider>
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </NotificationProvider>
  );
};

export default App;
