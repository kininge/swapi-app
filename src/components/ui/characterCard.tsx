import React from 'react';
import { Card } from './card';
import type { CHARACTER } from '../../types';
import { Link } from 'react-router-dom';
import PlanetInfo from './planetInfo';

const CharacterCard: React.FC<{ character: CHARACTER }> = ({ character }) => {
  return (
    <div className="p-2">
      <Link to={`/character/${character.uid}`} state={{ character }}>
        <Card title={character.properties.name}>
          <>
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
