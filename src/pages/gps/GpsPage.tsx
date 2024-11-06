import { Map } from 'mapbox-gl';
import { useLayoutEffect, useRef } from 'react';
import './gps.scss';

export const GpsPage = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useLayoutEffect(() => {
    if (mapRef.current || !mapDiv.current) return;

    mapRef.current = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
  }, []);

  
  return (
    <div className="gps">
      <div className="gps__container">
        <div ref={mapDiv} className="map"></div>
        <input type='text' className='gps__input gps__input--origin'/>
        <input type='text' className='gps__input gps__input--destination'/>
        <button type='submit' className='gps__submit'>Start</button>
      </div>
    </div>
  );
};
