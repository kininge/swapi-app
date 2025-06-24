import React, { useState, useRef, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import CharacterCard from '../../components/characterCard';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { CHARACTER } from '../../types';
import {
  fetchSearchedCharacters,
  resetSearchedCharacterSlice,
} from '../../features/characters/searchSlice';

const ROW_HEIGHT = 160; // Approximate height of each CharacterCard + margin

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const characters: CHARACTER[] = useAppSelector((state) => state.searchedCharacters.list);
  const status = useAppSelector((state) => state.searchedCharacters.status);
  const error = useAppSelector((state) => state.searchedCharacters.error);
  const isLoading = status == 'loading';

  console.log(status, error, characters);

  const debouncedSearch = useRef(
    debounce((value: string) => {
      dispatch(fetchSearchedCharacters(value.trim()));
    }, 300)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value.trim()); // to show data in search
    debouncedSearch(value.trim());
  };

  const Row = useMemo(() => {
    return ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const character = characters[index];
      return (
        <div style={style}>
          <CharacterCard key={character.uid} character={character} />
        </div>
      );
    };
  }, [characters]);

  useEffect(() => {
    return () => {
      dispatch(resetSearchedCharacterSlice());
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Search Characters</h1>

      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by name..."
        className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-400"
      />

      {isLoading ? (
        query.trim() ? (
          <p className="text-white mt-6">Loading...</p>
        ) : null
      ) : error ? (
        <p className="text-red-400 mt-6">{error}</p>
      ) : query.trim().length > 0 && characters.length === 0 ? (
        <p className="text-yellow-400 mt-6">No characters found for “{query.trim()}”.</p>
      ) : (
        <div className="mt-6 h-[600px]">
          {characters.length > 0 && (
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemSize={ROW_HEIGHT}
                  itemCount={characters.length}
                >
                  {Row}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
