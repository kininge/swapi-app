import { combineReducers } from '@reduxjs/toolkit';
import characterReducer from '../../features/characters/characterSlice';
import updatedCharacterReducer from '../../features/characters/updatedCharacterSlice';
import favoriteReducer from '../../features/characters/favoriteSlice';
import searchReducer from '../../features/characters/searchSlice';
import cacheReducer from '../../features/cache/cacheSlice';

const testRootReducer = combineReducers({
  character: characterReducer,
  updatedCharacter: updatedCharacterReducer,
  favorite: favoriteReducer,
  searchedCharacters: searchReducer,
  cache: cacheReducer,
});

export type TestRootState = ReturnType<typeof testRootReducer>;
export default testRootReducer;
