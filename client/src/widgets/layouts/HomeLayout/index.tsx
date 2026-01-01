import { Outlet } from 'react-router-dom';
import { Navbar } from '../../navbar';
import './style.css';

export const HomeLayout = () => {
  return (
    <div className="home-layout">
      <Navbar />
      <div className="home-layout-content">
        <Outlet />
      </div>
    </div>
  );
};