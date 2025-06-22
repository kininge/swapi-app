import React from 'react';
import { Card } from './card';
import type { CHARACTER } from '../types';
import { Link } from 'react-router-dom';
import PlanetInfo from './planetInfo';
import FavoriteToggle from './favoriteToggle'; // 📦 Reusable favorite toggle
import type { EditedFields } from '../store/slices/editedCharacterSlice';
import { useAppSelector } from '../store/hooks';

const CharacterCard: React.FC<{ character: CHARACTER }> = ({ character }) => {
  const edited: EditedFields = useAppSelector((state) => {
    // If character is not available yet, return undefined
    if (!character) return {};
    return state.editedCharacter.editedCharactersById[character!.uid];
  });
  const latestCharacter: EditedFields = {
    ...character?.properties,
    ...edited,
  };

  const { gender, name } = latestCharacter;

  return (
    <div className="relative p-2 group">
      <Link to={`/character/${character.uid}`} state={{ character }}>
        <Card title={name ?? ''}>
          <>
            {/* ❤️ Favorite button in top right corner */}
            <div className="absolute top-2 right-2 z-10">
              <FavoriteToggle character={character} size="md" />
            </div>

            <div>Gender: {gender}</div>
            <div>
              Hometown:&nbsp;
              <PlanetInfo planetUrl={character.properties.homeworld} />
            </div>
          </>
        </Card>
      </Link>
    </div>
  );
};

export default CharacterCard;
