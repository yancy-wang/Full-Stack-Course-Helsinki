import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { getAllEntries, createEntry } from './services/diaryService';
import DiaryList from './components/DiaryList';
import NewEntryForm from './components/NewEntryForm';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const diaryEntries = await getAllEntries();
        setEntries(diaryEntries);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    void fetchEntries();
  }, []);

  const addEntry = async (entry: NewDiaryEntry) => {
    try {
      const newEntry = await createEntry(entry);
      setEntries(entries.concat(newEntry));
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage = error.response.data?.error || error.response.data || 'Unknown error occurred';
          setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        } else if (error.request) {
          // The request was made but no response was received
          setError('No response received from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          setError('Error setting up request');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <NewEntryForm onSubmit={addEntry} error={error} />
      <DiaryList entries={entries} />
    </div>
  );
};

export default App;