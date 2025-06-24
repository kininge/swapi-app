// src/components/ui/VirtualizedList.tsx
import React from 'react';
import { FixedSizeList, type ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

type VirtualizedListProps<T> = {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  onLoadMore?: (visibleStopIndex: number) => void;
  threshold?: number;
  className?: string;
};

function VirtualizedList<T>({
  items,
  itemHeight,
  renderItem,
  onLoadMore,
  threshold = 5,
  className = 'h-full', // Make sure the parent constrains height
}: VirtualizedListProps<T>) {
  // fetch next data logic
  const handleItemsRendered = ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
    if (onLoadMore && visibleStopIndex >= items.length - threshold) {
      onLoadMore(visibleStopIndex);
    }
  };

  // render content
  const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    return <div style={style}>{renderItem(items[index], index)}</div>;
  };

  return (
    <div className={className}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={itemHeight}
            itemCount={items.length}
            onItemsRendered={handleItemsRendered}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

export default VirtualizedList;
