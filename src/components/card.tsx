import React from 'react';

type CARD_PROP = {
  children?: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CARD_PROP> = ({ children, className }) => {
  return (
    <div className={`bg-theme-secondary text-theme-text rounded-2xl shadow-md ${className ?? ''}`}>
      {children}
    </div>
  );
};
