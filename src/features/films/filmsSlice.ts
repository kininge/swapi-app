// features/films/filmsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { FILM } from './types';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';

export const fetchFilms = createAsyncThunk('films/fetchAll', async () => {
  const res = await fetch(BASE_URL + ENDPOINTS.FILM.LIST);
  const json = await res.json();
  return json.result as FILM[];
});

interface FilmsState {
  list: FILM[];
  status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: FilmsState = {
  list: [],
  status: 'idle',
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'success';
        state.list = action.payload;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default filmsSlice.reducer;
