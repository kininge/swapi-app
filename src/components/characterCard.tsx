import React from 'react';
import { Card } from './card';
import type { CHARACTER } from '../types';
import { Link } from 'react-router-dom';
import PlanetInfo from './planetInfo';
import FavoriteToggle from './favoriteToggle';
import type { EditedFields } from '../features/characters/editedCharacterSlice';
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
        <Card>
          <>
            <div className="flex justify-between mb-10">
              <h2 className="text-2xl font-bold text-theme-primary font-display">{name}</h2>

              <div className="flex">
                <div className="text-2xl">{gender}</div>
                <div className="ml-5">
                  <FavoriteToggle character={character} size="lg" />
                </div>
              </div>
            </div>

            <PlanetInfo planetUrl={character.properties.homeworld} />
          </>
        </Card>
      </Link>
    </div>
  );
};

export default CharacterCard;
