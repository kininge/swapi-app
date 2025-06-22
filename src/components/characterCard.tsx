import React from 'react';
import { Card } from './card';
import type { CHARACTER } from '../types';
import { Link } from 'react-router-dom';
import PlanetInfo from './planetInfo';
import FavoriteToggle from './favoriteToggle'; // 📦 Reusable favorite toggle

const CharacterCard: React.FC<{ character: CHARACTER }> = ({ character }) => {
  return (
    <div className="relative p-2 group">
      <Link to={`/character/${character.uid}`} state={{ character }}>
        <Card title={character.properties.name}>
          <>
            {/* ❤️ Favorite button in top right corner */}
            <div className="absolute top-2 right-2 z-10">
              <FavoriteToggle character={character} size="md" />
            </div>

            <div>Gender: {character.properties.gender}</div>
            <div>
              Hometown:&nbsp;
              <PlanetInfo planetUrl={character.properties.homeworld} />
            </div>
          </>
        </Card>
      </Link>
    </div>
  );
};

export default CharacterCard;
