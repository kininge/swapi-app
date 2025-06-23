// features/characters/favoriteCharacterSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CHARACTER } from '../../types';

interface FavoriteState {
  characters: Record<string, CHARACTER>;
}

const initialState: FavoriteState = {
  characters: {},
};

const favoriteCharacterSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<CHARACTER>) => {
      const character = action.payload;
      const id = character.uid;

      if (state.characters[id]) {
        delete state.characters[id];
      } else {
        state.characters[id] = character;
      }
    },
  },
});

export const { toggleFavorite } = favoriteCharacterSlice.actions;
export default favoriteCharacterSlice.reducer;
