import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import FullPageLoader from './skeletons/FullPageLoader.jsx';

const PublicRoute = () => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <FullPageLoader />;
  }

  const intendedRoute = localStorage.getItem('intendedRoute') || '/';
  console.log(`PublicRoute navigating to: ${intendedRoute}`);

  if (user) {
    localStorage.removeItem('intendedRoute');
    return <Navigate to={intendedRoute} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
