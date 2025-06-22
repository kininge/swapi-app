import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CharacterList } from '../characterList';
import * as characterApi from '../../../services/characterApi';

jest.mock('../../../services/characterApi');

const mockedUseGetCharactersQuery = characterApi.useGetCharactersListQuery as jest.Mock;

describe('CharacterList', () => {
  beforeEach(() => {
    mockedUseGetCharactersQuery.mockReset();
  });

  // Loader render check
  it('Loader is rendered', () => {
    mockedUseGetCharactersQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CharacterList />);

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  // Character cards render check
  it('Character cards rendered', () => {
    mockedUseGetCharactersQuery.mockReturnValue({
      data: {
        results: [
          { uid: '1', name: 'Luke Skywalker', url: '' },
          { uid: '2', name: 'Darth Vader', url: '' },
        ],
        next: null,
      },
      isLoading: false,
      error: null,
    });

    render(<CharacterList />);

    expect(screen.getByRole('heading', { name: /Luke Skywalker/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Darth Vader/i })).toBeInTheDocument();
  });

  // No data condition check
  it('No data condition handled', () => {
    mockedUseGetCharactersQuery.mockReturnValue({
      data: { results: [], next: null },
      isLoading: false,
      error: null,
    });

    render(<CharacterList />);
    expect(screen.getByRole('error-message')).toBeInTheDocument();
  });

  // Error condition check
  it('API failed or error handled', () => {
    mockedUseGetCharactersQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { status: 500, message: 'Server error' },
    });

    render(<CharacterList />);
    expect(screen.getByRole('error-message')).toBeInTheDocument();
  });

  // ==> On scroll bottom next character data should come
  // Infinite scroll behavior with IntersectionObserver + react-window
  // is tested via Cypress instead of Jest due to JSDOM limitations.

  // ==> On Character card click move to next screen check
  // is tested via Cypress instead of Jest due to JSDOM limitations.
});
