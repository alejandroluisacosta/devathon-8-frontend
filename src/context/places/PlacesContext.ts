import { createContext } from 'react';
import { Feature } from '../../interfaces/PlacesResponce.interface';

interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  searchPalcesByTerm: (term: string) => Promise<void>;
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
