import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LettersSkeleton, Pagination } from '../../components';
import { ReaderTable } from '../../components/reader/reader-table/ReaderTable';
import { useLettersFetch } from '../../hook';
import { parseQuery } from '../../utils';
import './readerPage.scss';

export const ReaderPage = () => {
  const location = useLocation();
  const parsed = parseQuery(location.search);
  const [page, setPage] = useState(+parsed.page || 1);

  const { loading, letters, error, lastPage } = useLettersFetch(page.toString());

  return (
    <section className="reader">
      <div className="reader__content">
        {loading ? (
          <LettersSkeleton rows={20} />
        ) : (
          <>
            <ReaderTable initalLetters={letters} />

            <Pagination page={page} lastPage={lastPage} setPage={setPage} />
          </>
        )}
      </div>
    </section>
  );
};
