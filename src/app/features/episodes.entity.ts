export interface Episodes {
  info: Info;
  results?: (ResultsEntity)[] | null;
}
export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: null;
}
export interface ResultsEntity {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters?: (string)[] | null;
  url: string;
  created: string;
}
