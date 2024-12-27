import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import FullPageLoader from './skeletons/FullPageLoader.jsx';

const PublicRoute = () => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <FullPageLoader />;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
