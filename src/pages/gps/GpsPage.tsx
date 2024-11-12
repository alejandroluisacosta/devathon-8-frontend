import { MapPreview, SearchBar } from '../../components';
import './gps.scss';

export const GpsPage = () => {
  return (
    <div className="gps">
      <h1 className='gps__title'>Christmas Map</h1>
      <SearchBar />
      <div className="gps__container">
        <MapPreview />
      </div>
    </div>
  );
};
