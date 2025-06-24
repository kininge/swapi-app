import React, { useMemo } from 'react';
import { Card } from './card';
import type { CHARACTER } from '../types';
import { Link } from 'react-router-dom';
import PlanetInfo from './planetInfo';
import type { UpdatedFields } from '../features/characters/updatedCharacterSlice';
import { useAppSelector } from '../store/hooks';
import GenderInfo from './genderInfo';

const CharacterCard: React.FC<{ character: CHARACTER }> = ({ character }) => {
  const edited: UpdatedFields = useAppSelector((state) => {
    // If character is not available yet, return undefined
    if (!character) return {};
    return state.editedCharacter.editedCharactersById[character!.uid];
  });
  const latestCharacter: UpdatedFields = {
    ...character?.properties,
    ...edited,
  };

  const { gender, name } = latestCharacter;

  const renderGender = useMemo(() => <GenderInfo gender={gender ?? ''} />, [gender]);

  const renderPlanetCard = useMemo(() => {
    return <PlanetInfo planetUrl={character.properties.homeworld} variant="card" />;
  }, [character.properties.homeworld]);

  return (
    <div className="relative p-2 group">
      <Link to={`/character/${character.uid}`} state={{ character }}>
        <Card>
          <>
            <div className="flex justify-between mb-10">
              {/* character name */}
              <h2 className="text-2xl font-bold text-theme-primary font-display">{name}</h2>

              {/* gender */}
              {renderGender}
            </div>

            {/* planet */}
            {renderPlanetCard}
          </>
        </Card>
      </Link>
    </div>
  );
};

export default React.memo(CharacterCard);
