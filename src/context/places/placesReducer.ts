import { Feature } from '../../interfaces/PlacesResponce.interface';
import { PlacesState } from './PlacesProvider';

type PlacesAction =
  | { type: 'SET_USER_LOCATION'; payload: [number, number] }
  | { type: 'SET_PLACES'; payload: Feature[] }
  | { type: 'SET_LOADING_PLACES' };

export const placesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case 'SET_LOADING_PLACES':
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    case 'SET_PLACES':
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };
    default:
      return state;
  }
};
