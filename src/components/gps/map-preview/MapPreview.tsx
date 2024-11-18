import { Map } from 'mapbox-gl';
import { useLayoutEffect, useRef } from 'react';
import { useMap } from '../../../hook/useMap';
import { usePlaces } from '../../../hook/usePlaces';
import { MapSkeleton } from '../../ui/map-skeleton/MapSkeleton';
import './MapPreview.scss'

export const MapPreview = () => {
  const { isLoading, userLocation } = usePlaces();
  const { setMap } = useMap();

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isLoading) return;

    const map = new Map({
      container: mapDiv.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: userLocation,
      zoom: 12,
    });
    setMap(map);
  }, [isLoading, userLocation]);

  if (isLoading) return <MapSkeleton />;

  return <div ref={mapDiv} className="map"></div>;
};
