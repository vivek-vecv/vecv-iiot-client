import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api` : 'http://localhost:5005/api',
  withCredentials: false, // Important to send cookies
});

// Add the token to the request headers before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005';

export { BASE_URL, axiosInstance };
