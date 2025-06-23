import { Routes, Route, Navigate } from 'react-router-dom';
// import CharacterList from '../pages/characterListPage';
import CharacterDetail from '../pages/characterDetailPage';
import FavoriteCharacters from '../pages/favoritesPage';
import Layout from '../layouts/layout';
import PageNotFound from '../pages/pageNotFound';
import SearchPage from '../pages/searchPage';
import { HomePage } from '../newPage/homePage';

const AppRoute = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/character/:characterId" element={<CharacterDetail />} />
      <Route path="/favorites" element={<FavoriteCharacters />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

export default AppRoute;
