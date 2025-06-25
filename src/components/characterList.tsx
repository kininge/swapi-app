import React from 'react';
import type { CHARACTER } from '../types';
import CharacterCard from './characterCard';
import CharacterCardSkeleton from './skeletons/characterCardSkeleton';
import VirtualizedGrid from './virtualizedGrid';

type CharacterListProps = {
  characters?: CHARACTER[];
  isLoading?: boolean;
  isIdle?: boolean;
  error?: string | null;
  noCharacterMessage?: string;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
};

const ITEM_HEIGHT = 400;

// skeleton loader
const renderSkeletons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <CharacterCardSkeleton key={i} data-testid="character-card-skeleton" />
    ))}
  </div>
);

// error or empty message
const renderEmptyState = (message: string) => (
  <div className="text-center text-gray-400 mt-12">{message}</div>
);

const CharacterList: React.FC<CharacterListProps> = ({
  characters = [],
  isLoading = false,
  isIdle = false,
  error = null,
  noCharacterMessage = 'No character found',
  canLoadMore = false,
  onLoadMore = () => {},
}) => {
  return (
    <>
      {characters.length > 0 && error === null && (
        <VirtualizedGrid
          items={characters}
          itemHeight={ITEM_HEIGHT}
          minColumnWidth={380}
          renderItem={(character: CHARACTER) => <CharacterCard character={character} />}
          canLoadMore={canLoadMore}
          onLoadMore={onLoadMore}
          className="h-[calc(100vh-120px)]"
        />
      )}

      {/* Skeleton loader (only when list is already rendered) */}
      {isLoading && error === null && renderSkeletons()}

      {/* Empty state */}
      {((!isLoading && !isIdle && characters.length === 0) || error !== null) &&
        renderEmptyState(noCharacterMessage)}
    </>
  );
};

export default CharacterList;
