import React from 'react';
import './card.css';

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`card ${className ?? ''}`}>
      <div>{children}</div>
    </div>
  );
};
