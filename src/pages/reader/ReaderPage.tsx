import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LettersSkeleton, Pagination } from '../../components';
import { ReaderTable } from '../../components/reader/reader-table/ReaderTable';
import { useLettersFetch } from '../../hook';
import { parseQuery } from '../../utils';
import './readerPage.scss';
import { SearchBar } from '../../components/reader/SearchBar/SearchBar';
import { FilterLetters } from '../../components/reader/FilterLetters/FilterLetters';

export const ReaderPage = () => {
  const location = useLocation();
  const parsed = parseQuery(location.search);
  const [page, setPage] = useState(+parsed.page || 1);
  const [query, setQuery] = useState('');

  
  const { loading, letters, error, lastPage } = useLettersFetch(page.toString(), query);
  
  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery.toLowerCase());
  };
  

  return (
    <section className="reader">
      <div className="reader__content">
        {loading ? (
          <LettersSkeleton rows={20} />
        ) : (
          <>
            <div className='reader__top-section'>
              <SearchBar onSubmit={handleSearchSubmit}/>
              <FilterLetters />
            </div>

            <ReaderTable initalLetters={letters} />

            <Pagination page={page} lastPage={lastPage} setPage={setPage} />
          </>
        )}
      </div>
    </section>
  );
};
