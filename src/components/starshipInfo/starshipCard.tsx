import React from 'react';
import type { STARSHIP } from '../../types';

interface StarshipCardProps {
  starship: STARSHIP;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
  const { name, model, starship_class } = starship.properties;
  return (
    <div className="aspect-[9/16] bg-theme-secondary rounded-lg shadow-md overflow-hidden p-3 flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">{name}</h4>
        <p className="text-sm text-gray-400">{model}</p>
      </div>
      <p className="text-xs text-gray-500 mt-2">Class: {starship_class}</p>
    </div>
  );
};

export default StarshipCard;
