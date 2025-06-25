import { render, screen } from '@testing-library/react';
import GenderInfo from '../genderInfo';

describe('GenderInfo', () => {
  // render male check
  it('renders male gender symbol with tooltip', () => {
    render(<GenderInfo gender="male" />);
    expect(screen.getByText('♂')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  // render female check
  it('renders female gender symbol with tooltip', () => {
    render(<GenderInfo gender="female" />);
    expect(screen.getByText('♀')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  // render unknown check
  it('renders unknown gender symbol with tooltip when gender is "n/a"', () => {
    render(<GenderInfo gender="n/a" />);
    expect(screen.getByText('⚲')).toBeInTheDocument();
    expect(screen.getByText('No Gender')).toBeInTheDocument();
  });

  // render unknown check
  it('renders unknown gender symbol with tooltip when gender is empty string', () => {
    render(<GenderInfo gender="" />);
    expect(screen.getByText('⚲')).toBeInTheDocument();
    expect(screen.getByText('No Gender')).toBeInTheDocument();
  });
});
