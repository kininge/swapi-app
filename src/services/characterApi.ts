import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINTS } from '../constants/api.constant';
import type { CHARACTER, LIST_RESPONSE } from '../types';

export const characterAPI = createApi({
  reducerPath: 'characterAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharactersList: builder.query<LIST_RESPONSE<CHARACTER>, { page: number; limit?: number }>({
      query: ({ page, limit = 10 }) => ENDPOINTS.CHARACTER.LIST(page, limit),
    }),
    searchCharactersByName: builder.query<LIST_RESPONSE<CHARACTER>, string>({
      query: (name) => ENDPOINTS.CHARACTER.SEARCH(name),
    }),
  }),
});

export const { useGetCharactersListQuery, useSearchCharactersByNameQuery } = characterAPI;
