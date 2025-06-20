import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINTS } from '../constants/api.constant';

export interface Character {
  uid: string;
  name: string;
  url: string;
}

interface CharacterListResponse {
  results: Character[];
  total_records: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
}

export const characterAPI = createApi({
  reducerPath: 'characterAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharacterListResponse, { page: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ENDPOINTS.CHARACTER.LIST(page, limit),
    }),
  }),
});

export const { useGetCharactersQuery } = characterAPI;
