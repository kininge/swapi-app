import React from 'react';
import { useAppSelector } from '../../store/hooks';

interface FilmListProps {
  characterId: string;
}

const FilmList: React.FC<FilmListProps> = ({ characterId }) => {
  const filmIds = useAppSelector((state) => state.cache.characterToFilms[characterId] || []);
  const filmsById = useAppSelector((state) => state.cache.filmsById);

  if (filmIds.length === 0) {
    return (
      <p className="text-sm italic text-gray-400">This character does not appear in any films.</p>
    );
  }

  return (
    <>
      <h3>Films</h3>
      <ul className="list-disc list-inside text-yellow-300">
        {filmIds.map((filmId) => {
          const film = filmsById[filmId];
          return <li key={filmId}>{film?.properties.title ?? 'Unknown Film'}</li>;
        })}
      </ul>
    </>
  );
};

export default FilmList;
