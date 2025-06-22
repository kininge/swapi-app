import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './App.css';
import { useCacheBoot } from './hooks/useCacheBoot';

function App() {
  useCacheBoot();

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
