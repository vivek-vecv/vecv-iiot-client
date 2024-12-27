import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './layout/Navbar.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Body from './layout/Body.jsx';
import Footer from './layout/Footer.jsx';
import { useEffect, useState } from 'react';
import { useTagStore } from './store/useTagStore.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './store/useAuthStore.js';
import FullPageLoader from './components/skeletons/FullPageLoader.jsx';

function App() {
  const { user, getLoggedInUser, isCheckingAuth } = useAuthStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { tags, getTags, isTagsLoading } = useTagStore();

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    getTags();
  }, [getTags]);

  if (isCheckingAuth && !user) {
    return <FullPageLoader />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Router>
        <Navbar toggleDrawer={toggleDrawer} />
        <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <Body />
        <Footer />
      </Router>
    </>
  );
}

export default App;
