"use client";

import React from "react";

type RatingProps = {
  value: number;
  outOf?: number;
  starCount?: number;
  size?: number;
};

const Rating: React.FC<RatingProps> = ({
  value,
  outOf = 10,
  starCount = 5,
  size = 18,
}) => {
  const normalizedRating = (value / outOf) * starCount;
  const fullStars = Math.floor(normalizedRating);
  const halfStar = normalizedRating - fullStars >= 0.5;
  const emptyStars = starCount - fullStars - (halfStar ? 1 : 0);

  return (
    <span className="flex items-center gap-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} style={{ fontSize: size }}>
          ★
        </span>
      ))}

      {halfStar && <span style={{ fontSize: size }}>⭐</span>}

      {[...Array(emptyStars)].map((_, i) => (
        <span
          key={`empty-${i}`}
          className="text-gray-300"
          style={{ fontSize: size }}
        >
          ★
        </span>
      ))}

      <span className="text-sm text-gray-600 ml-1">({value})</span>
    </span>
  );
};

export default Rating;
