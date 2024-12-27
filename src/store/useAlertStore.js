import { create } from 'zustand';
import { toast } from 'react-toastify';
import { axiosInstance } from '../api/axiosInstance.js';

const initialState = {
  alerts: [],
  alertCounts: {},
  filteredAlerts: [],
  loading: false,
  error: null,
};

export const useAlertStore = create((set) => ({
  ...initialState,
  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/alerts');
      set({ alerts: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch alerts', loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch alerts');
    } finally {
      set({ loading: false });
    }
  },

  // Fetch alert counts from the API
  fetchAlertCounts: async (duration) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/alerts/counts?duration=${duration}`);
      if (res.status === 200) {
        set({ alertCounts: res.data });
      }
      return res.data;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // Fetch alerts with filters
  fetchFilteredAlerts: async (filters) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/alerts/fetch', { params: filters });
      set({ alerts: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch alerts', loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch alerts');
    }
  },

  // Create a new alert
  createAlert: async (newAlert) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/alerts', newAlert);
      set((state) => ({
        alerts: [...state.alerts, response.data.alert],
        loading: false,
      }));
      toast.success('Alert created successfully!');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create alert', loading: false });
      toast.error(error.response?.data?.message || 'Failed to create alert');
    }
  },

  // Update an alert
  updateAlert: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/alerts/${id}`, updatedData);
      set((state) => ({
        alerts: state.alerts.map((alert) => (alert._id === id ? { ...alert, ...response.data.alert } : alert)),
        loading: false,
      }));
      toast.success('Alert updated successfully!');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update alert', loading: false });
      toast.error(error.response?.data?.message || 'Failed to update alert');
    }
  },

  // Delete an alert
  deleteAlert: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/alerts/${id}`);
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert._id !== id),
        loading: false,
      }));
      toast.success('Alert deleted successfully!');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete alert', loading: false });
      toast.error(error.response?.data?.message || 'Failed to delete alert');
    }
  },

  // Reset alert counts data
  resetAlertCounts: () => {
    set({ alertCounts: {} });
  },
}));
