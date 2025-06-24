// import React, { useState, useEffect } from 'react';
// import { useAppSelector } from '../store/hooks';
// import { fetchPlanetById } from '../features/planets/planetAPI';
// import type { PLANET, PLANET_EXTRA_DATA } from '../types';
// import { PLANETS } from '../constants/planet.constant';

// type PlanetInfoProps = { planetUrl: string };

// const PlanetInfo: React.FC<PlanetInfoProps> = ({ planetUrl }) => {
//   const planetId: string | undefined = planetUrl?.split('/').pop();
//   const planetCache: Record<string, PLANET> = useAppSelector((state) => state.cache.planetsById);
//   const [planetError, setPlanetError] = useState<string | null>(null);
//   const planet: PLANET = planetCache[planetId ?? ''];

//   // Fetch logic
//   useEffect(() => {
//     fetchPlanetById(planetId ?? '').catch((e) => {
//       setPlanetError(`Planet fetch failed for ${planetId}: ${e}`);
//       console.warn(`Planet fetch failed for ${planetId}`, e);
//     });
//   }, [planetId]);

//   const renderPlanet = () => {
//     const planetName = planet.properties.name;
//     type PlanetKey = keyof typeof PLANETS;
//     const key = planetName.split(' ').join('_').toLocaleUpperCase() as PlanetKey;
//     const planetData: PLANET_EXTRA_DATA | undefined = PLANETS[key];
//     let red = 0;
//     let green = 0;
//     let blue = 0;
//     let planetImage = '';
//     if (planetData !== undefined) {
//       red = planetData!.COLOR.RED;
//       green = planetData!.COLOR.GREEN;
//       blue = planetData!.COLOR.BLUE;
//       planetImage = planetData!.IMAGE;
//     }
//     return (
//       <div id={planetId} data-testid="planet-card" className="planet-card">
//         {/* planet image */}
//         {planetImage ? (
//           <img
//             src={planetImage}
//             alt={`${planet.properties.name} Planet`}
//             className="planet-image"
//           />
//         ) : null}

//         {/* planet info card */}
//         <div
//           className={`planet-info-card capitalize ${planet.properties.name.toLocaleLowerCase() === 'unknown' ? 'flex items-center justify-center' : ''}`}
//           style={{
//             backgroundImage: `radial-gradient(circle at left center, rgba(${red}, ${green}, ${blue}, 1) 10%, rgba(${red}, ${green}, ${blue}, 0.6) 15%, rgba(0, 0, 0, 0) 60%)`,
//           }}
//         >
//           <h3 className="text-2xl mt-2">{planet.properties.name}</h3>
//           {planet.properties.name.toLocaleLowerCase() !== 'unknown' && (
//             <div className="planet-details mt-8 ml-[90px] pr-4">
//               {(
//                 ['climate', 'population', 'terrain', 'rotation_period', 'orbital_period'] as const
//               ).map((key) => (
//                 <div className="flex" key={key}>
//                   <span className="font-medium text-left w-[130px] capitalize">
//                     {key.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}:
//                   </span>
//                   <span className="font-light text-gray-500 capitalize">
//                     {planet.properties[key].split(',').length > 1
//                       ? `${planet.properties[key].split(',')[0]} ...`
//                       : planet.properties[key]}{' '}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       {planet ? (
//         renderPlanet()
//       ) : planetError ? (
//         'Unknown'
//       ) : (
//         <span className="text-gray-400 italic">Loading planet...</span>
//       )}
//     </>
//   );
// };

// export default React.memo(PlanetInfo);

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
