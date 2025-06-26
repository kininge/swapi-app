import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../features/characters/favoriteSlice';
import clsx from 'clsx';
import type { CHARACTER } from '../types';

interface Props {
  character: CHARACTER;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteToggle: React.FC<Props> = ({ character, className = '', size = 'md' }) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => !!state.favorite.favoriteCharacters[character.uid]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // avoid navigation if used inside a link
    dispatch(toggleFavorite(character));
  };

  const sizeClass = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <button
      data-testid="favorite-button"
      title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      onClick={handleClick}
      className={clsx(
        'transition-colors duration-200 focus:outline-none',
        isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400',
        sizeClass,
        className
      )}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
};

export default FavoriteToggle;
