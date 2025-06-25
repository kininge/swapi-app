// tests/features/characters/searchSlice.test.ts
import reducer, {
  fetchSearchedCharacters,
  resetSearchedCharacterSlice,
  selectSearchedCharacters,
  selectSearchedCharactersStatus,
} from '../searchSlice';
import type { SEARCH_SLICE_STATE } from '../../../types';

const initialState: SEARCH_SLICE_STATE = {
  list: [],
  status: 'idle',
  error: null,
};

describe('searchSlice', () => {
  // initial state check
  it('should return initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  // reset reducer action check
  it('should handle resetSearchedCharacterSlice', () => {
    const state = reducer(
      {
        list: [
          {
            uid: '1',
            description: 'Luke',
            properties: {
              name: '',
              gender: '',
              hair_color: '',
              eye_color: '',
              skin_color: '',
              height: '',
              mass: '',
              birth_year: '',
              homeworld: '',
              created: '',
              edited: '',
              url: '',
            },
          },
        ],
        status: 'succeeded',
        error: null,
      },
      resetSearchedCharacterSlice()
    );
    expect(state).toEqual(initialState);
  });

  // fetch search api call pending handle check
  it('should handle fetchSearchedCharacters.pending', () => {
    const state = reducer(initialState, { type: fetchSearchedCharacters.pending.type });
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  // fetch search api call succeed handle check
  it('should handle fetchSearchedCharacters.fulfilled', () => {
    const character = {
      uid: '1',
      description: 'Luke',
      properties: {
        name: '',
        gender: '',
        hair_color: '',
        eye_color: '',
        skin_color: '',
        height: '',
        mass: '',
        birth_year: '',
        homeworld: '',
        created: '',
        edited: '',
        url: '',
      },
    };
    const state = reducer(initialState, {
      type: fetchSearchedCharacters.fulfilled.type,
      payload: [character],
    });
    expect(state.status).toBe('succeeded');
    expect(state.list).toEqual([character]);
    expect(state.error).toBeNull();
  });

  // api call error condition check with message
  it('should handle fetchSearchedCharacters.rejected with message', () => {
    const state = reducer(initialState, {
      type: fetchSearchedCharacters.rejected.type,
      error: { message: 'Network error' },
    });
    expect(state.status).toBe('failed');
    expect(state.list).toEqual([]);
    expect(state.error).toBe('Network error');
  });

  // api call error condition check with without message
  it('should handle fetchSearchedCharacters.rejected without message', () => {
    const state = reducer(initialState, {
      type: fetchSearchedCharacters.rejected.type,
      error: {},
    });
    expect(state.status).toBe('failed');
    expect(state.list).toEqual([]);
    expect(state.error).toBe('Something went wrong');
  });

  // accessibility check of state
  it('should select list and status from state', () => {
    const rootState = {
      searchedCharacters: {
        list: [{ uid: '1', name: 'Leia', url: '', properties: {} }],
        status: 'loading',
        error: null,
      },
    } as any;

    expect(selectSearchedCharacters(rootState)).toHaveLength(1);
    expect(selectSearchedCharactersStatus(rootState)).toBe('loading');
  });
});
