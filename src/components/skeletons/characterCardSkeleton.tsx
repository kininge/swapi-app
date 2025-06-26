import React from 'react';
import clsx from 'clsx';

const shimmer = 'animate-pulse bg-gray-300 dark:bg-gray-600';

const CharacterCardSkeleton: React.FC = () => {
  return (
    <div
      data-testid="character-card-skeleton"
      className="bg-theme-secondary  rounded-xl shadow p-4 mb-4 w-full h-[370px] min-w-[380px] flex flex-col gap-4"
    >
      {/* Image placeholder */}
      <div className={clsx('rounded-md', shimmer, 'w-full h-40')} />

      {/* Name */}
      <div className={clsx('h-6 w-2/3 rounded', shimmer)} />

      {/* 2 rows of info */}
      <div className="space-y-2">
        <div className={clsx('h-4 w-1/2 rounded', shimmer)} />
        <div className={clsx('h-4 w-1/3 rounded', shimmer)} />
      </div>

      {/* Favorite or action button */}
      <div className={clsx('mt-auto h-8 w-24 rounded', shimmer)} />
    </div>
  );
};

export default React.memo(CharacterCardSkeleton);
