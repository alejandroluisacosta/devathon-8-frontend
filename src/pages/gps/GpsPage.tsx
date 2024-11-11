import { MapPreview, SearchBar } from '../../components';
import './gps.scss';

export const GpsPage = () => {
  return (
    <div className="gps">
      <SearchBar />
      <div className="gps__container">
        <MapPreview />
      </div>
    </div>
  );
};
