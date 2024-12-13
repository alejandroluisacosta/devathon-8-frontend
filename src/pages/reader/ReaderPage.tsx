import { useSearchParams } from 'react-router-dom';
import { InputSearchBar, LettersSkeleton, Pagination } from '../../components';
import { ReaderTable } from '../../components/reader/reader-table/ReaderTable';
import { useDeounce, useLettersFetch } from '../../hook';
import './readerPage.scss';

import React, { useState } from 'react';
import { FilterLetters } from '../../components/reader/FilterLetters/FilterLetters';

export const ReaderPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounceRef } = useDeounce();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const status = searchParams.get('status') || '';

  const { loading, letters, error, lastPage } = useLettersFetch(
    page.toString(),
    searchParams.get('search') || '',
    status,
  );

  const handleSearchSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchInput(newSearchTerm);
    const params: { [key: string]: string } = { search: newSearchTerm };
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (page) params.page = page.toString();
      if (status) params.status = status;
      setSearchParams(params);
    }, 500);
  };

  const handleFilterLetters = (newStatus: string) => {
    const params: { [key: string]: string } = { status: newStatus };

    if (search) params.search = search;
    if (page) params.page = page.toString();
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params: { [key: string]: string } = { page: newPage.toString() };
    setSearchParams(params);
  };

  return (
    <section className="reader">
      <div className="reader__content">
        <div className="reader__top-section">
          <InputSearchBar
            label="Search reader"
            id="search-reader"
            placeholder="Search a reader by name..."
            name="search-reader"
            value={searchInput}
            onChange={handleSearchSubmit}
          />
          <FilterLetters status={status} onClick={handleFilterLetters} />
        </div>
        {loading ? <LettersSkeleton rows={20} /> : <ReaderTable initalLetters={letters} />}
        <Pagination page={page} lastPage={lastPage} setPage={handlePageChange} />
      </div>
    </section>
  );
};
