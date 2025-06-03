import React from 'react';

interface HealthRatingBarProps {
  rating: number;
  showText: boolean;
}

const HealthRatingBar: React.FC<HealthRatingBarProps> = ({ rating, showText }) => {
  // TODO: Implement the actual HealthRatingBar component rendering based on the rating
  return (
    <div>
      Health Rating: {rating} {showText && '(Text shown)'}
      {/* Add your rating visualization here, e.g., stars or hearts */}
    </div>
  );
};

export default HealthRatingBar; 