import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../../services/characterApi';
import type { CHARACTER } from '../../types';
import FilmList from '../../components/filmList';
import StarshipList from '../../components/starshipList';
import FavoriteToggle from '../../components/favoriteToggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCharacterEdits, type EditedFields } from '../../store/slices/editedCharacterSlice';

const CharacterDetailPage: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const characterFromState = (location.state as { character?: CHARACTER })?.character;

  const shouldFetch = !characterFromState;
  const {
    data: fetchedCharacter,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(id!, {
    skip: !shouldFetch,
  });
  const character = characterFromState || fetchedCharacter;

  const edited: EditedFields = useAppSelector((state) => {
    // If character is not available yet, return undefined
    if (!character) return {};
    return state.editedCharacter.editedCharactersById[character!.uid];
  });

  const latestCharacter: EditedFields = {
    ...character?.properties,
    ...edited,
  };

  const [editedCharacter, setEditedCharacter] = useState({
    gender: latestCharacter.gender || '',
    height: latestCharacter.height || '',
    mass: latestCharacter.mass || '',
    hair_color: latestCharacter.hair_color || '',
    eye_color: latestCharacter.eye_color || '',
  });

  if (isLoading) return <p className="text-white p-4">Loading character...</p>;
  if (isError || !character) return <p className="text-red-400 p-4">Character not found.</p>;

  const { birth_year, eye_color, gender, hair_color, height, mass, name } = latestCharacter;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(setCharacterEdits({ uid: character.uid, changes: editedCharacter }));
    setEdit(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      {/* header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{name}</h1>

        {edit === false && (
          <div>
            {/* edit */}
            <button
              onClick={() => setEdit(true)}
              className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </button>

            <FavoriteToggle character={character} size="lg" />
          </div>
        )}
      </div>
      {edit == false && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <strong>Hair color:</strong> {hair_color || 'Unknown'}
          </div>
          <div>
            <strong>Eye color:</strong> {eye_color || 'Unknown'}
          </div>
          <div>
            <strong>Gender:</strong> {gender || 'Unknown'}
          </div>
          <div>
            <strong>Birth Year:</strong> {birth_year || 'Unknown'}
          </div>
          <div>
            <strong>Height:</strong> {height ? `${height} cm` : 'Unknown'}
          </div>
          <div>
            <strong>Mass:</strong> {mass ? `${mass} kg` : 'Unknown'}
          </div>
          {/* <div>
          <strong>Homeworld:</strong> {planetName}
        </div> */}
        </div>
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

          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setEditedCharacter({
                gender: latestCharacter.gender || '',
                height: latestCharacter.height || '',
                mass: latestCharacter.mass || '',
                hair_color: latestCharacter.hair_color || '',
                eye_color: latestCharacter.eye_color || '',
              }); // reset edits
              setEdit(false);
            }}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
      {/* films */}
      <FilmList characterId={character.uid} />
      <br />
      <br />
      {/* starships */}
      <StarshipList characterId={character.uid} />
    </div>
  );
};

export default CharacterDetailPage;
