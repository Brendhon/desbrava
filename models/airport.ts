export interface Airport {
  id: string;
  ident: string;
  type: 'airport';
  name: string;
  elevation_ft: string;
  continent: Continent;
  iso_country: string;
  iso_region: string;
  municipality: string;
  scheduled_service: "no" | "yes";
  gps_code: string;
  iata_code: string;
  local_code: string;
  home_link: string;
  wikipedia_link: string;
  keywords: string;
  size: "large" | "medium";
  latitude: number;
  longitude: number;
}

export enum Continent {
  AF = "AF",
  An = "AN",
  As = "AS",
  Eu = "EU",
  Na = "NA",
  Oc = "OC",
  Sa = "SA",
}

