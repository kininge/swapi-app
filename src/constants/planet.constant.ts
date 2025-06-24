import type { PLANET_EXTRA_DATA } from '../types';

export const PLANETS: Record<string, PLANET_EXTRA_DATA> = {
  TATOOINE: {
    IMAGE: '/assets/planets/tatooine.png',
    COLOR: { RED: 207, GREEN: 180, BLUE: 150 },
  },
  NABOO: {
    IMAGE: '/assets/planets/naboo.png',
    COLOR: { RED: 119, GREEN: 278, BLUE: 204 },
  },
};
