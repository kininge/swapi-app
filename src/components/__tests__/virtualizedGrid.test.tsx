import React from 'react';
import { render, screen } from '@testing-library/react';
import VirtualizedGrid from '../virtualizedGrid';

// Mock AutoSizer to always return fixed height/width
jest.mock('react-virtualized-auto-sizer', () => {
  return ({
    children,
  }: {
    children: (size: { height: number; width: number }) => React.ReactNode;
  }) => children({ height: 500, width: 400 });
});

describe('VirtualizedGrid', () => {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i}`);

  // item render check
  it('renders items using renderItem', () => {
    render(
      <VirtualizedGrid
        items={items}
        itemHeight={50}
        minColumnWidth={100}
        renderItem={(item) => <div>{item}</div>}
        canLoadMore={false}
      />
    );

    // since grid virtualization only renders visible items,
    // we check that at least the first visible item appears.
    expect(screen.getByText('Item 0')).toBeInTheDocument();
  });

  // no item to render condition check
  it('renders empty grid when no items are provided', () => {
    const { container } = render(
      <VirtualizedGrid
        items={[]}
        itemHeight={50}
        minColumnWidth={100}
        renderItem={(item) => <div>{item}</div>}
        canLoadMore={false}
      />
    );

    // ✅ safer assertion: no items rendered
    const renderedCells = container.querySelectorAll(
      '[role="gridcell"], [data-testid="grid-item"]'
    );
    expect(renderedCells.length).toBe(0);
  });

  // load more trigger check
  it('does not call onLoadMore if canLoadMore is false', () => {
    const onLoadMore = jest.fn();

    render(
      <VirtualizedGrid
        items={items}
        itemHeight={50}
        minColumnWidth={100}
        renderItem={(item) => <div>{item}</div>}
        canLoadMore={false}
        onLoadMore={onLoadMore}
      />
    );

    // no scroll simulation here — onLoadMore must not be called.
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  // Note: actual scroll position to trigger onLoadMore will be check in Cypress
});
