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
        <p data-testid="no-starship-exist" className="text-sm italic text-gray-400 mt-6">
          This character has not piloted any starships.
        </p>
      ) : (
        <div
          data-testid="starship-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {starshipIds.map((id) => {
            const starship: STARSHIP = starshipsById[id];
            return starship ? (
              <StarshipCard data-testid="starship" key={id} starship={starship} />
            ) : null;
          })}
        </div>
      )}
    </section>
  );
};

export default React.memo(StarshipList);
