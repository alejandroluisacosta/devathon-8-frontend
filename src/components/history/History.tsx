import { Marker } from 'mapbox-gl';
import { useState } from 'react';
import { useMap, usePlaces } from '../../hook';
import { useHistory } from '../../hook/useHistory';
import { IntSearch } from '../../interfaces/history.interface';
import SearchSave from '../search-save/SearchSave';
import './History.scss';
import { HistorySkeleton } from '../ui/history-skeleton/HistorySkeleton';

const History = () => {
  const { history, isLoading } = useHistory();
  const { map, getRouteBetweenPoints } = useMap();
  const { userLocation } = usePlaces();
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);

  const handleClick = (place: IntSearch) => {
    const [lng, lat] = place.attributes.coordinates;

    // remove last mark clicked
    if (activeMarker) activeMarker.remove();
    const marker = new Marker().setLngLat([lng, lat]).addTo(map!);
    setActiveMarker(marker);

    map?.flyTo({
      center: [lng, lat],
      zoom: 14,
    });

    if (!userLocation) return;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  return (
    <article className="history">
      <h2 className="history__title">Most recent searches</h2>
      {isLoading ? (
        <HistorySkeleton />
      ) : (
        <div className="history__container">
          {history.map((search) => (
            <SearchSave key={search.id} search={search} handleClick={handleClick} />
          ))}
        </div>
      )}
    </article>
  );
};

export default History;
