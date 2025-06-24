import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '../../components/loader';
import CharacterCard from '../../components/characterCard';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCharacters,
  resetCharacters,
  selectCharacters,
  selectCharacterStatus,
  selectNext,
} from '../../features/characters/characterSlice';
import debounce from 'lodash.debounce';

const ITEM_HEIGHT = 400;

const CharacterListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const status = useAppSelector(selectCharacterStatus);
  const next = useAppSelector(selectNext);
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const [page, setPage] = useState(1);

  const debouncedFetch = useRef(
    debounce((_page: number) => {
      dispatch(fetchCharacters(_page));
    }, 100)
  ).current;
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status !== 'idle' && next) {
      debouncedFetch(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    // initial call
    if (status === 'idle' && next === null) {
      console.log('initial call', status, next, page);
      debouncedFetch(page);
    }

    return () => {
      dispatch(resetCharacters());
      debouncedFetch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadMore = () => {
    setPage((previousPage) => previousPage + 1);
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
            >
              {renderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}

      {/* Loader for infinite scroll */}
      <div ref={loaderRef} className="h-20 flex justify-center items-center">
        {isLoading && <Loader />}
      </div>

      {!isLoading && !isIdle && characters.length === 0 && (
        <div className="text-center text-gray-400 mt-12">No characters found.</div>
      )}
    </div>
  );
};

export default CharacterListPage;
