import React from 'react';

type CARD_PROP = {
  children?: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CARD_PROP> = ({ children, className }) => {
  return (
    <div
      className={`bg-theme-secondary text-theme-text rounded-3xl p-4 shadow-md ${className ?? ''}`}
    >
      <div>{children}</div>
    </div>
  );
};
