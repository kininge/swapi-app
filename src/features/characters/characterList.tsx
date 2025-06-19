import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Loader } from '../../components/ui/loader';
import { useGetCharactersQuery } from '../../services/characterApi';
import { FixedSizeList as List } from 'react-window';

type Character = {
  name: string;
  uid: string;
};

export const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const { data, isLoading } = useGetCharactersQuery(page);

  useEffect(() => {
    // on new data load
    if (data?.results?.length) {
      setCharacters((previousState) => [...previousState, ...(data?.results || [])]);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-theme-background min-h-screen">
      {characters.map((character) => (
        <Card key={character.uid} title={character.name} subtitle={`ID: ${character.uid}`} />
      ))}
      {isLoading && <Loader />}
    </div>
  );
};
