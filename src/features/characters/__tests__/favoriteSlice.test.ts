import favoriteReducer, { toggleFavorite, updateFavoriteCharacter } from '../favoriteSlice';
import type { CHARACTER } from '../../../types';

const mockCharacter: CHARACTER = {
  uid: '1',
  properties: {
    gender: 'male',
    height: '172',
    mass: '77',
    skin_color: 'fair',
    hair_color: 'blond',
    eye_color: 'blue',
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    birth_year: '',
    homeworld: '',
    created: '',
    edited: '',
  },
  description: '',
};

describe('favoriteSlice', () => {
  // character successfully add to favorite cache
  it('should add character to favorites when toggled on', () => {
    const state = favoriteReducer(undefined, toggleFavorite(mockCharacter));
    expect(state.favoriteCharacters['1']).toEqual(mockCharacter);
  });

  // character remove from favorite cache successfully
  it('should remove character from favorites when toggled off', () => {
    const preState = { favoriteCharacters: { '1': mockCharacter } };
    const state = favoriteReducer(preState, toggleFavorite(mockCharacter));
    expect(state.favoriteCharacters['1']).toBeUndefined();
  });

  // partial properties update of favorite character
  it('should update properties of a favorite character', () => {
    const preState = { favoriteCharacters: { '1': mockCharacter } };
    const state = favoriteReducer(
      preState,
      updateFavoriteCharacter({
        id: '1',
        updates: { height: '180', hair_color: 'black' },
      })
    );
    expect(state.favoriteCharacters['1'].properties.height).toBe('180');
    expect(state.favoriteCharacters['1'].properties.hair_color).toBe('black');
  });

  // missing character id in favorite cache return undefined
  it('should do nothing if character ID does not exist in update', () => {
    const state = favoriteReducer(
      { favoriteCharacters: {} },
      updateFavoriteCharacter({ id: '999', updates: { height: '200' } })
    );
    expect(state.favoriteCharacters['999']).toBeUndefined();
  });
});
