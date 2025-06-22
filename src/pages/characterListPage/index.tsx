// src/pages/CharacterListPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useGetCharactersListQuery } from '../../services/characterApi';
import { Loader } from '../../components/ui/loader';
import CharacterCard from '../../components/ui/characterCard';
import { FixedSizeList as List } from 'react-window';
import type { CHARACTER } from '../../types';

const ITEM_HEIGHT = 180;

const CharacterListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<CHARACTER[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching } = useGetCharactersListQuery({ page });

  // Append paginated characters (no duplicates)
  useEffect(() => {
    if (data) {
      const newCharacters: CHARACTER[] = data?.results || data?.result || [];
      setCharacters((currentState: CHARACTER[]) => {
        const seen = new Set(currentState.map((c) => c.uid));
        const uniqueNewCharacters = newCharacters.filter((c) => !seen.has(c.uid));
        return [...currentState, ...uniqueNewCharacters];
      });
    }
  }, [data]);

  // Infinite scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetching && data?.next) {
        setPage((prev) => prev + 1);
      }
    });

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [data, isFetching]);

  // Renderer for each row
  const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <CharacterCard character={characters[index]} />
    </div>
  );

  return (
    <div className="bg-theme-background min-h-screen text-theme-text p-4">
      <h1 className="text-3xl font-display mb-4 text-theme-primary">Characters</h1>

      {characters.length > 0 && (
        <List
          height={typeof window !== 'undefined' ? window.innerHeight - 100 : 600}
          itemCount={characters.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
        >
          {renderRow}
        </List>
      )}

      {/* Loader for infinite scroll */}
      <div ref={loaderRef} className="h-20 flex justify-center items-center">
        {(isLoading || isFetching) && <Loader />}
      </div>

      {!isLoading && characters.length === 0 && (
        <div className="text-center text-gray-400 mt-12">No characters found.</div>
      )}
    </div>
  );
};

export default CharacterListPage;
