import { render, screen } from '@testing-library/react';
import ToolTip from '../toolTip';

describe('ToolTip', () => {
  it('renders children and visually-hidden tooltip content', () => {
    render(
      <ToolTip tip="Hello there">
        <button>Hover me</button>
      </ToolTip>
    );

    // Assert child renders
    expect(screen.getByText('Hover me')).toBeInTheDocument();

    // Tooltip text is rendered in the DOM, but hidden until hover
    expect(screen.getByText('Hello there')).toBeInTheDocument();
  });
});
