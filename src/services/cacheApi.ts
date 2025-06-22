import { BASE_URL, ENDPOINTS } from '../constants/api.constant';
import type { FILM, STARSHIP, PLANET } from '../types';
import { fetchDetailFromAPI, fetchListFromAPI } from './networkAPI';
import { store } from '../store/store';
import { setPlanets } from '../store/slices/cacheSlice';

// film list
export const fetchFilms = (): Promise<FILM[]> => fetchListFromAPI(BASE_URL + ENDPOINTS.FILM.LIST);

// starship list
export const fetchStarships = (): Promise<STARSHIP[]> =>
  fetchListFromAPI(BASE_URL + ENDPOINTS.STARSHIP.LIST);

// planet by id
// export const fetchPlanetById = (id: string): Promise<PLANET> =>
//   fetchDetailFromAPI(BASE_URL + ENDPOINTS.PLANET.DETAIL(id));
// import type { PLANET } from '../types';
// import { fetchDetailFromAPI } from './networkAPI';
//
//

const planetFetchTracker: Record<string, boolean> = {};

export async function fetchPlanetById(id: string): Promise<PLANET> {
  const state = store.getState();
  const cached = state.cache.planetsById[id];

  if (cached) return cached;

  if (planetFetchTracker[id]) {
    return new Promise((resolve, reject) => {
      const check = setInterval(() => {
        const latest = store.getState().cache.planetsById[id];
        if (latest) {
          clearInterval(check);
          resolve(latest);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(check);
        reject(new Error('Timeout waiting for planet to appear in cache'));
      }, 5000);
    });
  }

  planetFetchTracker[id] = true;

  const planet = await fetchDetailFromAPI<PLANET>(BASE_URL + ENDPOINTS.PLANET.DETAIL(id));
  store.dispatch(setPlanets({ [planet.uid]: planet }));
  return planet;
}
