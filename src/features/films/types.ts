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
