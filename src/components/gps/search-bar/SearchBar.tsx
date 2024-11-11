import { useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { usePlaces } from '../../../hook/usePlaces';
import { SearchResults } from '../search-results/SearchResults';
import './searchBar.scss';

export const SearchBar = () => {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const { searchPalcesByTerm } = usePlaces();

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPalcesByTerm(e.target.value);
    }, 500);
  };

  return (
    <div className="search">
      <label htmlFor="search-input" className="search__label">
        Search
      </label>
      <input
        type="search"
        id="search-input"
        className="search__input"
        placeholder="Search address..."
        aria-label="Search"
        onChange={onQueryChange}
      />

      <IoSearch className="search__icon" />

      <SearchResults />
    </div>
  );
};
