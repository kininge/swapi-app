import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteToggle from '../favoriteToggle';
import makeTestStore from '../../utils/test/makeTestStore';
import { Provider } from 'react-redux';
import type { CHARACTER } from '../../types';

const mockCharacter: CHARACTER = {
  uid: '1',
  description: 'Luke',
  properties: {
    name: 'Luke Skywalker',
    gender: 'male',
    hair_color: 'blond',
    eye_color: 'blue',
    skin_color: 'fair',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    homeworld: 'https://www.swapi.tech/api/planets/1',
    created: '',
    edited: '',
    url: '',
  },
};

function renderWithStore(preloadedState?: any) {
  const store = makeTestStore(preloadedState);
  return {
    store,
    ...render(
      <Provider store={store}>
        <FavoriteToggle character={mockCharacter} />
      </Provider>
    ),
  };
}

describe('FavoriteToggle', () => {
  // not favorite render check
  it('renders as not favorite by default', () => {
    renderWithStore();
    expect(screen.getByRole('button')).toHaveTextContent('♡');
  });

  // favorite render check
  it('renders as favorite when in store', () => {
    renderWithStore({
      favorite: {
        favoriteCharacters: {
          [mockCharacter.uid]: mockCharacter,
        },
      },
    });
    expect(screen.getByRole('button')).toHaveTextContent('♥');
  });

  // toggle button click simulate
  it('toggles favorite state on click', () => {
    const { store } = renderWithStore();
    const button = screen.getByRole('button');

    // Initially not favorite
    expect(button).toHaveTextContent('♡');

    // Click to add to favorites
    fireEvent.click(button);
    const newState = store.getState();
    expect(newState.favorite.favoriteCharacters[mockCharacter.uid]).toBeTruthy();
  });
});
