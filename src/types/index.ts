export interface LIST_RESPONSE<T> {
  message: string;
  total_records?: number;
  total_pages?: number;
  previous?: string | null;
  next?: string | null;
  results?: T[];
  result?: T[];
  apiVersion: string;
  timestamp: string;
  support?: object;
  social?: object;
}

export interface DETAIL_RESPONSE<T> {
  message: string;
  result: T;
  apiVersion: string;
  timestamp: string;
  support?: object;
  social?: object;
}

export interface CHARACTER {
  uid: string;
  description: string;
  properties: {
    name: string;
    gender: string;
    hair_color: string;
    eye_color: string;
    skin_color: string;
    height: string;
    mass: string;
    birth_year: string;
    homeworld: string; // URL to planet
    created: string;
    edited: string;
    url: string;
  };
}

export interface CHARACTER_SLICE_STATE {
  list: CHARACTER[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number | null;
  totalRecords: number | null;
  next: string | null;
}

export interface SEARCH_SLICE_STATE {
  list: CHARACTER[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface FILM {
  uid: string;
  description: string;
  properties: {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    created: string;
    edited: string;
    url: string;
    characters: string[]; // character URLs
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
  };
}

export interface STARSHIP {
  uid: string;
  description: string;
  properties: {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    created: string;
    edited: string;
    url: string;
    pilots: string[];
    films: string[];
  };
}

export interface PLANET {
  uid: string;
  description: string;
  properties: {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    created: string;
    edited: string;
    url: string;
  };
}
