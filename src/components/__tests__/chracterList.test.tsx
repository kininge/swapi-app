import { render, screen, waitFor } from '@testing-library/react';
import CharacterList from '../characterList';
import type { CHARACTER } from '../../types';
import makeTestStore from '../../utils/test/makeTestStore';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// mock VirtualizedGrid to render all items directly
jest.mock('../virtualizedGrid', () => ({
  __esModule: true,
  default: ({ items, renderItem }: any) => (
    <div>
      {items.map((item: any, i: number) => (
        <div key={i} data-testid="mock-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  ),
}));

const mockCharacters: CHARACTER[] = [
  {
    uid: '1',
    description: '',
    properties: {
      name: 'Luke Skywalker',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      height: '172',
      mass: '77',
      skin_color: 'fair',
      hair_color: 'blond',
      eye_color: 'blue',
      birth_year: '19BBY',
      created: '',
      edited: '',
      url: '',
    },
  },
];

const renderWithProvider = (ui: React.ReactElement, preloadedState?: any) => {
  const store = makeTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('CharacterList', () => {
  // character card rendered
  it('renders character cards when characters are provided', async () => {
    renderWithProvider(<CharacterList characters={mockCharacters} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Luke Skywalker/i })).toBeInTheDocument();
    });
  });

  // check fallback message
  it('shows fallback message when list is empty', () => {
    renderWithProvider(<CharacterList characters={[]} isLoading={false} />);
    expect(screen.getByText(/No character found/i)).toBeInTheDocument();
  });

  // custom error render
  it('renders custom empty message', () => {
    render(
      <CharacterList
        characters={[]}
        isLoading={false}
        isIdle={false}
        noCharacterMessage="Nothing to show"
      />
    );
    expect(screen.getByText(/Nothing to show/i)).toBeInTheDocument();
  });

  // render error when code though error
  it('renders error message when error is present', () => {
    render(<CharacterList characters={[]} error="Failed to load" />);
    expect(screen.getByText(/no character found/i)).toBeInTheDocument();
  });
});
