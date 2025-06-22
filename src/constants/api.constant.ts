export const BASE_URL = 'https://swapi.tech/api';

export const ENDPOINTS = {
  CHARACTER: {
    LIST: (page = 1, pageLimit = 10) => `/people?page=${page}&limit=${pageLimit}&expanded=true`,
    DETAIL: (id: string) => `/people/${id}`,
    SEARCH: (searchQuery: string) => `/people?name=${searchQuery}`,
  },
  FILM: {
    LIST: `/films?expanded=true`, // only 6 movies fetch once cache it
  },
  STARSHIP: {
    LIST: `/starships?page=1&limit=40&expanded=true`, // only 36 starship fetch it and cache it
  },
  PLANET: {
    DETAIL: (id: string) => `/planets/${id}`,
  },
};
