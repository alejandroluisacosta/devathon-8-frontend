import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ElveFilters, ElveList, ElvesSkeleton, Pagination } from '../../components';
import { useDeounce, useElves } from '../../hook';
import { parseQuery } from '../../utils';
import './elvesPage.scss';

export const ElvesPage = () => {
  const location = useLocation();
  const parsed = parseQuery(location.search);
  const navigate = useNavigate();

  const { elves, lastPage, getElves, isLoading } = useElves();

  const [page, setPage] = useState(+parsed.page || 1);
  const [searchTerm, setSearchTerm] = useState<string>(parsed.search || '');
  const [order, setOrder] = useState<string>(
    parsed.order && parsed.direction ? `${parsed.order}-${parsed.direction}` : '',
  );
  const { debounceRef } = useDeounce();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearchTerm(newSearchTerm);
      const searchParam = newSearchTerm ? `&search=${newSearchTerm}` : '';
      navigate(`?page=${page}${searchParam}`);
    }, 300);
  };

  const onOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setOrder(selectedOrder);

    if (!selectedOrder) {
      navigate(`?page=${page}${searchTerm && `&search=${searchTerm}`}`);
      return;
    }
    const [orderKey, orderDirection] = e.target.value.split('-');
    navigate(
      `?page=${page}${searchTerm !== '' && `&search=${searchTerm}`}&order=${orderKey}&direction=${orderDirection}`,
    );
  };

  useEffect(() => {
    getElves(page, searchTerm, order);
  }, [page, searchTerm, order]);

  return (
    <section className="elves-page">
      <ElveFilters
        searchTerm={searchTerm}
        onOrderChange={onOrderChange}
        onSearchChange={onSearchChange}
        order={order}
      />
      <div className="elves-page__content">
        {isLoading ? <ElvesSkeleton /> : <ElveList elvesList={elves} />}

        {lastPage && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
      </div>
    </section>
  );
};
