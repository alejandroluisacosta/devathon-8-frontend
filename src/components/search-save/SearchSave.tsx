import { IoHome, IoLocation } from 'react-icons/io5';
import { IntSearch } from '../../interfaces/history.interface';
import './SearchSave.scss';

interface SearchProps {
  search: IntSearch;
  handleClick: (place: IntSearch) => void;
}

const SearchSave = ({ search, handleClick }: SearchProps) => {
  const { attributes } = search;

  const { place, city, country } = attributes;

  return (
    <div className="save" onClick={() => handleClick(search)}>
      <h3 className="save__title">
        <IoLocation size={22} className="save__icon" /> {city} - {country}
      </h3>
      <hr className="save__divider" />
      <p className="save__direction">
        <IoHome size={22} className="save__icon" />
        {place}
      </p>
    </div>
  );
};

export default SearchSave;
