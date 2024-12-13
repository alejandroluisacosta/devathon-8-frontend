import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { LettersSkeleton, Pagination } from '../../components';
import { ReaderTable } from '../../components/reader/reader-table/ReaderTable';
import { useLettersFetch } from '../../hook';
import { parseQuery } from '../../utils';
import './readerPage.scss';
import { SearchBar } from '../../components/reader/SearchBar/SearchBar';

import { FilterLetters } from '../../components/reader/FilterLetters/FilterLetters';

export const ReaderPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const status = searchParams.get('status') || '';

  const { loading, letters, error, lastPage } = useLettersFetch(page.toString(), search, status);

  const handleSearchSubmit = (newQuery: string) => {
    setSearchParams({ search: newQuery, page: page, status: status });
  };

  const handleFilterLetters = (newStatus: string) => {
    setSearchParams({ search: search, page: page, status: newStatus });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ search: search, page: newPage, status: status });
  };

  return (
    <section className="reader">
      <div className="reader__content">
        <div className="reader__top-section">
          <SearchBar onSubmit={handleSearchSubmit} />
          <FilterLetters onClick={handleFilterLetters} />
        </div>
        {loading ? (
          <LettersSkeleton rows={20} />
        ) : (
          <>
            <ReaderTable initalLetters={letters} />

            <Pagination page={page} lastPage={lastPage} setPage={handlePageChange} />
          </>
        )}
      </div>
    </section>
  );
};
