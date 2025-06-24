import React from 'react';
import { Loader } from '../../components/loader';
import CharacterCard from '../../components/characterCard';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useAppSelector } from '../../store/hooks';
import {
  fetchCharacters,
  resetCharacters,
  selectCharacters,
  selectCharacterStatus,
  selectNext,
} from '../../features/characters/characterSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const ITEM_HEIGHT = 400;

const CharacterListPage: React.FC = () => {
  const characters = useAppSelector(selectCharacters);
  const { status, loadMore, shouldLoadMore } = useInfiniteScroll({
    fetchFn: fetchCharacters,
    resetFn: resetCharacters,
    selectStatus: selectCharacterStatus,
    selectNext: selectNext,
  });
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';

  const handleLoadMore = ({ visibleStopIndex }: { visibleStopIndex: number }) => {
    if (visibleStopIndex === characters.length - 5 && shouldLoadMore) {
      loadMore();
    }
  };

  const renderRow = React.memo(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      return (
        <div style={style}>
          <CharacterCard character={characters[index]} />
        </div>
      );
    }
  );

  return (
    <div className="bg-theme-background min-h-screen text-theme-text p-4">
      <h1 className="text-3xl font-display mb-4 text-theme-primary">Characters</h1>

      {characters.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={ITEM_HEIGHT}
              itemCount={characters.length}
              onItemsRendered={handleLoadMore}
            >
              {renderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}

      <div className="h-20 flex justify-center items-center">{isLoading && <Loader />}</div>

      {!isLoading && !isIdle && characters.length === 0 && (
        <div className="text-center text-gray-400 mt-12">No characters found.</div>
      )}
    </div>
  );
};

export default CharacterListPage;
