import React from 'react';
import type { CHARACTER } from '../types';
import CharacterCard from './characterCard';
import VirtualizedGrid from './virtualizedGrid';
import CharacterCardSkeleton from './skeletons/characterCardSkeleton';

type CharacterListProps = {
  characters?: CHARACTER[];
  isLoading?: boolean;
  isIdle?: boolean;
  error?: string | null;
  noCharacterMessage?: string;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
};

const ITEM_HEIGHT = 370;

// error or empty message
const renderEmptyState = (message: string) => (
  <div data-testid="character-card-empty" className="text-center text-gray-400 mt-12">
    {message}
  </div>
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
      {characters.length > 0 && (
        <div data-testid="character-list-container">
          <VirtualizedGrid
            items={characters}
            itemHeight={ITEM_HEIGHT}
            minColumnWidth={380}
            isLoading={isLoading}
            renderItem={(character: CHARACTER) => <CharacterCard character={character} />}
            canLoadMore={canLoadMore}
            onLoadMore={onLoadMore}
            className="h-[calc(100vh-120px)]"
          />
        </div>
      )}

      {/* skeleton loader */}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <CharacterCardSkeleton key={i} data-testid="character-card-skeleton" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {((!isLoading && !isIdle && characters.length === 0) || error !== null) &&
        renderEmptyState(noCharacterMessage)}
    </>
  );
};

export default CharacterList;
