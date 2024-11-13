import { IoHome, IoLocationOutline } from 'react-icons/io5';
import './SearchSave.scss';
import { IntSearch } from '../../interfaces/history.interface';

interface SearchProps {
  search: IntSearch;
  handleClick: (place: IntSearch) => void;
}

const SearchSave = ({search, handleClick}: SearchProps) => {
  const { attributes } = search;

  const { place, city, country } = attributes;

  return (
    <div className="save" onClick={() => handleClick(search)}>
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
