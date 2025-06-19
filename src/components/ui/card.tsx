import React from 'react';
import './card.css';

type CardProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ title, subtitle, children, className }) => {
  return (
    <div className={`card ${className ?? ''}`}>
      <h2 className="text-xl font-bold text-theme-primary font-display">{title}</h2>
      {subtitle && <p className="text-sm text-theme-accent mb-2">{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
};
