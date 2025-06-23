import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../newStore/hooks';
import { useGetPlanetByIdQuery } from '../features/planets/planetAPI';
import { extractIdFromUrl } from '../utils/extractIdFromUrl';
import { mergeCharacterWithEdits } from '../utils/characterUtils';
import { toggleFavorite } from '../features/characters/favoriteCharacterSlice';
import type { CHARACTER } from '../types';
import { fetchCharacters } from '../features/characters/characterSlice'; // optional thunk
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const CharacterCard: React.FC<{ character: CHARACTER }> = ({ character }) => {
  const dispatch = useAppDispatch();

  const favoriteIds = useAppSelector((state) => Object.keys(state.favorites.characters));
  const overrides = useAppSelector((state) => state.edits.overrides[character.uid]);

  const mergedCharacter = mergeCharacterWithEdits(character, overrides);

  const planetId = extractIdFromUrl(mergedCharacter.properties.homeworld);
  const { data: planet } = useGetPlanetByIdQuery(planetId);

  const isFavorite = favoriteIds.includes(mergedCharacter.uid);

  return (
    <div className="border rounded-xl p-4 mb-4 shadow-md bg-white dark:bg-gray-800 transition">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          {mergedCharacter.properties.name}
          {isFavorite && <span className="text-yellow-400 ml-2">★</span>}
        </h2>
        <button
          onClick={() => dispatch(toggleFavorite(mergedCharacter))}
          className="text-sm text-blue-500 hover:underline"
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
      <p>
        <strong>Height:</strong> {mergedCharacter.properties.height}
      </p>
      <p>
        <strong>Mass:</strong> {mergedCharacter.properties.mass}
      </p>
      <p>
        <strong>Homeworld:</strong> {planet?.properties?.name || 'Loading...'}
      </p>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.character.list);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll(loadMoreRef, () => {
    if (status !== 'loading') {
      setPage((prev) => prev + 1);
    }
  });

  useEffect(() => {
    dispatch(fetchCharacters(page)); // thunk should handle deduplication if needed
  }, [dispatch, page]);

  console.log('------> characters: ', characters);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Star Wars Characters</h1>
      {characters.map((char) => (
        <CharacterCard key={char.uid} character={char} />
      ))}

      <div ref={loadMoreRef} className="h-8" />
    </div>
  );
};
