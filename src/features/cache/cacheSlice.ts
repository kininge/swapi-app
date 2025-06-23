import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { STARSHIP, FILM, PLANET } from '../../types';

interface CacheState {
  filmsById: Record<string, FILM>;
  starshipById: Record<string, STARSHIP>;
  planetsById: Record<string, PLANET>;
  characterToFilms: Record<string, string[]>;
  characterToStarship: Record<string, string[]>;
}

const initialState: CacheState = {
  filmsById: {},
  starshipById: {},
  planetsById: {},
  characterToFilms: {},
  characterToStarship: {},
};

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<Record<string, FILM>>) {
      state.filmsById = action.payload;
    },
    setStarship(state, action: PayloadAction<Record<string, STARSHIP>>) {
      state.starshipById = action.payload;
    },
    setPlanets(state, action: PayloadAction<Record<string, PLANET>>) {
      Object.assign(state.planetsById, action.payload);
    },
    setCharacterToFilms(state, action: PayloadAction<Record<string, string[]>>) {
      state.characterToFilms = action.payload;
    },
    setCharacterToStarship(state, action: PayloadAction<Record<string, string[]>>) {
      state.characterToStarship = action.payload;
    },
  },
});

export const { setFilms, setStarship, setPlanets, setCharacterToFilms, setCharacterToStarship } =
  cacheSlice.actions;

export default cacheSlice.reducer;
