import React from 'react';
import { useAppSelector } from '../../store/hooks';
import type { STARSHIP } from '../../types';
import StarshipCard from './starshipCard';

interface StarshipListProps {
  characterId: string;
}

const StarshipList: React.FC<StarshipListProps> = ({ characterId }) => {
  const starshipIds = useAppSelector((state) => state.cache.characterToStarship[characterId] || []);
  const starshipsById = useAppSelector((state) => state.cache.starshipById);

  return (
    <section aria-label="Character Starships">
      <h3 className="text-xl font-semibold text-theme-primary mb-2">Starships</h3>
      {starshipIds.length === 0 ? (
        <p className="text-sm italic text-gray-400 mt-6">
          This character has not piloted any starships.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {starshipIds.map((id) => {
            const starship: STARSHIP = starshipsById[id];
            return starship ? <StarshipCard key={id} starship={starship} /> : null;
          })}
        </div>
      )}
    </section>
  );
};

export default StarshipList;
