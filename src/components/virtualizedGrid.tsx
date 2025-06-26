// src/components/ui/VirtualizedGrid.tsx
import React, { useState } from 'react';
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
  className = 'h-[calc(100vh-154px)]',
}: VirtualizedGridProps<T>) {
  const [lastTriggerRow, setLastTriggerRow] = useState<number | null>(null);

  // load more logic hit
  // const shouldTriggerLoad = (visibleRowStopIndex: number, columnCount: number): boolean => {
  //   const lastRow = Math.ceil(items.length / columnCount) - 1;
  //   const effectiveThreshold = Math.max(0, threshold - 2 * (columnCount - 1));
  //   return visibleRowStopIndex === lastRow - effectiveThreshold;
  // };
  const shouldTriggerLoad = (visibleRowStopIndex: number, columnCount: number) => {
    const lastRow = Math.ceil(items.length / columnCount) - 1;
    const effectiveThreshold = Math.max(0, threshold - 2 * (columnCount - 1));

    if (visibleRowStopIndex >= lastRow - effectiveThreshold) {
      if (lastTriggerRow !== visibleRowStopIndex) {
        setLastTriggerRow(visibleRowStopIndex);
        return true;
      }
    }
    return false;
  };

  return (
    <div className={className}>
      <AutoSizer>
        {({ height, width }) => {
          if (width === 0 || height === 0) return null; // protect

          const columnCount = Math.max(1, Math.floor(width / minColumnWidth));
          const rowCount = Math.ceil(items.length / columnCount);
          const columnWidth = Math.floor(width / columnCount);

          return (
            <div className="min-h-screen flex flex-col">
              <FixedSizeGrid
                height={height}
                width={width}
                columnCount={columnCount}
                columnWidth={columnWidth}
                rowHeight={itemHeight}
                rowCount={rowCount}
                onItemsRendered={({ visibleRowStopIndex }) => {
                  if (
                    onLoadMore &&
                    canLoadMore &&
                    shouldTriggerLoad(visibleRowStopIndex, columnCount)
                  ) {
                    onLoadMore();
                  }
                }}
                outerElementType={React.forwardRef<
                  HTMLDivElement,
                  React.HTMLAttributes<HTMLDivElement>
                >((props, ref) => (
                  <div {...props} ref={ref} data-testid="virtual-grid-scroll-container" />
                ))}
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
            </div>
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default VirtualizedGrid;
