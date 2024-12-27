import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import FullPageLoader from './skeletons/FullPageLoader.jsx';

const ProtectedRoute = () => {
  const { user, isCheckingAuth, setRedirectPath } = useAuthStore();

  if (isCheckingAuth) {
    return <FullPageLoader />;
  }

  if (!user) {
    setRedirectPath(window.location.pathname + window.location.search + window.location.hash);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
