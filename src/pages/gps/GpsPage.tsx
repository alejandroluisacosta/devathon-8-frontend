import { MapPreview, SearchBar } from '../../components';
import History from '../../components/history/History';
import './gps.scss';

export const GpsPage = () => {
  return (
    <div className="gps">
      <header className="gps__header">
        <h1 className="gps__title">Christmas Map</h1>
      </header>
      <div className="gps__container">
        <SearchBar />
        <MapPreview />
      </div>
      <History />
    </div>
  );
};
