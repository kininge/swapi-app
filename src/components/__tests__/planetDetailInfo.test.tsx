// src/components/planetInfo/__tests__/planetDetailInfo.test.tsx
import { render, screen } from '@testing-library/react';
import PlanetDetailInfo from '../planetInfo/planetDetailInfo';
import type { PLANET } from '../../types';

const mockPlanet: PLANET = {
  properties: {
    name: 'Tatooine',
    climate: 'arid',
    population: '200000',
    terrain: 'desert',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '',
    gravity: '',
    surface_water: '',
    created: '',
    edited: '',
    url: '',
  },
  uid: '1',
  description: '',
};

describe('PlanetDetailInfo', () => {
  // loading
  it('renders loading state', () => {
    render(<PlanetDetailInfo loading />);
    expect(screen.getByTestId('planet-info-loading')).toBeInTheDocument();
  });

  // error
  it('renders error state when error is true', () => {
    render(<PlanetDetailInfo error />);
    expect(screen.getByTestId('planet-info-error')).toHaveTextContent('Planet info unavailable');
  });

  // api error
  it('renders error state when planet is undefined', () => {
    render(<PlanetDetailInfo />);
    expect(screen.getByTestId('planet-info-error')).toBeInTheDocument();
  });

  // data point render
  it('renders planet info with image and styles if planetData exists', () => {
    render(<PlanetDetailInfo planet={mockPlanet} />);
    expect(screen.getByTestId('planet-info')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Climate:')).toBeInTheDocument();
    expect(screen.getByText('arid')).toBeInTheDocument();
    expect(screen.getByText('Population:')).toBeInTheDocument();
    expect(screen.getByText('200000')).toBeInTheDocument();
  });

  // image missing logic
  it('renders planet info even if image and color are missing from PLANETS', () => {
    const planetWithoutExtras: PLANET = {
      properties: {
        ...mockPlanet.properties,
        name: 'Unknown Planet',
      },
      uid: '',
      description: '',
    };

    const { container } = render(<PlanetDetailInfo planet={planetWithoutExtras} />);
    expect(screen.getByTestId('planet-info')).toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument(); // image absent
  });
});
