import { useEffect, useReducer } from 'react';
import { searchApi } from '../../api';
import { Feature } from '../../interfaces/PlacesResponce.interface';
import { getUserLocation } from '../../utils';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';

type Props = {
  children: React.ReactNode;
};

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
      .then((lngLat) => dispatch({ type: 'SET_USER_LOCATION', payload: lngLat }))
      .catch((err) => dispatch({ type: 'SET_USER_LOCATION', payload: err }));
  }, []);

  const searchPalcesByTerm = async (term: string) => {
    if (term.length === 0) {
      dispatch({ type: 'SET_PLACES', payload: [] });
    }
    if (!state.userLocation) throw new Error('User location not found');

    dispatch({ type: 'SET_LOADING_PLACES' });

    const resp = await searchApi(term, state.userLocation.join(','));
    if (!resp) return dispatch({ type: 'SET_PLACES', payload: [] });

    dispatch({ type: 'SET_PLACES', payload: resp.features });
  };
  return <PlacesContext.Provider value={{ ...state, searchPalcesByTerm }}>{children}</PlacesContext.Provider>;
};
