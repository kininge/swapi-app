import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';
import type { FILM, STARSHIP, PLANET } from '../../types';
import { store, type RootState } from '../../store/store';
import { setPlanets } from '../cache/cacheSlice';
import { fetchDetailFromAPI, fetchListFromAPI } from '../../services/networkAPI';

// film list
export const fetchFilms = (): Promise<FILM[]> => fetchListFromAPI(BASE_URL + ENDPOINTS.FILM.LIST);

// starship list
export const fetchStarships = (): Promise<STARSHIP[]> =>
  fetchListFromAPI(BASE_URL + ENDPOINTS.STARSHIP.LIST);

const planetFetchTracker: Record<string, boolean> = {};

export async function fetchPlanetById(id: string): Promise<PLANET | null> {
  const state: RootState = store.getState();
  const cached = state.cache.planetsById[id];

  // if exist in cache
  if (cached) return cached;

  // if api ready called
  if (planetFetchTracker[id]) return null;

  try {
    planetFetchTracker[id] = true;
    const planet = await fetchDetailFromAPI<PLANET>(BASE_URL + ENDPOINTS.PLANET.DETAIL(id));
    store.dispatch(setPlanets({ [planet.uid]: planet }));
    return planet;
  } catch (e) {
    planetFetchTracker[id] = false;
    throw e;
  }
}
