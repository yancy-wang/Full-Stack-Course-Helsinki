import { useState } from 'react';
import type { NewDiaryEntry } from '../types';
import { Weather, Visibility } from '../types';

interface NewEntryFormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
  error?: string;
}

const NewEntryForm = ({ onSubmit, error }: NewEntryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!weather || !visibility) {
      return;
    }

    onSubmit({
      date,
      weather,
      visibility,
      comment
    });

    // Reset form
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            date:{' '}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <span>visibility:</span>
          {Object.values(Visibility).map((v) => (
            <label key={v} style={{ marginLeft: '10px' }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
              {v}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <span>weather:</span>
          {Object.values(Weather).map((w) => (
            <label key={w} style={{ marginLeft: '10px' }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
              {w}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            comment:{' '}
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;