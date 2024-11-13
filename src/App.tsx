import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryProvider, MapProvider, PlacesProvider } from './context';
import { CaloriesPage, ChillPage, ElvesPage, GpsPage, GradesPage, ReaderPage, ReindeersPage } from './pages';
import { DashboardTemplate } from './template/DashboardTemplate';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardTemplate />}>
        <Route
          index
          element={
            <PlacesProvider>
              <MapProvider>
                <HistoryProvider>
                  <GpsPage />
                </HistoryProvider>
              </MapProvider>
            </PlacesProvider>
          }
        />
        <Route path="reindeers" element={<ReindeersPage />} />
        <Route path="grades" element={<GradesPage />} />
        <Route path="calories" element={<CaloriesPage />} />
        <Route path="elves" element={<ElvesPage />} />
        <Route path="reader" element={<ReaderPage />} />
        <Route path="chill" element={<ChillPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
