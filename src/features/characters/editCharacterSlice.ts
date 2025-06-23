// features/characters/editCharacterSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CHARACTER } from './types';

interface EditCharacterState {
  overrides: Record<string, Partial<CHARACTER>>;
}

const initialState: EditCharacterState = {
  overrides: {},
};

const editCharacterSlice = createSlice({
  name: 'editedCharacters',
  initialState,
  reducers: {
    updateCharacter: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<CHARACTER> }>
    ) => {
      const { id, changes } = action.payload;
      state.overrides[id] = {
        ...state.overrides[id],
        ...changes,
      };
    },
  },
});

export const { updateCharacter } = editCharacterSlice.actions;
export default editCharacterSlice.reducer;
