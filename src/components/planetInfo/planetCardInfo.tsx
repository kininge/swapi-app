import React from 'react';
import type { PLANET, PLANET_EXTRA_DATA } from '../../types';
import { PLANETS } from '../../constants/planet.constant';

type PLANET_CARD_INFO_PROP = {
  planet?: PLANET;
  loading?: boolean;
  error?: boolean;
};

const PlanetCardInfo: React.FC<PLANET_CARD_INFO_PROP> = ({ planet, loading, error }) => {
  if (loading) {
    return (
      <div
        data-testid="planet-info-loading"
        className="h-[250px] w-full bg-gray-100 animate-pulse rounded-lg shadow"
      />
    );
  }

  if (error || !planet) {
    return (
      <div
        data-testid="planet-info-error"
        className="h-[250px] w-full bg-red-100 text-red-600 flex items-center justify-center rounded-lg shadow"
      >
        Failed to load planet
      </div>
    );
  }

  const planetName = planet.properties.name;
  const key = planetName.split(' ').join('_').toUpperCase() as keyof typeof PLANETS;
  const planetData: PLANET_EXTRA_DATA | undefined = PLANETS[key];

  return (
    <div
      data-testid="planet-info"
      className="h-[250px] w-full relative rounded-lg overflow-hidden shadow bg-white"
    >
      {planetData?.IMAGE && (
        <img
          src={planetData.IMAGE}
          alt={`${planetName} planet`}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="relative p-4">
        <h3 className="text-lg font-semibold text-gray-800">{planetName}</h3>
        <p className="text-sm text-gray-500">Climate: {planet.properties.climate}</p>
        <p className="text-sm text-gray-500">Population: {planet.properties.population}</p>
      </div>
    </div>
  );
};

export default React.memo(PlanetCardInfo);
