import { render, screen } from '@testing-library/react';
import CharacterDataDisplay from '../characterDataDisplay';
import type { UpdatedFields } from '../../../features/characters/updatedCharacterSlice';

const fullData: UpdatedFields = {
  birth_year: '19BBY',
  gender: 'male',
  height: '172',
  mass: '77',
  skin_color: 'fair',
  hair_color: 'blond',
  eye_color: 'blue',
};

const partialData: UpdatedFields = {
  birth_year: '',
  gender: '',
  height: '',
  mass: '',
  skin_color: '',
  hair_color: '',
  eye_color: '',
};

// mock planet info
jest.mock('../../../components/planetInfo', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import PlanetInfo from '../../../components/planetInfo';

describe('CharacterDataDisplay', () => {
  beforeEach(() => {
    // default to success render
    (PlanetInfo as unknown as jest.Mock).mockImplementation(() => (
      <div data-testid="planet-info">Planet Loaded</div>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // all data points render check
  it('renders all character fields with values', () => {
    render(<CharacterDataDisplay updatableData={fullData} homeworldUrl="url.com" />);
    expect(screen.getByText('Skin Color')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
    expect(screen.getByText('172 cm')).toBeInTheDocument();
    expect(screen.getByText('77 kg')).toBeInTheDocument();
    expect(screen.getByTestId('planet-info')).toBeInTheDocument();
  });

  // missing data point render check
  it('renders "Unknown" for missing fields', () => {
    render(<CharacterDataDisplay updatableData={partialData} homeworldUrl="url.com" />);
    expect(screen.getAllByText('Unknown')).toHaveLength(7);
  });
});

describe('PlanetInfo mocked async states', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  // planet info loading render check
  it('renders loading state', () => {
    (PlanetInfo as unknown as jest.Mock).mockImplementation(() => (
      <div data-testid="planet-info-loading">Loading...</div>
    ));

    render(<CharacterDataDisplay updatableData={fullData} homeworldUrl="url.com" />);
    expect(screen.getByTestId('planet-info-loading')).toBeInTheDocument();
  });

  // planet info error render check
  it('renders error state', () => {
    (PlanetInfo as unknown as jest.Mock).mockImplementation(() => (
      <div data-testid="planet-info-error">Error</div>
    ));

    render(<CharacterDataDisplay updatableData={fullData} homeworldUrl="url.com" />);
    expect(screen.getByTestId('planet-info-error')).toBeInTheDocument();
  });
});
