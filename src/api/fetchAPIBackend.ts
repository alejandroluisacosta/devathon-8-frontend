import { HistorySaveResponse } from '../interfaces/history.interface';

export interface HistoryToSave {
  place: string;
  city: string;
  country: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}

export const fetchAPIBackend = async (history: HistoryToSave): Promise<HistorySaveResponse> => {
  console.log({ history });
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
      },
      body: JSON.stringify(history),
    };
    const response = await fetch(`${baseUrl}/addresses`, options);

    if (!response.ok) {
      throw new Error('Error fetching data from the API');
    }
    const data = (await response.json()) as HistorySaveResponse;
    return data;
  } catch (error) {
    //TODO: Handle error in a custom error handler
    if (error instanceof Error) {
      throw new Error('Error fetching data from the API ' + error.message);
    } else {
      throw new Error('Error fetching data from the API');
    }
  }
};
