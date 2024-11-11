import { MapPreview, SearchBar } from '../../components';
import History from '../../components/history/History';
import './gps.scss';

export const GpsPage = () => {
  return (
    <div className="gps">
      <SearchBar />
      <div className="gps__container">
        <MapPreview />
      </div>
      <History />
    </div>
  );
};
