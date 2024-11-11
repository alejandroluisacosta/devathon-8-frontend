import {  useLayoutEffect, useState } from 'react';
import './History.scss';
import SearchSave from '../search-save/SearchSave';

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

const mockSearches: IntSearch[] = [
  {
    type: 'addresses',
    id: 1,
    attributes: {
      place: 'Direction',
      city: 'City',
      country: 'Country',
      coordinates: [0, 0],
    },
  },
  {
    type: 'addresses',
    id: 2,
    attributes: {
      place: 'Direction',
      city: 'City',
      country: 'Country',
      coordinates: [0, 0],
    },
  },
  {
    type: 'addresses',
    id: 3,
    attributes: {
      place: 'Direction',
      city: 'City',
      country: 'Country',
      coordinates: [0, 0],
    },
  },
  {
    type: 'addresses',
    id: 4,
    attributes: {
      place: 'Direction',
      city: 'City',
      country: 'Country',
      coordinates: [0, 0],
    },
  },
  {
    type: 'addresses',
    id: 5,
    attributes: {
      place: 'Direction',
      city: 'City',
      country: 'Country',
      coordinates: [0, 0],
    },
  },
];

const History = () => {
  const [searchHistory, setSearchHistory] = useState<IntSearch[] | null>(null);

  useLayoutEffect(() => {

    setSearchHistory(mockSearches)

    // Request for last five searches to backend
    // const url = 'https://api.gps.lastsearches.example';
    // fetch(url)
    //   .then((res) => {
    //     if (!res.ok) throw new Error('Error to obtain data');
    //     return res.json();
    //   })
    //   .then((data: IntSearch[]) => {
    //     setSearchHistory(data);
    //   })
    //   .catch((err) => {
    //     console.error('Error to obtain data', err);
    //   });
  }, []);

  return (
    <article className="history">
      <h2 className="history__title">Most recent searches</h2>
      <div className="history__container">
        {searchHistory ? (
          searchHistory.map((search) => <SearchSave key={search.id} search={search} />)
        ) : (
          <p className="history__advice">You don't have search history yet</p>
        )}
      </div>
    </article>
  );
};

export default History;
