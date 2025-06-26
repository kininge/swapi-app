import { useMemo } from 'react';
import FavoriteToggle from '../../components/favoriteToggle';
import type { CHARACTER } from '../../types';
import GenderInfo from '../../components/genderInfo';

type CharacterHeaderProps = {
  character: CHARACTER;
  isUpdating: boolean;
  setUpdate: (value: boolean) => void;
};

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character, isUpdating, setUpdate }) => {
  const renderFavoriteButton = useMemo(
    () => <FavoriteToggle character={character} size="lg" />,
    [character]
  );

  const renderGender = useMemo(
    () => <GenderInfo gender={character.properties.gender ?? ''} />,
    [character.properties.gender]
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
      {/* Name + Gender */}
      <div className="flex flex-shrink min-w-0 items-center">
        <h2
          data-testid="character-name"
          className="text-2xl font-bold text-theme-primary font-display mr-2 truncate"
          title={character.properties.name}
        >
          {character.properties.name}
        </h2>
        {isUpdating === false && renderGender}
      </div>

      {/* Buttons */}
      {isUpdating === false && (
        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          {renderFavoriteButton}
          <button
            data-testid="update-button"
            onClick={() => setUpdate(true)}
            className="px-4 py-2 rounded bg-theme-primary text-white hover:bg-theme-primaryHover"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterHeader;
