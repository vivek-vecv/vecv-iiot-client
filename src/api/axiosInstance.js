import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api` : 'http://localhost:5000/api',
  withCredentials: true, // Allow cookies to be sent
});

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export { BASE_URL, axiosInstance };
