import { render, screen } from '@testing-library/react';
import PlanetCardInfo from '../planetInfo/planetCardInfo';
import type { PLANET } from '../../types';

const mockPlanet: PLANET = {
  properties: {
    name: 'Tatooine',
    climate: 'arid',
    population: '200000',
    rotation_period: '',
    orbital_period: '',
    diameter: '',
    gravity: '',
    terrain: '',
    surface_water: '',
    created: '',
    edited: '',
    url: '',
  },
  uid: '1',
  description: '',
};

describe('PlanetCardInfo', () => {
  // check loading state
  it('renders loading state', () => {
    render(<PlanetCardInfo loading={true} />);
    expect(screen.getByTestId('planet-info-loading')).toBeInTheDocument();
  });

  // check error state
  it('renders error state when error is true', () => {
    render(<PlanetCardInfo error={true} />);
    expect(screen.getByTestId('planet-info-error')).toHaveTextContent('Failed to load planet');
  });

  // error state check
  it('renders error state when planet is undefined', () => {
    render(<PlanetCardInfo />);
    expect(screen.getByTestId('planet-info-error')).toBeInTheDocument();
  });

  // planet data render check
  it('renders planet info with image and details', () => {
    render(<PlanetCardInfo planet={mockPlanet} />);
    expect(screen.getByTestId('planet-info')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText(/Climate:/)).toHaveTextContent('Climate: arid');
    expect(screen.getByText(/Population:/)).toHaveTextContent('Population: 200000');
  });

  // planet image missing case
  it('does not render image if planet image is missing', () => {
    const planetWithoutImage = {
      ...mockPlanet,
      properties: {
        ...mockPlanet.properties,
        name: 'Unknown Planet', // not present in PLANETS constant
      },
    };
    const { container } = render(<PlanetCardInfo planet={planetWithoutImage} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });
});
