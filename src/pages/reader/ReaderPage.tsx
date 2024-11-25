import { useState } from 'react';
import { LettersSkeleton, Pagination } from '../../components';
import { ReaderTable } from '../../components/reader/reader-table/ReaderTable';
import { useLettersFetch } from '../../hook';
import './readerPage.scss';

export const ReaderPage = () => {
  const [page, setPage] = useState(1);
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
