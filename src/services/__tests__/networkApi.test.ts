import { fetchListFromAPI, fetchDetailFromAPI } from '../networkAPI';

const mockFetch = jest.fn();
global.fetch = mockFetch as any;

describe('networkAPI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchListFromAPI', () => {
    // list call mimic
    it('returns results from LIST_RESPONSE with results field', async () => {
      const mockData = { results: [{ id: 1 }, { id: 2 }] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchListFromAPI<{ id: number }>('https://swapi.dev/api/some-list');
      expect(result).toEqual(mockData.results);
      expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/some-list');
    });

    // list call mimic
    it('returns result from LIST_RESPONSE with result field', async () => {
      const mockData = { result: [{ id: 3 }] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchListFromAPI<{ id: number }>('https://swapi.dev/api/alt-list');
      expect(result).toEqual(mockData.result);
    });

    // list call error mimic
    it('returns empty array on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchListFromAPI('https://swapi.dev/api/fail');
      expect(result).toEqual([]);
    });

    // list call empty response mimic
    it('returns empty array if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      const result = await fetchListFromAPI('https://swapi.dev/api/404');
      expect(result).toEqual([]);
    });
  });

  describe('fetchDetailFromAPI', () => {
    // detail call mimic
    it('returns result from DETAIL_RESPONSE', async () => {
      const mockData = { result: { name: 'Tatooine' } };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchDetailFromAPI<{ name: string }>('https://swapi.dev/api/planets/1');
      expect(result).toEqual(mockData.result);
    });

    // detail call error mimic
    it('throws error on failed fetch', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Fetch failed'));

      await expect(fetchDetailFromAPI('https://swapi.dev/api/fail')).rejects.toThrow(
        'Fetch failed'
      );
    });

    // detail call throw error  mimic
    it('throws error if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(fetchDetailFromAPI('https://swapi.dev/api/fail')).rejects.toThrow(
        'API error: Internal Server Error'
      );
    });
  });
});
