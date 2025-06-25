import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { fetchPlanetById } from '../../features/planets/planetAPI';
import PlanetCardInfo from './planetCardInfo';
import PlanetDetailInfo from './planetDetailInfo';

type PLANET_INFO_PROPS = {
  planetUrl: string;
  variant?: 'card' | 'detail'; // default to 'detail' if not provided
};

const PlanetInfo: React.FC<PLANET_INFO_PROPS> = ({ planetUrl, variant = 'detail' }) => {
  const planetId = planetUrl?.split('/').filter(Boolean).pop();
  const planetCache = useAppSelector((state) => state.cache.planetsById);
  const [planetError, setPlanetError] = useState<string | null>(null);
  const planet = planetId ? planetCache[planetId] : undefined;

  useEffect(() => {
    if (!planet && planetId) {
      fetchPlanetById(planetId).catch((e) => {
        setPlanetError(`Planet fetch failed for ${planetId}: ${e}`);
        console.warn(`Planet fetch failed for ${planetId}`, e);
      });
    }
  }, [planetId, planet]);

  if (planetError) {
    return variant === 'card' ? <PlanetCardInfo error /> : <PlanetDetailInfo error />;
  }

  if (!planet) {
    return variant === 'card' ? <PlanetCardInfo loading /> : <PlanetDetailInfo loading />;
  }

  return variant === 'card' ? (
    <PlanetCardInfo planet={planet} />
  ) : (
    <PlanetDetailInfo planet={planet} />
  );
};

export default React.memo(PlanetInfo);
