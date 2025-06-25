// src/components/ui/VirtualizedGrid.tsx
import React from 'react';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

type VirtualizedGridProps<T> = {
  items: T[];
  itemHeight: number;
  minColumnWidth: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  canLoadMore: boolean;
  onLoadMore?: () => void;
  threshold?: number;
  className?: string;
};

function VirtualizedGrid<T>({
  items,
  itemHeight,
  minColumnWidth,
  renderItem,
  canLoadMore,
  onLoadMore,
  threshold = 5,
  className = 'h-[calc(100vh-120px)]',
}: VirtualizedGridProps<T>) {
  // load more logic hit
  const shouldTriggerLoad = (visibleRowStopIndex: number, columnCount: number): boolean => {
    const lastRow = Math.ceil(items.length / columnCount) - 1;
    const effectiveThreshold = Math.max(0, threshold - 2 * (columnCount - 1));
    return visibleRowStopIndex === lastRow - effectiveThreshold;
  };

  return (
    <div className={className}>
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.max(1, Math.floor(width / minColumnWidth));
          const rowCount = Math.ceil(items.length / columnCount);
          const columnWidth = Math.floor(width / columnCount);

          return (
            <FixedSizeGrid
              height={height}
              width={width}
              rowCount={rowCount}
              columnCount={columnCount}
              columnWidth={columnWidth}
              rowHeight={itemHeight}
              onItemsRendered={({ visibleRowStopIndex }) => {
                if (
                  onLoadMore &&
                  canLoadMore &&
                  shouldTriggerLoad(visibleRowStopIndex, columnCount)
                ) {
                  onLoadMore();
                }
              }}
            >
              {({ rowIndex, columnIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                const item = items[index];
                return item ? (
                  <div style={style} data-testid="grid-item">
                    {renderItem(item, index)}
                  </div>
                ) : null;
              }}
            </FixedSizeGrid>
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default VirtualizedGrid;
