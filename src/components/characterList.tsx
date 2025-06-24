import React from 'react';
import type { CHARACTER } from '../types';
import CharacterCard from './characterCard';
import CharacterCardSkeleton from './skeletons/characterCardSkeleton';
import VirtualizedGrid from './virtualizedGrid';

type CharacterListProps = {
  characters: CHARACTER[];
  isLoading: boolean;
  isIdle: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;
};

const ITEM_HEIGHT = 400;

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  isLoading,
  isIdle,
  canLoadMore,
  onLoadMore,
}) => {
  return (
    <>
      {characters.length > 0 && (
        <VirtualizedGrid
          items={characters}
          itemHeight={ITEM_HEIGHT}
          minColumnWidth={340}
          renderItem={(character: CHARACTER) => <CharacterCard character={character} />}
          canLoadMore={canLoadMore}
          onLoadMore={onLoadMore}
          className="h-[calc(100vh-120px)]"
        />
      )}

      {/* Skeleton loader (only when list is already rendered) */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isIdle && characters.length === 0 && (
        <div className="text-center text-gray-400 mt-12">No characters found.</div>
      )}
    </>
  );
};

export default CharacterList;
