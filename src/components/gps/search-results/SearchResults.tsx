import { Marker } from 'mapbox-gl';
import { useState } from 'react';
import { useMap, usePlaces } from '../../../hook';
import { useHistory } from '../../../hook/useHistory';
import { IntSearch } from '../../../interfaces/history.interface';
import { Feature } from '../../../interfaces/PlacesResponce.interface';
import { SearchResultsSkeleton } from '../../ui/search-results-skleton/SearchResultsSkeleton';
import './searchResults.scss';
export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = usePlaces();
  const { map, getRouteBetweenPoints } = useMap();
  const { updateHistory } = useHistory();
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);
  const [activeId, setActiveId] = useState<string>('');

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.geometry.coordinates;
    setActiveId(place.id);

    //remove last places clicked
    if (activeMarker) activeMarker.remove();
    const marker = new Marker().setLngLat([lng, lat]).addTo(map!);
    setActiveMarker(marker);

    map?.flyTo({
      center: [lng, lat],
      zoom: 14,
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.geometry.coordinates;
    getRouteBetweenPoints(userLocation, [lng, lat]);

    //Save the place in the history
    const historyToSave: IntSearch = {
      type: 'addresses',
      id: parseInt(place.id),
      attributes: {
        place: place.properties.name_preferred,
        city: place.properties.full_address,
        country: place.properties.context.country.name,
        coordinates: [lng, lat],
      },
    };
    updateHistory(historyToSave);
  };

  if (!places.length) return <></>;

  return (
    <div className="search-results">
      {isLoadingPlaces && <SearchResultsSkeleton />}

      {!isLoadingPlaces && (
        <ul className="search-results__list">
          {places.map((place) => (
            <li
              key={place.id}
              className={`search-results__li ${activeId === place.id && 'search-results__li--active'}`}
              onClick={() => onPlaceClick(place)}
            >
              <h2 className="search-results__title">{place.properties.full_address}</h2>

              <button className="search-results__button" onClick={() => getRoute(place)}>
                Directions
              </button>
              <img src="images/bauble.png" className="search-results__bauble" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
