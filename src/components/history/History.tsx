import { useLayoutEffect, useState } from 'react';
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

const History = () => {
  const [searchHistory, setSearchHistory] = useState<IntSearch[] | null>(null);

  useLayoutEffect(() => {
    // Request for last five searches to backend
    const url = 'https://api.gps.lastsearches.example';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error to obtain data');
        return res.json();
      })
      .then((data: IntSearch[]) => {
        setSearchHistory(data);
      })
      .catch((err) => {
        console.error('Error to obtain data', err);
      });
  }, []);

  return (
    <article className="searches">
      <section className="searches__recent">
        <h2 className="searches__title">Most recent searches</h2>
        <div className="searches__container">
          {searchHistory ? (
            searchHistory.map((search) => <Search key={search.id} search={search} />)
          ) : (
            <p className="searches__advice">You don't have search history yet</p>
          )}
        </div>
      </section>
    </article>
  );
};

export default History;
