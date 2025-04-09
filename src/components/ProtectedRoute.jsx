import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import FullPageLoader from './skeletons/FullPageLoader.jsx';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!user) {
      const currentPath = window.location.pathname;
      // Ensure only protected routes are stored
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.setItem('intendedRoute', currentPath);
        console.log(`Intended route set in localStorage: ${currentPath}`);
      }
    }
  }, [user]);

  if (isCheckingAuth) {
    return <FullPageLoader />; // Show loader while verifying auth
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render the child routes
};

export default ProtectedRoute;
