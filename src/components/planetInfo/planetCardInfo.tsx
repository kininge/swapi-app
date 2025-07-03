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
        className="h-[250px] w-full bg-theme-secondary animate-pulse rounded-lg shadow"
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
  const red = planetData?.COLOR.RED ?? 0;
  const green = planetData?.COLOR.GREEN ?? 0;
  const blue = planetData?.COLOR.BLUE ?? 0;

  const backgroundStyle = {
    backgroundImage: `radial-gradient(
      circle at 50% 120%,
      rgba(${red}, ${green}, ${blue}, 1) 20%,
      rgba(${red}, ${green}, ${blue}, 0.6) 20%,
      rgba(0, 0, 0, 0) 60%
    )`,
  };

  return planetName.toLowerCase() === 'unknown' ? (
    <div className="h-[250px] w-full flex items-center justify-center"></div>
  ) : (
    <div
      data-testid="planet-info"
      className="h-[250px]  w-full relative rounded-lg overflow-hidden shadow bg-theme-secondary"
      style={red === 0 && green === 0 && blue === 0 ? {} : backgroundStyle}
    >
      {planetData?.IMAGE && (
        <img
          src={planetData.IMAGE}
          data-testid="planet-image"
          alt={`${planetName} planet`}
          className="absolute z-40 bottom-[-250px]  sm:bottom-[-100px] md:bottom-[-250px] lg:bottom-[-250px] left-1/2 -translate-x-1/2 w-full opacity-80 object-contain"
        />
      )}
      <div className="relative p-4">
        <h3 data-testid="planet-name" className="text-lg text-white font-semibold ">
          {planetName}
        </h3>
        <p data-testid="planet-climate" className="text-sm  text-white">
          Climate: {planet.properties.climate}
        </p>
        <p data-testid="planet-population" className="text-sm  text-white">
          Population: {planet.properties.population}
        </p>
      </div>
    </div>
  );
};

export default React.memo(PlanetCardInfo);
