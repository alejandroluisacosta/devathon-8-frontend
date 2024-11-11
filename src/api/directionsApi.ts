import { DirectionsResponse } from '../interfaces/directions.interface';

const API_KEY = import.meta.env.VITE_MAP_BOX_TOKEN;

export const directionsApi = async (start: string, end: string): Promise<DirectionsResponse | null> => {
  const baseUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  const params = new URLSearchParams({
    alternatives: 'false',
    geometries: 'geojson',
    overview: 'simplified',
    steps: 'false',
    notifications: 'none',
    access_token: API_KEY,
  });

  try {
    const response = await fetch(`${baseUrl}/${start};${end}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return null;
  }
};
