import { LngLatBounds, Map, Marker } from 'mapbox-gl';
import { useReducer } from 'react';
import { directionsApi } from '../../api';
import { addRouteToMap, grinchMarker } from '../../utils';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
type Props = {
  children: React.ReactNode;
};
export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = (map: Map) => {
    new Marker({
      element: grinchMarker(),
    })
      .setLngLat(map.getCenter())
      .addTo(map);

    dispatch({ type: 'SET_MAP', payload: map });
  };
  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const resp = await directionsApi(start.join(','), end.join(','));

    if (!resp) return;
    const { geometry } = resp.routes[0];
    const { coordinates: coords } = geometry;

    const { coordinates } = geometry;

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    addRouteToMap(state.map!, coordinates);
  };
  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>{children}</MapContext.Provider>
  );
};
