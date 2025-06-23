// features/starships/starshipsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { STARSHIP } from '../../types';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';

export const fetchStarships = createAsyncThunk('starships/fetchAll', async () => {
  const res = await fetch(BASE_URL + ENDPOINTS.STARSHIP.LIST);
  const json = await res.json();
  return json.result as STARSHIP[];
});

interface StarshipsState {
  list: STARSHIP[];
  status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: StarshipsState = {
  list: [],
  status: 'idle',
};

const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarships.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.status = 'success';
        state.list = action.payload;
      })
      .addCase(fetchStarships.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default starshipsSlice.reducer;
