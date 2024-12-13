import { useState } from 'react';
import './filterLetters.scss';

type Props = {
  status: string;
  onClick: (status: string) => void;
};

export const FilterLetters = ({ onClick, status }: Props) => {
  const [filteActive, setFilterActive] = useState('-active');
  const onClickActiveFilter = (status: string) => {
    setFilterActive(`${status}-active`);
    onClick(status);
  };
  return (
    <div className="reader__filter">
      <button
        className={`reader__filter__button ${filteActive === '-active' && 'filter-active'}`}
        onClick={() => onClickActiveFilter('')}
      >
        All
      </button>
      <button
        className={`reader__filter__button ${filteActive === 'read-active' && 'filter-active'}`}
        onClick={() => onClickActiveFilter('read')}
      >
        Read
      </button>
      <button
        className={`reader__filter__button ${filteActive === 'unread-active' && 'filter-active'}`}
        onClick={() => onClickActiveFilter('unread')}
      >
        Unread
      </button>
    </div>
  );
};
