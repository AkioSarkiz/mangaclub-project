import React from "react";

interface MRatingProps {
  disabled?: boolean;
  checked?: number;
}

const Rating: React.FC<MRatingProps> = ({ disabled = false, checked = 2 }) => {
  const starsLength = 5;

  return (
    <div className="rating rating-sm">
      {Array.from({ length: starsLength }, (_, i) => (
        <input
          key={i}
          type="radio"
          name="rating" // Assuming single rating component usage
          disabled={disabled}
          className="mask mask-star-2 bg-orange-400"
          checked={i + 1 === checked} // Adjust for 1-based indexing
          readOnly // Since it's a visual representation
        />
      ))}
    </div>
  );
};

export default Rating;
