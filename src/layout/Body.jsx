import { Navigate, Route, Routes } from 'react-router-dom';
import TagConfigurationPage from '../pages/TagConfigurationPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import UserProfile from '../components/user/UserProfile.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import HDPage from '../pages/HDPage.jsx';
import useAuthStore from '../store/useAuthStore.js';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import PublicRoute from '../components/PublicRoute.jsx';
import AlertDetailsPage from '../pages/AlertDetailsPage.jsx';

export default function Body() {
  const { user } = useAuthStore();
  return (
    <div className=" bg-gray-100">
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/tag-configuration" element={<TagConfigurationPage />} />
          <Route path="/hd" element={<HDPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/alerts/:line/:severity/:value/:duration" element={<AlertDetailsPage />} />
        </Route>
      </Routes>
    </div>
  );
}
