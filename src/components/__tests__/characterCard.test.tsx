import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import CharacterCard from '../characterCard';
import makeTestStore from '../../utils/test/makeTestStore';
import type { CHARACTER } from '../../types';

// Sample character
const sampleCharacter: CHARACTER = {
  uid: '123',
  properties: {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    skin_color: 'fair',
    hair_color: 'blond',
    eye_color: 'blue',
    birth_year: '19BBY',
    homeworld: 'https://swapi.dev/api/planets/1/',
    created: '',
    edited: '',
    url: '',
  },
  description: '',
};

// mock redux store
const renderWithStore = (character: CHARACTER, updatedCharacter = {}) => {
  const store = makeTestStore({
    updatedCharacter: {
      updatedCharactersById: { [character.uid]: updatedCharacter },
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    </Provider>
  );
};

describe('CharacterCard', () => {
  // character name and gender rendered
  test('renders character name and gender symbol', () => {
    const { getByText } = renderWithStore(sampleCharacter);

    // Character name
    expect(getByText('Luke Skywalker')).toBeInTheDocument();

    // Gender symbol for male ♂ (U+2642)
    expect(getByText('♂')).toBeInTheDocument();
  });

  // updated
  test('renders updated character name from Redux store', () => {
    // dummy updated felids
    const updated = {
      gender: 'female', // ♀
      height: '180',
      skin_color: 'green',
      mass: '88',
      hair_color: 'brown',
      eye_color: 'green',
    };

    const { getByText } = renderWithStore(sampleCharacter, updated);

    // Ensure name is NOT updated (because name is not editable)
    expect(getByText('Luke Skywalker')).toBeInTheDocument();

    // Check gender updated
    expect(getByText('♀')).toBeInTheDocument();
  });

  // render no gender when male or female not found
  test('renders fallback gender symbol if gender is missing', () => {
    const characterWithNoGender = {
      ...sampleCharacter,
      properties: { ...sampleCharacter.properties, gender: '' },
    };
    const { getByText } = renderWithStore(characterWithNoGender);
    expect(getByText('⚲')).toBeInTheDocument(); // default symbol
  });

  // handle missing name
  test('handles missing name gracefully', () => {
    const namelessCharacter = {
      ...sampleCharacter,
      properties: { ...sampleCharacter.properties, name: '' },
    };
    const { container } = renderWithStore(namelessCharacter);
    // Empty h2 or placeholder fallback logic can be added/tested here
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  // render planet data
  test('renders planet info component', () => {
    renderWithStore(sampleCharacter);

    const maybeLoading = screen.queryByTestId('planet-info-loading');
    const maybePlanet = screen.queryByTestId('planet-info');
    const maybeError = screen.queryByTestId('planet-info-error');

    expect(maybeLoading || maybePlanet || maybeError).toBeInTheDocument();
  });
});
