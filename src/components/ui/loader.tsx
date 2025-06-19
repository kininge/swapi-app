import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="h-10 w-10 border-4 border-theme-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
