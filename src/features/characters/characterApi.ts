import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';
import type { CHARACTER } from '../../types';

export const characterAPI = createApi({
  reducerPath: 'characterAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<CHARACTER, string>({
      query: (id) => ENDPOINTS.CHARACTER.DETAIL(id),
    }),
  }),
});

export const { useGetCharacterByIdQuery } = characterAPI;
