export interface IntAttributtes {
  place: string;
  city: string;
  country: string;
  coordinates: [number, number];
}

export interface IntSearch {
  type: string;
  id: number;
  attributes: IntAttributtes;
}

export interface HistorySaveResponse {
  message: string;
  address: {
    place: string;
    city: string;
    country: string;
    longitude: number;
    latitude: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
}
