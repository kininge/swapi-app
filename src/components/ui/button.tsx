import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-2xl font-medium shadow-md transition-colors duration-200';

  const variantStyles = {
    primary: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
  };

  return (
    <button className={clsx(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  );
};
