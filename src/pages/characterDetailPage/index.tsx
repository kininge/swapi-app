import FilmList from '../../components/filmInfo/filmList';
import StarshipList from '../../components/starshipInfo/starshipList';
import CharacterHeader from './characterHeader';
import CharacterDataDisplay from './characterDataDisplay';
import UpdatingForm from '../../components/updatingForm';
import { useCharacterData } from '../../hooks/useCharacterData';
import { useUpdateCharacter } from '../../hooks/useUpdateCharacter';

const CharacterDetailPage: React.FC = () => {
  const { character, latestCharacter, isLoading, isError } = useCharacterData();
  const { isUpdating, setIsUpdating, updatedCharacter, handleChange, handleSave, handleCancel } =
    useUpdateCharacter(character, latestCharacter);

  // return failed conditions
  if (isLoading)
    return (
      <p data-testid="character-detail-page-loading" className="text-white p-4">
        Loading character...
      </p>
    );
  if (isError || !latestCharacter)
    return (
      <p data-testid="character-not-found" className="text-red-400 p-4">
        Character not found.
      </p>
    );

  return (
    <div data-testid="character-detail-page" className="p-6 max-w-3xl mx-auto text-white">
      {/* header data like ---> character name, update button, favorite button */}
      <CharacterHeader character={character!} isUpdating={isUpdating} setUpdate={setIsUpdating} />

      {/* character details ---> skin_color, hair_color, eye_color, gender, planet, height, mass, birth_year  */}
      {/* character for update ---> skin_color, hair_color, eye_color, gender, height, mass, birth_year  */}
      {isUpdating ? (
        <UpdatingForm
          updatedCharacter={updatedCharacter}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <CharacterDataDisplay
          updatableData={latestCharacter}
          homeworldUrl={character!.properties.homeworld}
        />
      )}
      <br />
      {/* films */}
      <FilmList characterId={character!.uid} />
      <br />
      {/* starships */}
      <StarshipList characterId={character!.uid} />
    </div>
  );
};

export default CharacterDetailPage;
