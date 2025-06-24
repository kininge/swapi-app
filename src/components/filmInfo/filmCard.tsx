// import React from 'react';
// import type { FILM } from '../../types';

// const FilmCard: React.FC<{ film: FILM }> = ({ film }) => {
//   return (
//     <div className="rounded-lg overflow-hidden bg-theme-surface shadow-md aspect-video border border-gray-700">
//       <div className="bg-gray-900 h-full flex items-center justify-center text-white p-4 text-center">
//         <div>
//           <p className="text-lg font-semibold">{film.properties.title}</p>
//           <p className="text-sm text-gray-400">{film.properties.release_date}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilmCard;

import React from 'react';
import type { FILM } from '../../types';
import { FILMS } from '../../constants/film.constant';

interface FilmCardProps {
  film: FILM;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const { title, director, release_date } = film.properties;
  const poster: string | undefined = FILMS[film.uid];

  return (
    <div className="aspect-[9/16] bg-theme-secondary rounded-lg shadow-md overflow-hidden flex flex-col">
      {poster && <img src={poster} alt={title + ' poster'} className="w-full h-48 object-fill" />}
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h4 className="text-md font-semibold text-white">{title}</h4>
          <p className="text-sm text-gray-400">{director}</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">{release_date}</p>
      </div>
    </div>
  );
};

export default FilmCard;
