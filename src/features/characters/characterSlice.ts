// features/characters/characterSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CHARACTER } from './types';
import type { LIST_RESPONSE } from '../../types';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';

interface CharacterState {
  list: CHARACTER[];
  searchResults: CHARACTER[] | null;
  isSearchMode: boolean;
}

const initialState: CharacterState = {
  list: [],
  searchResults: null,
  isSearchMode: false,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacterList: (state, action: PayloadAction<CHARACTER[]>) => {
      state.list = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<CHARACTER[]>) => {
      state.searchResults = action.payload;
      state.isSearchMode = true;
    },
    resetSearch: (state) => {
      state.searchResults = null;
      state.isSearchMode = false;
    },
  },
});

export const fetchCharacters = createAsyncThunk<
  CHARACTER[], // return type
  number, // argument: page number
  { rejectValue: string }
>('characters/fetch', async (page, { rejectWithValue }) => {
  try {
    const limit = 10;
    const res = await fetch(BASE_URL + ENDPOINTS.CHARACTER.LIST(page, limit));
    const json: LIST_RESPONSE<CHARACTER> = await res.json();

    if (!json.results) throw new Error('Invalid response');

    return json.results.map((char) => ({
      ...char,
      id: char.uid,
    }));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch characters';
    return rejectWithValue(errorMessage);
  }
});

export const { setCharacterList, setSearchResults, resetSearch } = characterSlice.actions;
export default characterSlice.reducer;
