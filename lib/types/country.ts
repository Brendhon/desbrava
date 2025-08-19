export interface Country {
  continent: Continent;
  flag?: null | string;
  id: number;
  language: string[];
  region: string;
  country: string;
  currency_code: null | string;
  currency_name_pt: null | string;
  iso_country: string;
}

enum Continent {
  AméricaDoNorte = 'América do Norte',
  AméricaDoSul = 'América do Sul',
  Europa = 'Europa',
  Oceania = 'Oceania',
  Outro = 'Outro',
  Vários = 'Vários',
  África = 'África',
  Ásia = 'Ásia',
}
