import type { DiaryEntry as DiaryEntryType } from '../types';
import DiaryEntry from './DiaryEntry';

interface DiaryListProps {
  entries: DiaryEntryType[];
}

const DiaryList = ({ entries }: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map(entry => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default DiaryList;