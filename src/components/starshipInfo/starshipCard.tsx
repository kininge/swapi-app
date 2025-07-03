import React from 'react';
import type { STARSHIP } from '../../types';
import { STARSHIPS } from '../../constants/starship.constant';

interface StarshipCardProps {
  starship: STARSHIP;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
  const { name, model, starship_class, manufacturer, hyperdrive_rating, max_atmosphering_speed } =
    starship.properties;
  const starshipImage: string | undefined = STARSHIPS[starship.uid];
  return (
    <div
      key={starship.uid}
      data-testid="starship"
      className="w-full max-w-3xl h-56 overflow-hidden relative flex items-center"
    >
      {/* Image Section */}
      {starshipImage && (
        <div className="absolute left-0 top-3/4 -translate-y-1/2 w-7/12 h-full flex items-center justify-center">
          <img
            src={starshipImage}
            alt={`${name} ship`}
            className="max-h-[80%] max-w-[80%] object-contain"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="bg-theme-secondary ml-auto flex flex-col justify-between px-3 py-4 w-4/5 h-full rounded-2xl text-white">
        <div className="w-full h-full">
          {/* Left: Title + Subtitle */}
          <div className="flex flex-col text-center justify-center pl-4 flex-1 mb-8">
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-sm text-gray-400 mt-1">{starship_class}</p>
          </div>

          {/* Right: Info List */}
          <ul className="text-sm text-gray-300 space-y-1 text-right pr-2">
            {[
              { value: manufacturer, suffix: '(OEM)' },
              { value: model },
              { value: hyperdrive_rating, suffix: 'hyperdrive' },
              { value: max_atmosphering_speed, suffix: 'ATM' },
            ]
              .filter(({ value }) => value && value !== 'unknown' && value !== 'n/a')
              .map(({ value, suffix }, idx) => (
                <li
                  key={idx}
                  className="text-white text-right max-w-full truncate"
                  title={`${value}${suffix ? ` ${suffix}` : ''}`}
                >
                  {value} {suffix && <span className="text-gray-400">{suffix}</span>}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StarshipCard);
