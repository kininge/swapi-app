import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { useCacheBoot } from './hooks/useCacheBoot';

function App() {
  // get film and starship data, reverse map it and cache it
  useCacheBoot();

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
