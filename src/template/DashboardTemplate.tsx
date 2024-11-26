import { Outlet } from 'react-router-dom';
import { SideBar } from '../components';
import './dasboardTemplate.scss';

export const DashboardTemplate = () => {
  return (
    <div className="dashboard">
      <SideBar />

      <div className="dashboard__content section">
        <Outlet />
      </div>
    </div>
  );
};
