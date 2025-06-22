import React, { useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useSearchCharactersByNameQuery } from '../../services/characterApi';
import CharacterCard from '../../components/ui/characterCard';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchTerm(value.trim());
    }, 300)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const { data, isLoading, isError, isFetching } = useSearchCharactersByNameQuery(searchTerm, {
    skip: !searchTerm,
  });

  const characters = data?.results || data?.result || [];

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

      {isLoading || isFetching ? (
        <p className="text-white mt-6">Loading...</p>
      ) : isError ? (
        <p className="text-red-400 mt-6">Something went wrong. Please try again.</p>
      ) : searchTerm && characters.length === 0 ? (
        <p className="text-yellow-400 mt-6">No characters found for “{searchTerm}”.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {characters.map((character) => (
            <CharacterCard key={character.uid} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
