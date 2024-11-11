import { useContext } from 'react';
import { PlacesContext } from '../context';

export const usePlaces = () => useContext(PlacesContext);
