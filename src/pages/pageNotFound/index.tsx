import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      data-testid="page-not-found-page"
      className="min-h-screen flex flex-col justify-center items-center text-theme-primary text-center px-4"
    >
      <h1 className="text-4xl md:text-5xl font-display mb-4">Lost in a galaxy far, far away...</h1>

      <p className="text-lg md:text-xl max-w-xl mb-6 text-theme-primary">
        This page doesn't exist. You’ve wandered into the Outer Rim, beyond the Republic’s maps.
      </p>

      <button
        data-testid="go-to-home-button"
        onClick={() => navigate('/home')}
        className="px-6 py-3 rounded-full bg-theme-primary hover:bg-theme-primaryHover text-theme-text font-bold transition"
      >
        Return to Your Home Planet
      </button>

      <p className="mt-10 text-sm text-theme-primary italic">
        “These aren’t the routes you’re looking for.”
      </p>
    </div>
  );
};

export default PageNotFound;
