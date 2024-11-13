import { useLayoutEffect, useState } from 'react';
import './History.scss';
import SearchSave from '../search-save/SearchSave';
import { useHistory } from '../../hook/useHistory';
import { IntSearch } from '../../interfaces/history.interface';
import { useMap, usePlaces } from '../../hook';
import { Marker } from 'mapbox-gl';

const History = () => {
  const { history, setHistory } = useHistory();
  const { map, getRouteBetweenPoints } = useMap();
  const { userLocation } = usePlaces();
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);

  useLayoutEffect(() => {
    // Request for last five searches to backend
    const url = 'http://localhost:8000/api/v1/addresses/recent';
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error('Error to obtain data');
        return res.json();
      })
      .then(({ data }) => {
        setHistory(data);
      })
      .catch((err) => {
        console.error('Error to obtain data', err);
      });
  }, []);

  const handleClick = (place: IntSearch) => {
    const [lng, lat] = place.attributes.coordinates;

    console.log('New Search');

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
      <div className="history__container">
        {history ? (
          history.map((search) => <SearchSave key={search.id} search={search} handleClick={handleClick} />)
        ) : (
          <p className="history__advice">You don't have search history yet</p>
        )}
      </div>
    </article>
  );
};

export default History;
