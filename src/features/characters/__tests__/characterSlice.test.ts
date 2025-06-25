import reducer, {
  fetchCharacters,
  resetCharacters,
  selectCharacters,
  selectNext,
  selectCharacterStatus,
} from '../characterSlice';
import type { CHARACTER_SLICE_STATE } from '../../../types';
import makeTestStore from '../../../utils/test/makeTestStore';
import * as pageGuard from '../../../utils/characterPageFetchGuard';

// mock character generator
const mockCharacter = (uid: string) => ({
  uid,
  description: 'Test character',
  properties: {
    name: `Character ${uid}`,
    gender: 'male',
    height: '180',
    mass: '75',
    skin_color: 'fair',
    hair_color: 'black',
    eye_color: 'brown',
    birth_year: '19BBY',
    homeworld: 'Tatooine',
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: `https://swapi.dev/api/people/${uid}/`,
  },
});

describe('characterSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // initial state
  const initialState: CHARACTER_SLICE_STATE = {
    list: [],
    next: null,
    totalPages: null,
    totalRecords: null,
    status: 'idle',
    error: null,
  };

  // -------------------------------
  // Reducer tests
  // -------------------------------

  // initial state check
  it('should return the initial state on first run', () => {
    const result = reducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  // check state getting reset or not
  it('should reset characters correctly', () => {
    // to handle same call again issue
    const clearAllCalledCharacterPagesSpy = jest.spyOn(pageGuard, 'clearAllCalledCharacterPages');

    const prevState: CHARACTER_SLICE_STATE = {
      list: [mockCharacter('1')],
      next: 'https://example.com/next',
      totalPages: 10,
      totalRecords: 100,
      status: 'succeeded',
      error: 'Some error',
    };

    const newState = reducer(prevState, resetCharacters());

    expect(newState).toEqual(initialState);
    expect(clearAllCalledCharacterPagesSpy).toHaveBeenCalled();
  });

  // duplicate state update check
  it('should not add duplicate characters', () => {
    const prevState: CHARACTER_SLICE_STATE = {
      ...initialState,
      list: [mockCharacter('1')],
    };

    const result = reducer(
      prevState,
      fetchCharacters.fulfilled(
        {
          results: [mockCharacter('1')],
          next: 'https://example.com/next',
          total_pages: 5,
          total_records: 50,
          message: '',
          apiVersion: '',
          timestamp: '',
        },
        '',
        1
      )
    );

    // ✅ Should not add duplicate
    expect(result.list).toHaveLength(1);
  });

  // -------------------------------
  // Thunk tests
  // -------------------------------

  describe('fetchCharacters thunk', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    // duplicate calls handle check
    it('adds characters if not already fetched', async () => {
      jest.spyOn(pageGuard, 'hasCharacterPageCalled').mockReturnValue(false);
      jest
        .spyOn(pageGuard, 'markCharacterPageAsCalled')
        .mockImplementation(() => new Set<number>());

      global.fetch = jest.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            results: [mockCharacter('1')],
            total_pages: 1,
            total_records: 1,
            next: null,
          }),
      }) as jest.Mock;

      const store = makeTestStore();
      await store.dispatch(fetchCharacters(1));
      const state = store.getState().character;

      expect(state.list).toHaveLength(1);
      expect(state.status).toBe('succeeded');
    });

    // existing data should avoid call
    it('skips API call if page was already fetched', async () => {
      // this has page 1 already fetch
      jest.spyOn(pageGuard, 'hasCharacterPageCalled').mockReturnValue(true);

      const store = makeTestStore();
      // again call for page 1
      await store.dispatch(fetchCharacters(1));
      const state = store.getState().character;
      // this check no data added
      expect(state.list).toHaveLength(0);
      expect(state.status).toBe('succeeded');
    });

    // error handle check
    it('handles fetch error', async () => {
      jest.spyOn(pageGuard, 'hasCharacterPageCalled').mockReturnValue(false);
      jest
        .spyOn(pageGuard, 'markCharacterPageAsCalled')
        .mockImplementation(() => new Set<number>());

      global.fetch = jest.fn().mockRejectedValue(new Error('Network error')) as jest.Mock;

      const store = makeTestStore();
      await store.dispatch(fetchCharacters(1));
      const state = store.getState().character;

      expect(state.status).toBe('failed');
      expect(state.error).toBe('Network error');
    });
  });

  // -------------------------------
  // Selector tests
  // -------------------------------

  describe('selectors', () => {
    const state: { characters: CHARACTER_SLICE_STATE } = {
      characters: {
        ...initialState,
        list: [mockCharacter('1')],
        next: '2',
        status: 'succeeded',
        error: null,
        totalPages: null,
        totalRecords: null,
      },
    };

    it('selectCharacters should return character list', () => {
      expect(selectCharacters(state as any)).toHaveLength(1);
    });

    it('selectNext should return next', () => {
      expect(selectNext(state as any)).toBe('2');
    });

    it('selectCharacterStatus should return status', () => {
      expect(selectCharacterStatus(state as any)).toBe('succeeded');
    });
  });
});
