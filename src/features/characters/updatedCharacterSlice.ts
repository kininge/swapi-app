import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CHARACTER } from '../../types';

export type UpdatedFields = Partial<CHARACTER['properties']>;

interface EditCacheState {
  updatedCharactersById: Record<string, UpdatedFields>;
}

const initialState: EditCacheState = {
  updatedCharactersById: {},
};

export const editedCharacterSlice = createSlice({
  name: 'editedCharacter',
  initialState,
  reducers: {
    setUpdatedCharacter: (
      state,
      action: PayloadAction<{ uid: string; changes: UpdatedFields }>
    ) => {
      const { uid, changes } = action.payload;
      state.updatedCharactersById[uid] = {
        ...state.updatedCharactersById[uid],
        ...changes,
      };
    },
    resetCharacterUpdates: (state, action: PayloadAction<string>) => {
      delete state.updatedCharactersById[action.payload];
    },
  },
});

export const { setUpdatedCharacter, resetCharacterUpdates } = editedCharacterSlice.actions;
export default editedCharacterSlice.reducer;
