import type { ContentProps } from '../types';
import Part from './Part';

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;