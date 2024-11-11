import { Map, SourceSpecification } from 'mapbox-gl';

export const addRouteToMap = (map: Map, coords: number[][]) => {
  //Polyline
  const sourceData: SourceSpecification = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coords,
          },
        },
      ],
    },
  };
  //remove polyline if exists
  if (map.getLayer('RoutString')) {
    map.removeLayer('RoutString');
    map.removeSource('RoutString');
  }

  map.addSource('RoutString', sourceData);

  map.addLayer({
    id: 'RoutString',
    type: 'line',
    source: 'RoutString',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#ff2f00',
      'line-width': 3,
    },
  });
};
