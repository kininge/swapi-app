import React from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  fetchCharacters,
  resetCharacters,
  selectCharacters,
  selectCharacterStatus,
  selectNext,
} from '../../features/characters/characterSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import CharacterList from '../../components/characterList';

const HomePage: React.FC = () => {
  const characters = useAppSelector(selectCharacters);
  const { status, loadMore, shouldLoadMore } = useInfiniteScroll({
    fetchFn: fetchCharacters,
    resetFn: resetCharacters,
    selectStatus: selectCharacterStatus,
    selectNext: selectNext,
  });
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';

  return (
    <CharacterList
      characters={characters}
      isLoading={isLoading}
      isIdle={isIdle}
      canLoadMore={shouldLoadMore}
      onLoadMore={loadMore}
    />
  );
};

export default HomePage;
