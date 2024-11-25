import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';

import './pagination.scss';
type Props = {
  page: number;
  lastPage: number;
  setPage: (page: number) => void;
};

export const Pagination = ({ page, lastPage, setPage }: Props) => {
  const navigate = useNavigate();

  const isInFirstPage = page === 1 && 'disabled';
  const isInLastPage = page === lastPage && 'disabled';
  return (
    <div className="pagination">
      <button
        className={`pagination__prev ${isInFirstPage}`}
        onClick={() => {
          setPage(page - 1);
          navigate(`?page=${page - 1}`);
        }}

        aria-label="button previus page "
      >
        <IoChevronBackOutline />
      </button>
      {page}/{lastPage}
      <button
        className={`pagination__next ${isInLastPage}`}
        onClick={() => {
          setPage(page + 1);
          navigate(`?page=${page + 1}`);
        }}

        aria-label="button next page "
      >
        <IoChevronForwardOutline />
      </button>
    </div>
  );
};
