import { useLayoutEffect, useState } from 'react';
import './History.scss';
import SearchSave from '../search-save/SearchSave';
import { IntSearch } from '../../interfaces/history.interface';


const History = () => {
  const [searchHistory, setSearchHistory] = useState<IntSearch[] | null>(null);

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
        setSearchHistory(data);
      })
      .catch((err) => {
        console.error('Error to obtain data', err);
      });
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
