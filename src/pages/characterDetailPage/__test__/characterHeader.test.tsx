import { render, screen, fireEvent } from '@testing-library/react';
import CharacterHeader from '../characterHeader';
import type { CHARACTER } from '../../../types';

jest.mock('../../../components/favoriteToggle.tsx', () => () => (
  <div data-testid="favorite-toggle" />
));

const mockCharacter: CHARACTER = {
  uid: '1',
  description: 'Luke Skywalker',
  properties: {
    name: 'Luke Skywalker',
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

describe('CharacterHeader', () => {
  // character name render check
  it('renders character name', () => {
    render(<CharacterHeader character={mockCharacter} isUpdating={false} setUpdate={jest.fn()} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  // update and favorite toggle button render check
  it('shows update button and FavoriteToggle when not updating', () => {
    render(<CharacterHeader character={mockCharacter} isUpdating={false} setUpdate={jest.fn()} />);
    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-toggle')).toBeInTheDocument();
  });

  // on updating state update and favorite toggle button should not render
  it('does not show update button or FavoriteToggle when updating', () => {
    render(<CharacterHeader character={mockCharacter} isUpdating={true} setUpdate={jest.fn()} />);
    expect(screen.queryByText('Update')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorite-toggle')).not.toBeInTheDocument();
  });

  // update state button click check
  it('calls setUpdate(true) when update button is clicked', () => {
    const mockSetUpdate = jest.fn();
    render(
      <CharacterHeader character={mockCharacter} isUpdating={false} setUpdate={mockSetUpdate} />
    );
    fireEvent.click(screen.getByText('Update'));
    expect(mockSetUpdate).toHaveBeenCalledWith(true);
  });
});
