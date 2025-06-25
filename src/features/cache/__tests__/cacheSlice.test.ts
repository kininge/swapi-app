import cacheReducer, {
  setFilms,
  setStarship,
  setPlanets,
  setCharacterToFilms,
  setCharacterToStarship,
} from '../cacheSlice';
import type { PLANET, FILM, STARSHIP } from '../../../types';

describe('cacheSlice', () => {
  const initialState = {
    filmsById: {},
    starshipById: {},
    planetsById: {},
    characterToFilms: {},
    characterToStarship: {},
  };

  // check film by id
  it('should handle setFilms', () => {
    const film: FILM = { uid: '1', description: '', properties: { title: 'A New Hope' } } as FILM;
    const nextState = cacheReducer(initialState, setFilms({ '1': film }));
    expect(nextState.filmsById).toEqual({ '1': film });
  });

  // check starship by id
  it('should handle setStarship', () => {
    const starship: STARSHIP = { uid: '10', properties: { name: 'X-Wing' } } as STARSHIP;
    const nextState = cacheReducer(initialState, setStarship({ '10': starship }));
    expect(nextState.starshipById).toEqual({ '10': starship });
  });

  // check planet by id
  it('should handle setPlanets (merge into state)', () => {
    const planet: PLANET = {
      uid: '5',
      properties: { name: 'Dagobah', climate: 'murky', population: '', terrain: '' },
      description: '',
    } as PLANET;

    const partialState = { ...initialState, planetsById: { '1': { uid: '1' } as PLANET } };
    const nextState = cacheReducer(partialState, setPlanets({ '5': planet }));

    expect(nextState.planetsById).toEqual({
      '1': { uid: '1' },
      '5': planet,
    });
  });

  // check film by character id
  it('should handle setCharacterToFilms', () => {
    const data = { '1': ['film1', 'film2'] };
    const nextState = cacheReducer(initialState, setCharacterToFilms(data));
    expect(nextState.characterToFilms).toEqual(data);
  });

  // check starship by character id
  it('should handle setCharacterToStarship', () => {
    const data = { '1': ['starship1'] };
    const nextState = cacheReducer(initialState, setCharacterToStarship(data));
    expect(nextState.characterToStarship).toEqual(data);
  });
});
