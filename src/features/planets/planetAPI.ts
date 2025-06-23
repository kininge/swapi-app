// features/planets/planetAPI.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PLANET } from './types';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constant';

export const planetAPI = createApi({
  reducerPath: 'planetAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPlanetById: builder.query<PLANET, string>({
      query: (id) => ENDPOINTS.PLANET.DETAIL(id),
    }),
  }),
});

export const { useGetPlanetByIdQuery } = planetAPI;
