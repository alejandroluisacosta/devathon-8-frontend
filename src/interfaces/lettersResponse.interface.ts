export interface LettersResponse {
  data: LetterR[];
  links: Links;
  meta: Meta;
}

export interface LetterR {
  type: Type;
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  sender: string;
  subject: string;
  content: string;
  read: boolean;
  image: string;
  created_at: Date;
}

export enum Type {
  Letters = 'letters',
}

export interface Links {
  self: string;
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface Meta {
  key: string;
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
