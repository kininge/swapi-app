import React from 'react';
import CharacterList from '../../components/characterList';
import { useSearchCharacters } from '../../hooks/useSearchCharacters';

const SearchPage: React.FC = () => {
  const { query, characters, isLoading, error, handleInputChange } = useSearchCharacters();

  return (
    <div data-testid="search-character-page" className="p-4 max-w-4xl mx-auto">
      <input
        data-testid="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by name..."
        className="w-full px-4 py-2 outline-none border border-theme-border focus:ring-2 focus:ring-theme-primary bg-theme-background text-white mb-4 rounded-3xl"
      />

      <CharacterList
        characters={characters}
        isLoading={isLoading}
        isIdle={query.trim() === ''}
        error={error}
        noCharacterMessage={`No character found for "${query.trim()}"`}
      />
    </div>
  );
};

export default SearchPage;
