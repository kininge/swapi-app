import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../../components/ui/card';
import { Loader } from '../../components/ui/loader';
import { useGetCharactersQuery } from '../../services/characterApi';
import { FixedSizeList as List } from 'react-window';

type Character = {
  name: string;
  uid: string;
};

const ITEM_HEIGHT = 160;

export const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const { data, isLoading } = useGetCharactersQuery({ page }) || { data: null, isLoading: false };
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // to load character data
  useEffect(() => {
    // on new data load
    if (data?.results?.length) {
      setCharacters((previousState) => [...previousState, ...(data?.results || [])]);
      if (!data.next) setHasMore(false); // No more pages
    }
  }, [data]);

  // to handle loading and scroll bottom
  useEffect(() => {
    if (!data || characters.length === 0) return;

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      // check is user scroll to bottom
      if (entries[0].isIntersecting && isLoading === false && hasMore) {
        setPage((previousPage) => previousPage + 1); // next page data load
      }
    });
    // track user scroll
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // clear data on unmount
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [isLoading, data, characters.length, hasMore]);

  // character data
  const renderCharacterCard = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const character = characters[index];
    return (
      <div id={character.uid} style={style} data-testid="character-card" className="p-2">
        <Card title={character.name} subtitle={`ID: ${character.uid}`} />
      </div>
    );
  };

  return (
    <div className="bg-theme-background min-h-screen text-theme-text p-4">
      <h1 className="text-3xl mb-4 font-display text-theme-primary">Characters</h1>

      {/* start wars characters */}
      <div data-testid="character-list-container">
        <List
          height={window.innerHeight}
          itemCount={characters.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
        >
          {renderCharacterCard}
        </List>
      </div>

      {/* loading */}
      <div
        ref={loaderRef}
        data-testid="loader-bottom"
        className="h-16 flex justify-center items-center"
      >
        {isLoading && <Loader />}
      </div>

      {/* on api fail or no data */}
      {isLoading === false && characters.length === 0 && (
        <p role="error-message" className="text-center text-gray-400">
          No characters found.
        </p>
      )}
    </div>
  );
};
