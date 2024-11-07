import { Map } from 'mapbox-gl';

export const addRouteToMap = (mapRef: React.RefObject<Map>, routeGeoJson: any) => {
  if (!mapRef.current || !routeGeoJson) return;

  // Add the route data as a source
  mapRef.current.addSource('route', {
    type: 'geojson',
    data: routeGeoJson,
  });

  // Add the route as a line layer
  mapRef.current.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    paint: {
      'line-color': '#FF5733',
      'line-width': 6,
    },
  });
};
