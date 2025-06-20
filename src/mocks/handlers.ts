// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { BASE_URL, ENDPOINTS } from '../constants/api.constant';

export const handlers = [
  http.get(BASE_URL + ENDPOINTS.CHARACTER.LIST(1, 10), () => {
    return HttpResponse.json({
      results: [
        { uid: '1', name: 'Luke Skywalker', url: '' },
        { uid: '2', name: 'Leia Organa', url: '' },
      ],
      total_records: 2,
      total_pages: 1,
      next: null,
      previous: null,
    });
  }),
];
