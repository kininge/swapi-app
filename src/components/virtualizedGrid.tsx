import React, { useCallback, useRef } from 'react';
import { FixedSizeGrid as Grid, type GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

type VirtualizedGridProps<T> = {
  items: T[];
  itemHeight: number;
  minColumnWidth: number;
  isLoading?: boolean;
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
  isLoading = false,
  renderItem,
  canLoadMore,
  onLoadMore,
  threshold = 5,
  className = 'h-[calc(100vh-154px)]',
}: VirtualizedGridProps<T>) {
  const pagesLoaded = useRef<Set<number>>(new Set());

  // Move handleItemsRendered to the top level of the component
  const handleItemsRendered = useCallback(
    ({
      visibleRowStopIndex,
      columnCount,
      rowCount,
    }: {
      visibleRowStopIndex: number;
      columnCount: number;
      rowCount: number;
    }) => {
      const currentPage = Math.floor(items.length / (columnCount * threshold));
      if (
        visibleRowStopIndex >= rowCount - threshold &&
        canLoadMore &&
        onLoadMore &&
        !pagesLoaded.current.has(currentPage)
      ) {
        onLoadMore();
        pagesLoaded.current.add(currentPage);
      }
    },
    [items.length, canLoadMore, onLoadMore, threshold]
  );

  return (
    <div className={className}>
      <AutoSizer>
        {({ width, height }) => {
          const columnCount = Math.max(1, Math.floor(width / minColumnWidth));
          const estimatedItemCount = canLoadMore
            ? items.length + columnCount * threshold
            : items.length;
          const rowCount = Math.ceil(estimatedItemCount / columnCount);

          // Cell is now defined as a stable callback
          const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
            const index = rowIndex * columnCount + columnIndex;
            const item = items[index];

            return (
              <div style={style} className="p-2" key={index}>
                {item ? (
                  renderItem(item, index)
                ) : canLoadMore || isLoading ? (
                  <div
                    data-testid="character-card-skeleton"
                    className="h-full w-full bg-gray-700 rounded-lg animate-pulse"
                  />
                ) : null}
              </div>
            );
          };

          // Wrap the original handleItemsRendered to inject columnCount and rowCount
          const onItemsRendered = ({ visibleRowStopIndex }: { visibleRowStopIndex: number }) => {
            handleItemsRendered({ visibleRowStopIndex, columnCount, rowCount });
          };

          return (
            <div data-testid="virtual-grid-scroll-container">
              <Grid
                columnCount={columnCount}
                columnWidth={Math.floor(width / columnCount)}
                height={height}
                width={width}
                rowCount={rowCount}
                rowHeight={itemHeight}
                onItemsRendered={onItemsRendered}
              >
                {Cell}
              </Grid>
            </div>
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default VirtualizedGrid;
