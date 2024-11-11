import { PlacesResponse } from '../interfaces/PlacesResponce.interface';

const API_KEY = import.meta.env.VITE_MAP_BOX_TOKEN;

export const searchApi = async (query: string, proximity: string): Promise<PlacesResponse | null> => {
  const baseUrl = 'https://api.mapbox.com/search/geocode/v6/forward';

  const params = new URLSearchParams({
    limit: '5',
    language: 'es',
    access_token: API_KEY,
    q: query,
    proximity,
  });

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data: PlacesResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return null;
  }
};
