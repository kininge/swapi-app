import { render, screen, fireEvent } from '@testing-library/react';
import UpdatingForm from '../updatingForm';

describe('UpdatingForm', () => {
  const updatedCharacter = {
    gender: 'male',
    height: '180',
    mass: '80',
    skin_color: 'fair',
    hair_color: 'blond',
    eye_color: 'blue',
  };

  const mockHandleChange = jest.fn();
  const mockHandleSave = jest.fn();
  const mockHandleCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // all input field rendered with correct data
  it('renders input fields with correct default values', () => {
    render(
      <UpdatingForm
        updatedCharacter={updatedCharacter}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('male');
    expect(screen.getByDisplayValue('180')).toBeInTheDocument();
    expect(screen.getByDisplayValue('80')).toBeInTheDocument();
    expect(screen.getByDisplayValue('fair')).toBeInTheDocument();
    expect(screen.getByDisplayValue('blond')).toBeInTheDocument();
    expect(screen.getByDisplayValue('blue')).toBeInTheDocument();
  });

  // update save button action
  it('calls handleSave when Save button is clicked', () => {
    render(
      <UpdatingForm
        updatedCharacter={updatedCharacter}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    fireEvent.click(screen.getByText('Save'));
    expect(mockHandleSave).toHaveBeenCalledTimes(1);
  });

  // cancel button action
  it('calls handleCancel when Cancel button is clicked', () => {
    render(
      <UpdatingForm
        updatedCharacter={updatedCharacter}
        handleChange={mockHandleChange}
        handleSave={mockHandleSave}
        handleCancel={mockHandleCancel}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });
});
