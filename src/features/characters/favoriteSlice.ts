import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CHARACTER } from '../../types';

interface FavoritesState {
  favoriteCharacters: Record<string, CHARACTER>;
}

const initialState: FavoritesState = {
  favoriteCharacters: {},
};

const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<CHARACTER>) {
      const id = action.payload.uid;
      if (state.favoriteCharacters[id]) {
        delete state.favoriteCharacters[id];
      } else {
        state.favoriteCharacters[id] = action.payload;
      }
    },
    updateFavoriteCharacter(
      state,
      action: PayloadAction<{ id: string; updates: Partial<CHARACTER['properties']> }>
    ) {
      const { id, updates } = action.payload;
      if (state.favoriteCharacters[id]) {
        state.favoriteCharacters[id].properties = {
          ...state.favoriteCharacters[id].properties,
          ...updates,
        };
      }
    },
  },
});

export const { toggleFavorite, updateFavoriteCharacter } = favoritesSlice.actions;
export default favoritesSlice.reducer;
