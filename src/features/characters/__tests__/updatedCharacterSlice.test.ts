import reducer, { setUpdatedCharacter, resetCharacterUpdates } from '../updatedCharacterSlice';

describe('updatedCharacterSlice', () => {
  const initialState = {
    updatedCharactersById: {},
  };

  // initial state check
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  // mimic store updated character
  it('should handle setUpdatedCharacter for new character', () => {
    const action = setUpdatedCharacter({
      uid: '1',
      changes: { height: '180', mass: '80' },
    });

    const state = reducer(initialState, action);

    expect(state.updatedCharactersById['1']).toEqual({
      height: '180',
      mass: '80',
    });
  });

  // mimic update character in multiple iteration
  it('should merge changes if character already exists', () => {
    const prevState = {
      updatedCharactersById: {
        '1': { height: '180' },
      },
    };

    const action = setUpdatedCharacter({
      uid: '1',
      changes: { mass: '82' },
    });

    const state = reducer(prevState, action);

    expect(state.updatedCharactersById['1']).toEqual({
      height: '180',
      mass: '82',
    });
  });

  // mimic updated record removed from state
  it('should handle resetCharacterUpdates', () => {
    const prevState = {
      updatedCharactersById: {
        '1': { height: '180' },
        '2': { mass: '75' },
      },
    };

    const action = resetCharacterUpdates('1');
    const state = reducer(prevState, action);

    expect(state.updatedCharactersById['1']).toBeUndefined();
    expect(state.updatedCharactersById['2']).toEqual({ mass: '75' });
  });
});
