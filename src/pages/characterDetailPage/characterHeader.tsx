import FavoriteToggle from '../../components/favoriteToggle';
import type { CHARACTER } from '../../types';

type CharacterHeaderProps = {
  character: CHARACTER;
  isUpdating: boolean;
  setUpdate: (value: boolean) => void;
};

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character, isUpdating, setUpdate }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-2xl font-bold">{character.properties.name}</h1>

      {isUpdating === false && (
        <div>
          {/* edit */}
          <button
            onClick={() => setUpdate(true)}
            className="mt-4 mr-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Update
          </button>

          <FavoriteToggle character={character!} size="lg" />
        </div>
      )}
    </div>
  );
};

export default CharacterHeader;
