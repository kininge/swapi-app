// src/components/Layout/Layout.tsx
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-theme-background text-theme-text font-sans">
      <header className="bg-theme-secondary text-theme-text px-6 py-4 shadow-md flex justify-between items-center">
        {/* app log */}
        <Link
          data-testid="app-logo-home-route-link"
          to="/home"
          className="hover:underline text-theme-primary"
        >
          <h1 className="text-xl font-bold">SWAPI</h1>
        </Link>

        {/* nav bar */}
        <nav className="space-x-4">
          {/* home nav bar tab */}
          <Link
            data-testid="home-route-link"
            to="/home"
            className="hover:underline text-theme-primary"
          >
            Home
          </Link>

          {/* favorites nav bar tab */}
          <Link
            data-testid="favorites-route-link"
            to="/favorites"
            className="hover:underline text-theme-primary"
          >
            Favorites
          </Link>
        </nav>
      </header>

      {/* routing content render here */}
      <main className="p-6 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
