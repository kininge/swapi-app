jest.mock('../../../services/networkAPI');
import { fetchPlanetById, __TEST_ONLY__planetFetchTracker as tracker } from '../planetAPI';
import type { PLANET } from '../../../types';
import { fetchDetailFromAPI } from '../../../services/networkAPI';
import { store } from '../../../store/store';
import { setPlanets } from '../../cache/cacheSlice';

// jest.mock('../../../services/networkAPI');

const mockPlanet: PLANET = {
  uid: '1',
  properties: {
    name: 'Tatooine',
    climate: 'arid',
    population: '200000',
    terrain: 'desert',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '',
    gravity: '',
    surface_water: '',
    created: '',
    edited: '',
    url: '',
  },
  description: '',
};

describe('fetchPlanetById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setPlanets({}));

    for (const key in tracker) {
      delete tracker[key];
    }
  });

  // planet from cache
  it('returns planet from cache if available', async () => {
    store.dispatch(setPlanets({ '1': mockPlanet }));
    const result = await fetchPlanetById('1');
    expect(result).toEqual(mockPlanet);
    expect(fetchDetailFromAPI).not.toHaveBeenCalled();
  });

  // api error
  it('throws error if API fails', async () => {
    (fetchDetailFromAPI as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(fetchPlanetById('999')).rejects.toThrow('API error');
  });
});
