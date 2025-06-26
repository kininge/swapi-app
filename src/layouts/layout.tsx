// src/components/Layout/Layout.tsx
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-theme-background text-theme-text font-sans">
      <header className="bg-theme-secondary text-theme-text px-6 py-4 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* app logo */}
        <Link
          data-testid="app-logo-home-route-link"
          to="/home"
          className="hover:underline text-theme-primary text-2xl font-display tracking-wide"
        >
          SWAPI
        </Link>

        {/* home nav tab */}
        <nav className="flex space-x-6 text-sm md:text-base">
          <Link
            data-testid="home-route-link"
            to="/home"
            className="hover:text-theme-primary transition"
          >
            Home
          </Link>

          {/* search nav tab */}
          <Link
            data-testid="search-route-link"
            to="/search"
            className="hover:text-theme-primary transition"
          >
            Search
          </Link>

          {/* favorite nav tab */}
          <Link
            data-testid="favorites-route-link"
            to="/favorites"
            className="hover:text-theme-primary transition"
          >
            Favorites
          </Link>
        </nav>
      </header>

      {/* routing content render here */}
      <main className="p-6 sm:p-0 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
