export interface ElvelsResponse {
  current_page: number;
  data: Elve[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Elve {
  id: number;
  name: string;
  image: string;
  email: string;
  age: number;
  address: string;
  height: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
