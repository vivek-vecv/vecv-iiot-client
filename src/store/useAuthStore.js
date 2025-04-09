import { create } from 'zustand';
import { axiosInstance } from '../api/axiosInstance.js';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
};

const useAuthStore = create((set, get) => ({
  ...initialState,
  register: async (signupData) => {
    try {
      set({ isRegistering: true });
      const res = await axiosInstance.post('/auth/register', signupData);
      set({ user: res.data });
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isRegistering: false });
    }
  },
  login: async (loginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', loginData);
      set({ user: res.data });
      toast.success('Logged in successfully');
      if (res.status == 200) {
        localStorage.setItem('token', res.data.token);
        // Retrieve the intended route from localStorage
        return true;
      } else return false;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  getLoggedInUser: async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      set({ user: res.data });
    } catch (error) {
      console.log('Error in checkAuth', error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ user: null });
      // Clear token from localStorage
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useAuthStore;
