// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Slices
import characterReducer from '../features/characters/characterSlice';
import favoriteReducer from '../features/characters/favoriteCharacterSlice';
import editReducer from '../features/characters/editCharacterSlice';
import filmsReducer from '../features/films/filmsSlice';
import starshipsReducer from '../features/starships/starshipsSlice';

// RTK Query
import { planetAPI } from '../features/planets/planetAPI';

// ✅ Per-slice persist configs
const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const editsPersistConfig = {
  key: 'edits',
  storage,
};

const planetApiPersistConfig = {
  key: 'planetAPI',
  storage,
  whitelist: ['queries'], // only persist cache, not mutation state
};

const rootReducer = combineReducers({
  character: characterReducer,
  favorites: persistReducer(favoritesPersistConfig, favoriteReducer),
  edits: persistReducer(editsPersistConfig, editReducer),
  films: filmsReducer,
  starships: starshipsReducer,
  [planetAPI.reducerPath]: persistReducer(planetApiPersistConfig, planetAPI.reducer),
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
