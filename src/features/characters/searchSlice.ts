import { createAsyncThunk, createSlice, type ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { CHARACTER, LIST_RESPONSE, SEARCH_SLICE_STATE } from '../../types';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';
import { SLICE } from '../../constants/state.constant';
// import the correct RootState from your store setup
import type { RootState } from '../../store/store';

const initialState: SEARCH_SLICE_STATE = {
  list: [],
  status: 'idle',
  error: null,
};

// api call
export const fetchSearchedCharacters = createAsyncThunk<
  CHARACTER[], // response data type
  string, // argument data type
  { rejectValue: string } // error data type
>(
  'character/fetchSearchedCharacters', // unique key to identify
  async (searchParameter: string, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(
        BASE_URL + ENDPOINTS.CHARACTER.SEARCH(searchParameter)
      );

      if (!response.ok) throw Error(response.statusText);
      const data: LIST_RESPONSE<CHARACTER> = await response.json();
      return data.result || [];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

// store slice
const searchedCharacterSlice = createSlice({
  name: SLICE.SEARCHED_CHARACTERS,
  initialState,
  reducers: {
    resetSearchedCharacterSlice(state) {
      state.list = [];
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SEARCH_SLICE_STATE>) => {
    builder
      // loading
      .addCase(fetchSearchedCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // succeeded
      .addCase(fetchSearchedCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.list = action.payload;
      }) // failed
      .addCase(fetchSearchedCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
        state.list = [];
      });
  },
});

export const selectSearchedCharacters = (state: RootState) => state.searchedCharacters.list;
export const selectSearchedCharactersStatus = (state: RootState) => state.searchedCharacters.status;

export const { resetSearchedCharacterSlice } = searchedCharacterSlice.actions;
export default searchedCharacterSlice.reducer;
