import { MapPreview, SearchBar } from '../../components';
import History from '../../components/history/History';
import './gps.scss';

export const GpsPage = () => {
  return (
    <div className="gps">
      <h1 className='gps__title'>Christmas Map</h1>
      <p className='gps__subtitle'>'Cause getting lost on Christmas Eve wouldn't make Santa happy!</p>
      <SearchBar />
      <div className="gps__container">
        <MapPreview />
      </div>
      <History />
    </div>
  );
};
