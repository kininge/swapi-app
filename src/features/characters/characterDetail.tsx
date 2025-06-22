import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/ui/loader';
import { Error } from '../../components/ui/error';

const CharacterDetail: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const { data, error, isLoading } = useGetCharacterByIdQuery(characterId || '');

  if (isLoading) return <Loader />;
  if (error || !data?.result) return <Error message="Character not found." />;

  const character = data.result.properties;

  return (
    <div className="p-6 text-theme-text max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
      <ul className="space-y-2 text-lg">
        <li>
          <strong>Birth Year:</strong> {character.birth_year}
        </li>
        <li>
          <strong>Gender:</strong> {character.gender}
        </li>
        <li>
          <strong>Height:</strong> {character.height} cm
        </li>
        <li>
          <strong>Mass:</strong> {character.mass} kg
        </li>
        <li>
          <strong>Skin Color:</strong> {character.skin_color}
        </li>
        <li>
          <strong>Eye Color:</strong> {character.eye_color}
        </li>
      </ul>
    </div>
  );
};

export default CharacterDetail;
