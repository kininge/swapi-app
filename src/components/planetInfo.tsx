import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { fetchPlanetById } from '../services/cacheApi';
import type { PLANET } from '../types';

type PlanetInfoProps = { planetUrl: string };

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planetUrl }) => {
  const planetId: string | undefined = planetUrl?.split('/').pop();
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
    <>
      {planetCache[planetId ?? ''] ? (
        planetCache[planetId ?? ''].properties.name
      ) : planetError ? (
        'Unknown'
      ) : (
        <span className="text-gray-400 italic">Loading planet...</span>
      )}
    </>
  );
};

export default PlanetInfo;
