import React, { useMemo } from 'react';
import { Card } from './card';
import type { CHARACTER } from '../types';
import { Link } from 'react-router-dom';
import PlanetInfo from './planetInfo';
import type { UpdatedFields } from '../features/characters/updatedCharacterSlice';
import { useAppSelector } from '../store/hooks';
import GenderInfo from './genderInfo';
import FavoriteToggle from './favoriteToggle';

const CharacterCard: React.FC<{ character: CHARACTER }> = ({ character }) => {
  const updated = useAppSelector(
    (state) => state.updatedCharacter.updatedCharactersById[character.uid]
  );
  const latestCharacter: UpdatedFields = {
    ...character?.properties,
    ...updated,
  };

  const { gender, name } = latestCharacter;

  const renderGender = useMemo(() => <GenderInfo gender={gender ?? ''} />, [gender]);

  const renderFavoriteButton = useMemo(
    () => <FavoriteToggle character={character} size="lg" />,
    [character]
  );

  const renderPlanetCard = useMemo(() => {
    return <PlanetInfo planetUrl={character.properties.homeworld} variant="card" />;
  }, [character.properties.homeworld]);

  return (
    <div
      data-testid="character-card"
      data-character-id={character.uid}
      className="relative p-2 group"
    >
      <Link to={`/character/${character.uid}`} state={{ character }}>
        <Card>
          <>
            <div className="flex justify-between items-start mb-10">
              {/* Name + Gender */}
              <div className="flex flex-shrink min-w-0 mr-2 items-center">
                <h2
                  data-testid="character-name"
                  className="text-2xl font-bold text-theme-primary font-display mr-2 truncate"
                  title={name} // shows full name on hover
                >
                  {name}
                </h2>

                {renderGender}
              </div>

              {/* Favorite Button */}
              <div className="flex-shrink-0">{renderFavoriteButton}</div>
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
