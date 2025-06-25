import { render, screen } from '@testing-library/react';
import { Loader } from '../loader';

describe('Loader', () => {
  it('renders the spinning loader with correct role and label', () => {
    render(<Loader />);
    const loaderElement = screen.getByRole('loader', { name: 'Loading' });
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveAttribute('aria-label', 'Loading');
    expect(loaderElement.querySelector('div')).toHaveClass('animate-spin');
  });
});
