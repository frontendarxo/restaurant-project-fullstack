import { Outlet, useNavigate } from 'react-router-dom';
import './style.css';

export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-layout">
      <div className="auth-layout-header">
        <button className="auth-layout-back" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>
      <Outlet />
    </div>
  );
};