import { useContext } from 'react';
import { MapContext } from '../context';

export const useMap = () => useContext(MapContext);
