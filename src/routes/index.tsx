import { Routes, Route, Navigate } from 'react-router-dom';
import CharacterList from '../pages/characterListPage';
import CharacterDetail from '../pages/characterDetailPage';
import FavoriteCharacters from '../pages/favoritesPage';
import EditCharacter from '../pages/editCharacterPage';
import Layout from '../layouts/layout';
import PageNotFound from '../pages/pageNotFound';

const AppRoute = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<CharacterList />} />
      <Route path="/character/:characterId" element={<CharacterDetail />} />
      <Route path="/edit/:characterId" element={<EditCharacter />} />
      <Route path="/favorites" element={<FavoriteCharacters />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

export default AppRoute;
