import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import type { CHARACTER, CHARACTER_SLICE_STATE, LIST_RESPONSE } from '../../types';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';
import { CONTENT } from '../../constants/content.constant';
import { SLICE } from '../../constants/state.constant';
import {
  clearAllCalledCharacterPages,
  hasCharacterPageCalled,
  markCharacterPageAsCalled,
} from '../../utils/characterPageFetchGuard';

const initialState: CHARACTER_SLICE_STATE = {
  list: [],
  next: null,
  totalPages: null,
  totalRecords: null,
  status: 'idle',
  error: null,
};

// THUNK to fetch paginated characters
export const fetchCharacters = createAsyncThunk<
  LIST_RESPONSE<CHARACTER> | null,
  number,
  { rejectValue: string }
>('character/fetchCharacters', async (page, { rejectWithValue }) => {
  try {
    console.log('----> page: ', page, hasCharacterPageCalled(page));
    if (!hasCharacterPageCalled(page)) {
      // marked as page called
      markCharacterPageAsCalled(page);

      const res = await fetch(
        BASE_URL + ENDPOINTS.CHARACTER.LIST(page, CONTENT.CHARACTER_PAGE_LIMIT)
      );
      const json: LIST_RESPONSE<CHARACTER> = await res.json();

      if (!json.results || !Array.isArray(json.results)) {
        return rejectWithValue('Invalid response structure');
      }

      return json;
    } else {
      return null;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});

const characterSlice = createSlice({
  name: SLICE.CHARACTERS,
  initialState,
  reducers: {
    // reset the slice
    resetCharacters(state) {
      clearAllCalledCharacterPages();
      state.list = [];
      state.next = null;
      state.totalPages = null;
      state.totalRecords = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loading
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // succeeded
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        if (action.payload) {
          const { results, total_pages, total_records, next } =
            action.payload as LIST_RESPONSE<CHARACTER>;

          state.next = next ?? null;
          state.totalPages = total_pages ?? 0;
          state.totalRecords = total_records ?? 0;

          if (results) {
            // only unique characters add in state
            const existingCharacterIds: Set<string> = new Set(
              state.list.map((character) => character.uid)
            );
            const uniqueCharacters = results.filter(
              (character) => !existingCharacterIds.has(character.uid)
            );
            state.list.push(...uniqueCharacters);
          }
        }

        state.status = 'succeeded';
      })
      // error
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { resetCharacters } = characterSlice.actions;
export default characterSlice.reducer;

// selectors
export const selectCharacters = (state: RootState) => state.characters.list;
export const selectNext = (state: RootState) => state.characters.next;
export const selectCharacterStatus = (state: RootState) => state.characters.status;
