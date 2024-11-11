import { Map } from 'mapbox-gl';
import { useLayoutEffect, useRef, useState } from 'react';
import './History.scss';
import Search from '../search/Search';

export interface IntAttributtes {
  place: string;
  city: string;
  country: string;
  coordinates: [number, number];
}

export interface IntSearch {
  type: string;
  id: number;
  attributes: IntAttributtes;
}

// Start the map in the current location
let lng: number;
let lat: number;

interface IntGeoOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

const options: IntGeoOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos: GeolocationPosition): void {
  const { latitude, longitude } = pos.coords;

  lng = longitude;
  lat = latitude;
}

function error(err: GeolocationPositionError): void {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

const RegistrySearches = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [lastSearchesHistory, setLastSearchesHistory] = useState<IntSearch[] | null>(null);

  useLayoutEffect(() => {
    if (mapRef.current || !mapDiv.current) return;

    mapRef.current = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 9,
    });

    // Request for last five searches to backend
    const url = '/public/mockSearches.json';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error to obtain data');
        return res.json();
      })
      .then((data: IntSearch[]) => {
        setLastSearchesHistory(data);
      })
      .catch((err) => {
        console.error('Error to obtain data', err);
      });
  }, []);

  return (
    <article className="searches">
      <section ref={mapDiv} className="searches__map"></section>

      <section className="searches__recent">
        <h2 className="searches__title">Most recent searches</h2>
        <div className="searches__container">
          {lastSearchesHistory ? (
            lastSearchesHistory.map((search) => <Search key={search.id} search={search} />)
          ) : (
            <p className="searches__advice">You don't have search history yet</p>
          )}
        </div>
      </section>
    </article>
  );
};

export default RegistrySearches;
