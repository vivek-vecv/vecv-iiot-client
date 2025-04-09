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
import Dashboard from '../pages/Dashboard.jsx';
import MachinesListPage from '../pages/MachinesListPage.jsx';
import MachinePage from '../pages/MachinePage.jsx';
import BarChartComponent from '../pages/BarChartComponent.jsx';
import CBMDashboard from '../pages/CBMDashboard.jsx';

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
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" index element={<HomePage />} />
        <Route path="/tag-configuration" element={<TagConfigurationPage />} />
        <Route path="/hd" element={<HDPage />} />
        <Route path="/machine-shop-1" element={<MachinesListPage />} />
        <Route path="/machine-shop-1/:machine" element={<MachinePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cbmdashboard" element={<CBMDashboard />} />
        <Route path="/engine" element={<CBMDashboard />} />
        {/* <Route path="/dashboard" element={<BarChartComponent />} /> */}
        <Route path="/alerts/:line/:severity/:value/:duration" element={<AlertDetailsPage />} />
        {/* </Route> */}

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
