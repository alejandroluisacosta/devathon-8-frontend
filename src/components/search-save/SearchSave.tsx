import { IoHome, IoLocationOutline } from 'react-icons/io5';
import './SearchSave.scss';
import { IntSearch } from '../history/History';

interface SearchProps {
  search: IntSearch;
}

const SearchSave = ({ search }: SearchProps) => {
  const { attributes } = search;

  const { place, city, country } = attributes;

  return (
    <div className="save">
      <h3 className="save__title">
        <IoLocationOutline /> {city} - {country}
      </h3>
      <hr className="save__divider" />
      <p className="save__direction">
        <IoHome />
        {place}
      </p>
    </div>
  );
};

export default SearchSave;
