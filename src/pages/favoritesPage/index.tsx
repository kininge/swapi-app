import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import CharacterList from '../../components/characterList';
import type { CHARACTER } from '../../types';

const FavoritesPage: React.FC = () => {
  const favorites: Record<string, CHARACTER> = useAppSelector(
    (state) => state.favorite.favoriteCharacters
  );
  const favoriteList: CHARACTER[] = useMemo(() => Object.values(favorites), [favorites]);

  return (
    <div data-testid="favorite-list-page" className="h-[calc(100vh-4rem)] p-4">
      <CharacterList
        characters={favoriteList}
        noCharacterMessage="You haven't liked any characters yet!"
      />
    </div>
  );
};

export default FavoritesPage;
