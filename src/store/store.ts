// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage

import characterReducer from '../features/characters/characterSlice';
import searchedCharacterReducer from '../features/characters/searchSlice';
import cacheReducer from '../features/cache/cacheSlice';
import favoriteReducer from '../features/characters/favoriteSlice';
import updatedCharacterReducer from '../features/characters/updatedCharacterSlice';
import { characterAPI } from '../features/characters/characterApi';

// persist config for cache
const cachePersistConfig = {
  key: 'cache',
  storage,
};
const favoritesPersistConfig = {
  key: 'favorite',
  storage,
};
const updatedCharacterPersistConfig = {
  key: 'updatedCache',
  storage,
};
const rootReducer = combineReducers({
  [characterAPI.reducerPath]: characterAPI.reducer,
  characters: characterReducer,
  searchedCharacters: searchedCharacterReducer,
  cache: persistReducer(cachePersistConfig, cacheReducer),
  favorite: persistReducer(favoritesPersistConfig, favoriteReducer),
  updatedCharacter: persistReducer(updatedCharacterPersistConfig, updatedCharacterReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(characterAPI.middleware), // added character api as middleware
});

export const persistor = persistStore(store);
export default rootReducer;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
