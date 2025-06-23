// src/hooks/useCacheBoot.tsx
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCharacterToFilms,
  setCharacterToStarship,
  setFilms,
  setStarship,
} from '../features/cache/cacheSlice';
import { fetchFilms, fetchStarships } from '../features/planets/planetAPI';
import type { RootState } from '../store/store';
import type { FILM, STARSHIP } from '../types';

export const useCacheBoot = () => {
  const dispatch = useDispatch();
  const { filmsById, starshipById } = useSelector((state: RootState) => state.cache);
  const hasBooted = useRef(false);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const preload = async () => {
      try {
        // 🎬 FILMS
        if (Object.keys(filmsById).length === 0) {
          const films = await fetchFilms();
          const filmMap: Record<string, FILM> = {};
          const characterToFilms: Record<string, string[]> = {};

          for (const film of films) {
            const { uid, properties } = film;
            filmMap[uid] = film;

            for (const charUrl of properties.characters ?? []) {
              const id = charUrl.split('/').pop();
              if (!id) continue;

              if (!characterToFilms[id]) characterToFilms[id] = [];
              characterToFilms[id].push(uid);
            }
          }

          dispatch(setFilms(filmMap));
          dispatch(setCharacterToFilms(characterToFilms));
          console.log(`✅ Preloaded ${films.length} films and characterToFilms map`);
        }

        // 🚀 STARSHIPS
        if (Object.keys(starshipById).length === 0) {
          const starships = await fetchStarships();
          const starshipMap: Record<string, STARSHIP> = {};
          const characterToStarship: Record<string, string[]> = {};

          for (const ship of starships) {
            const { uid, properties } = ship;
            starshipMap[uid] = ship;

            for (const pilotUrl of properties.pilots ?? []) {
              const id = pilotUrl.split('/').pop();
              if (!id) continue;

              if (!characterToStarship[id]) characterToStarship[id] = [];
              characterToStarship[id].push(uid);
            }
          }

          dispatch(setStarship(starshipMap));
          dispatch(setCharacterToStarship(characterToStarship));
          console.log(`✅ Preloaded ${starships.length} starships and characterToStarship map`);
        }
      } catch (err) {
        console.error('⚠️ Cache boot failed:', err);
      }
    };

    preload();
  }, [dispatch, filmsById, starshipById]);
};
