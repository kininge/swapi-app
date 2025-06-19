export const BASE_URL = 'https://swapi.tech/api';

export const ENDPOINTS = {
  CHARACTER: {
    LIST: (page = 1, pageLimit = 10) => `/people?page=${page}&limit=${pageLimit}`,
    DETAIL: (id: number) => `/people/${id}`,
  },
};
