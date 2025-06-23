import { useLocation, useParams } from 'react-router-dom';
import type { CHARACTER } from '../../types';
import { useGetCharacterByIdQuery } from '../../features/characters/characterApi';
import {
  setUpdatedCharacter,
  type EditedFields,
} from '../../features/characters/editedCharacterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useState } from 'react';
import FilmList from '../../components/filmList';
import StarshipList from '../../components/starshipList';
import CharacterHeader from './characterHeader';
import CharacterDataDisplay from './characterDataDisplay';
import FormActions from '../../components/formAction';

const CharacterDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams(); // get character id in URL
  const location = useLocation();
  // CHARTER as prop
  const characterFromState: CHARACTER | undefined = (location.state as { character?: CHARACTER })
    ?.character;

  // if get in props get use -- or -- call characterById
  const fetchById: boolean = characterFromState === undefined;
  const {
    data: fetchedCharacter,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(id!, {
    skip: !fetchById,
  });

  const character = characterFromState || fetchedCharacter;

  // get edited records
  const edited: EditedFields = useAppSelector((state) => {
    //   // If character is not available yet, return undefined
    if (!character) return {};
    return state.editedCharacter.editedCharactersById[character!.uid];
  });

  // get edited character
  const latestCharacter: EditedFields = {
    ...character?.properties,
    ...edited,
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [editedCharacter, setEditedCharacter] = useState({
    gender: latestCharacter.gender || '',
    height: latestCharacter.height || '',
    mass: latestCharacter.mass || '',
    hair_color: latestCharacter.hair_color || '',
    eye_color: latestCharacter.eye_color || '',
  });

  // return failed conditions
  if (isLoading) return <p className="text-white p-4">Loading character...</p>;
  if (isError || !latestCharacter) return <p className="text-red-400 p-4">Character not found.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(setUpdatedCharacter({ uid: character!.uid, changes: editedCharacter }));
    setEdit(false);
  };

  const onCancel = () => {
    setEditedCharacter({
      gender: latestCharacter.gender || '',
      height: latestCharacter.height || '',
      mass: latestCharacter.mass || '',
      hair_color: latestCharacter.hair_color || '',
      eye_color: latestCharacter.eye_color || '',
    }); // reset edits
    setEdit(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <CharacterHeader character={character!} isUpdating={edit} setUpdate={setEdit} />
      {edit == false && (
        <CharacterDataDisplay
          editableData={latestCharacter}
          homeworldUrl={character!.properties.homeworld}
        />
      )}
      {/* editing section */}
      {edit && (
        <div className="space-y-2 mt-4">
          {['gender', 'height', 'mass', 'hair_color', 'eye_color'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize mb-1">
                {field.replace('_', ' ')}
              </label>
              <input
                type="text"
                name={field}
                value={editedCharacter[field as keyof typeof editedCharacter]}
                onChange={handleChange}
                className="w-full px-3 py-1 border bg-theme-background border-gray-300 rounded-md"
              />
            </div>
          ))}

          <FormActions onSave={handleSave} onCancel={onCancel} />
        </div>
      )}
      {/* films */}
      <FilmList characterId={character!.uid} />
      <br />
      <br />
      {/* starships */}
      <StarshipList characterId={character!.uid} />
    </div>
  );
};

export default CharacterDetailPage;
