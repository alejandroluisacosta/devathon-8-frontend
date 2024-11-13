import { IoHome, IoLocationOutline } from 'react-icons/io5';
import './Search.scss';
import { IntSearch } from '../history/History';

interface SearchProps {
  search: IntSearch;
}

const Search = ({ search }: SearchProps) => {
  const { attributes } = search;

  const { place, city, country } = attributes;

  return (
    <div className="search">
      <h3 className="search__title">
        <IoLocationOutline /> {city} - {country}
      </h3>
      <hr className="search__divider" />
      <p className="search__direction">
        <IoHome />
        {place}
      </p>
    </div>
  );
};

export default Search;
