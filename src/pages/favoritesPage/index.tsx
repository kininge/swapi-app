import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import CharacterCard from '../../components/characterCard';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const CARD_HEIGHT = 160; // Adjust to fit your card height incl. margins/padding

const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector((state) => state.favorite.favoriteCharacters);
  const favoriteList = useMemo(() => Object.values(favorites), [favorites]);

  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <h1 className="text-3xl font-bold mb-4">❤️ Your Favorite Characters</h1>

      {favoriteList.length === 0 ? (
        <div className="text-gray-500 text-lg">
          No favorites yet. Explore characters and add some!
        </div>
      ) : (
        <div className="h-full">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={favoriteList.length}
                itemSize={CARD_HEIGHT}
                width={width}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <CharacterCard character={favoriteList[index]} />
                  </div>
                )}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
