import './App.css';
import { CharacterList } from './features/characters/characterList';

function App() {
  return (
    <div className="bg-theme-background min-h-screen text-theme-text">
      <header className="text-center text-3xl py-6 font-display text-theme-primary border-b border-theme-border">
        Star Wars Characters
      </header>
      <CharacterList />
    </div>
  );
}

export default App;
