import type { DiaryEntry as DiaryEntryType } from '../types';

interface DiaryEntryProps {
  entry: DiaryEntryType;
}

const DiaryEntry = ({ entry }: DiaryEntryProps) => {
  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>{entry.date}</h3>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
      {entry.comment && <p>comment: {entry.comment}</p>}
    </div>
  );
};

export default DiaryEntry;