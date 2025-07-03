import React from 'react';
import { useAppSelector } from '../../store/hooks';
import type { FILM } from '../../types';
import FilmCard from './filmCard';

interface FilmListProps {
  characterId: string;
}

const FilmList: React.FC<FilmListProps> = ({ characterId }) => {
  const filmIds = useAppSelector((state) => state.cache.characterToFilms[characterId] || []);
  const filmsById = useAppSelector((state) => state.cache.filmsById);

  // this is unnecessary but sequence of movies matter to me.
  const films: FILM[] = filmIds.map((filmId: string) => filmsById[filmId]);
  films.sort((film1, film2) => film1.properties.episode_id - film2.properties.episode_id);

  return (
    <section aria-label="Character Films">
      <h3 className="text-xl font-semibold text-theme-primary mb-2">Films</h3>
      {filmIds.length === 0 ? (
        <p data-testid="no-film-exist" className="text-sm italic text-gray-400 mt-6">
          This character does not appear in any films.
        </p>
      ) : (
        <div
          data-testid="film-list"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {films.map((film: FILM) => {
            return film ? <FilmCard data-testid="film" key={film.uid} film={film} /> : null;
          })}
        </div>
      )}
    </section>
  );
};

export default React.memo(FilmList);
