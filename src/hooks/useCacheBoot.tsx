import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCharacterToFilms,
  setCharacterToStarship,
  setFilms,
  setStarship,
} from '../store/slices/cacheSlice';
import { fetchFilms, fetchStarships } from '../services/cacheApi';
import type { RootState } from '../store/store';

export const useCacheBoot = () => {
  const dispatch = useDispatch();
  const { filmsById, starshipById } = useSelector((state: RootState) => state.cache);

  const hasBooted = useRef(false); // ✅ Prevents duplicate boot

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const preload = async () => {
      try {
        console.log('filmsById', Object.keys(filmsById).length);
        // 🔁 FILMS
        if (Object.keys(filmsById).length === 0) {
          const films = await fetchFilms();
          console.log('films', films);
          const filmMap: Record<string, (typeof films)[0]> = {};
          const characterToFilms: Record<string, string[]> = {};

          for (const film of films) {
            filmMap[film.uid] = film;
            for (const charUrl of film.properties.characters || []) {
              const id = charUrl.split('/').pop()!;
              if (!characterToFilms[id]) characterToFilms[id] = [];
              characterToFilms[id].push(film.uid);
            }
          }

          dispatch(setFilms(filmMap));
          dispatch(setCharacterToFilms(characterToFilms));
        }
        console.log('starshipById', Object.keys(starshipById).length);
        // 🚀 STARSHIPS
        if (Object.keys(starshipById).length === 0) {
          const starships = await fetchStarships();
          const starshipMap: Record<string, (typeof starships)[0]> = {};
          const characterToStarship: Record<string, string[]> = {};

          for (const ship of starships) {
            starshipMap[ship.uid] = ship;
            for (const pilotUrl of ship.properties.pilots || []) {
              const id = pilotUrl.split('/').pop()!;
              if (!characterToStarship[id]) characterToStarship[id] = [];
              characterToStarship[id].push(ship.uid);
            }
          }

          dispatch(setStarship(starshipMap));
          dispatch(setCharacterToStarship(characterToStarship));
        }
      } catch (err) {
        console.error('⚠️ Cache boot error:', err);
      }
    };

    preload();
  }, [dispatch, filmsById, starshipById]);
};
