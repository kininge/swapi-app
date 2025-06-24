import React from 'react';
import type { PLANET, PLANET_EXTRA_DATA } from '../../types';
import { PLANETS } from '../../constants/planet.constant';

type PLANET_DETAIL_INFO_PROP = {
  planet?: PLANET;
  loading?: boolean;
  error?: boolean;
};

const PlanetDetailInfo: React.FC<PLANET_DETAIL_INFO_PROP> = ({ planet, loading, error }) => {
  if (loading) {
    return <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl shadow" />;
  }

  if (error || !planet) {
    return (
      <div className="h-[300px] w-full bg-red-100 text-red-600 flex items-center justify-center rounded-xl shadow">
        Planet info unavailable
      </div>
    );
  }

  const planetName = planet.properties.name;
  const key = planetName.split(' ').join('_').toUpperCase() as keyof typeof PLANETS;
  const planetData: PLANET_EXTRA_DATA | undefined = PLANETS[key];

  const red = planetData?.COLOR.RED ?? 0;
  const green = planetData?.COLOR.GREEN ?? 0;
  const blue = planetData?.COLOR.BLUE ?? 0;

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at left center, rgba(${red}, ${green}, ${blue}, 1) 10%, rgba(${red}, ${green}, ${blue}, 0.6) 15%, rgba(0, 0, 0, 0) 60%)`,
  };

  return (
    <div
      className="planet-info-card p-4 rounded-xl shadow relative overflow-hidden"
      style={gradientStyle}
    >
      {planetData?.IMAGE && (
        <img
          src={planetData.IMAGE}
          alt={planetName}
          className="absolute top-0 left-0 h-full w-auto object-contain opacity-20"
        />
      )}
      <div className="relative z-10 ml-[90px]">
        <h3 className="text-2xl font-bold mb-4">{planetName}</h3>
        {(['climate', 'population', 'terrain', 'rotation_period', 'orbital_period'] as const).map(
          (key) => (
            <div className="flex mb-1" key={key}>
              <span className="font-medium w-36 capitalize">
                {key.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}:
              </span>
              <span className="text-gray-600 capitalize">{planet.properties[key]}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default React.memo(PlanetDetailInfo);
