import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CHARACTER } from '../../types';

export type EditedFields = Partial<CHARACTER['properties']>;

interface EditCacheState {
  editedCharactersById: Record<string, EditedFields>;
}

const initialState: EditCacheState = {
  editedCharactersById: {},
};

export const editedCharacterSlice = createSlice({
  name: 'editedCharacter',
  initialState,
  reducers: {
    setCharacterEdits: (state, action: PayloadAction<{ uid: string; changes: EditedFields }>) => {
      const { uid, changes } = action.payload;
      state.editedCharactersById[uid] = {
        ...state.editedCharactersById[uid],
        ...changes,
      };
    },
    resetCharacterEdits: (state, action: PayloadAction<string>) => {
      delete state.editedCharactersById[action.payload];
    },
  },
});

export const { setCharacterEdits, resetCharacterEdits } = editedCharacterSlice.actions;
export default editedCharacterSlice.reducer;
