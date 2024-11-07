import { Map } from 'mapbox-gl';
import { useLayoutEffect, useRef } from 'react';
import './gps.scss';
import { API_KEY } from '../../main';
import { addRouteToMap } from '../../utils/mapUtils';

// Fake session token for map recommendations
const SESSION_TOKEN = '123e4567-e89b-12d3-a456-426614174000';

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

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { origin, destination } = event.target as typeof event.target & {
      origin: { value: string };
      destination: { value: string };
    }
    try {

        // Request origin coordinates
        const originResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${origin.value}.json?access_token=${API_KEY}`);
        const originData = await originResponse.json();
        const originCoordinates = originData.features[0].center;
    
        // Request destination coordinates
        const destinationResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destination.value}.json?access_token=${API_KEY}`);
        const destinationData = await destinationResponse.json();
        const destinationCoordinates = destinationData.features[0].center;
    
        // Center map on new origin
        if (mapRef.current && originCoordinates) {
          mapRef.current.setCenter([originCoordinates[0], originCoordinates[1]]);
        }
    
        // Fetch route
        const routeResponse = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates[0]},${originCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${API_KEY}`); 
        const routeData = await routeResponse.json();
        const routeJson = routeData.routes[0].geometry;
        addRouteToMap(mapRef, routeJson);

    } catch (error) {
      console.log('Error fetching the data:', error);
    }
  };

  let timeoutId: NodeJS.Timeout;

  const handleAddressSuggestions = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const userInput = target.value;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(async() => {
      if (userInput) {
        const suggestionsResults = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${userInput}&access_token=${API_KEY}&session_token=${SESSION_TOKEN}&proximity=-3.7038,40.4168`);
        const suggestionsData = await suggestionsResults.json();
        const suggestionsArray = suggestionsData.suggestions;
        console.log(suggestionsArray);
      }
    }, 1000)
  };
  
  return (
    <div className="gps">
      <div className="gps__container">
        <div ref={mapDiv} className="map"></div>
        <form className='gps__search-container' onSubmit={handleSubmit}>
          <input type='text' name="origin" className='gps__input gps__input--origin' onChange={handleAddressSuggestions} autoComplete='off'/>
          <input type='text' name="destination" className='gps__input gps__input--destination' onChange={handleAddressSuggestions} autoComplete='off'/>
          <button type='submit' className='gps__submit'>Start</button>
        </form>
      </div>
    </div>
  );
};
