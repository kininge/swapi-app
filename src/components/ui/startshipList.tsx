import React from 'react';
import { useAppSelector } from '../../store/hooks';

interface StarshipListProps {
  characterId: string;
}

const StarshipList: React.FC<StarshipListProps> = ({ characterId }) => {
  const starshipIds = useAppSelector((state) => state.cache.characterToStarship[characterId] || []);
  const starshipsById = useAppSelector((state) => state.cache.starshipById);

  if (starshipIds.length === 0) {
    return (
      <p className="text-sm italic text-gray-400">This character does not pilot any starships.</p>
    );
  }

  return (
    <>
      <h3>Starships</h3>
      <ul className="list-disc list-inside text-blue-300">
        {starshipIds.map((id) => {
          const ship = starshipsById[id];
          return <li key={id}>{ship?.properties.name ?? 'Unknown Starship'}</li>;
        })}
      </ul>
    </>
  );
};

export default StarshipList;
