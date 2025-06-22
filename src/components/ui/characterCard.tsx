import React, { useEffect, useState } from 'react';
import { Card } from './card';
import { useAppSelector } from '../../store/hooks';
import { fetchPlanetById } from '../../services/cacheApi';
import type { CHARACTER, PLANET } from '../../types';

const CharacterCard: React.FC<{ character: CHARACTER }> = ({ character }) => {
  const planetId: string | undefined = character.properties.homeworld.split('/').pop();
  const planetCache: Record<string, PLANET> = useAppSelector((state) => state.cache.planetsById);
  const [planetError, setPlanetError] = useState<string | null>(null);

  // Fetch logic
  useEffect(() => {
    fetchPlanetById(planetId ?? '').catch((e) => {
      setPlanetError(`Planet fetch failed for ${planetId}: ${e}`);
      console.warn(`Planet fetch failed for ${planetId}`, e);
    });
  }, [planetId]);

  return (
    <div className="p-2">
      <Card title={character.properties.name}>
        <>
          <div>Gender: {character.properties.gender}</div>
          <div>
            Hometown:&nbsp;
            {planetCache[planetId ?? ''] ? (
              planetCache[planetId ?? ''].properties.name
            ) : planetError ? (
              'Unknown'
            ) : (
              <span className="text-gray-400 italic">Loading planet...</span>
            )}
          </div>
        </>
      </Card>
    </div>
  );
};

export default CharacterCard;
