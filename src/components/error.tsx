import React from 'react';

interface ErrorProps {
  message?: string;
  className?: string;
}

export const Error: React.FC<ErrorProps> = ({
  message = 'Something went wrong.',
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`text-red-400 text-center p-4 border border-red-500 rounded bg-red-100/10 ${className}`}
      data-testid="error-message"
    >
      <p className="text-lg font-semibold">🚨 Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};
