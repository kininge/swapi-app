import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../../services/characterApi';
import type { CHARACTER } from '../../types';
import FilmList from '../../components/filmList';
import StarshipList from '../../components/starshipList';
import FavoriteToggle from '../../components/favoriteToggle';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
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

  if (isLoading) return <p className="text-white p-4">Loading character...</p>;
  if (isError || !character) return <p className="text-red-400 p-4">Character not found.</p>;

  const { birth_year, eye_color, gender, hair_color, height, mass, name } = character.properties;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <FavoriteToggle character={character} size="lg" />
      </div>
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
