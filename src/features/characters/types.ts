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
