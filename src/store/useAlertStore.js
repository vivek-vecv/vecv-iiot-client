import { create } from 'zustand';
import { toast } from 'react-toastify';
import { axiosInstance } from '../api/axiosInstance.js';

const initialState = {
  alerts: [],
  alertCounts: {},
  filteredAlerts: [],
  lastFiveALerts: [],
  lastFiveALertsWarning: [],
  loading: false,
  error: null,
};

export const useAlertStore = create((set) => ({
  ...initialState,

  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/alerts/all');
      set({ alerts: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch alerts', loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch alerts');
    }
  },

  fetchLastFiveAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/alerts/lastalerts');
      set({ lastFiveALerts: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch alerts', loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch alerts');
    }
  },

  fetchLastFivewarnings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/alerts/alertWarnings');
      set({ lastFiveALertsWarning: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch alerts', loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch alerts');
    }
  },

  fetchAlertCounts: async (duration) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/alerts/counts?duration=${duration}`);
      set({ alertCounts: response.data.HD, loading: false });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch alert counts', loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch alert counts');
    }
  },

  fetchFilteredAlerts: async (filters) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/alerts/filter', { params: filters });
      set({ filteredAlerts: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch filtered alerts', loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch filtered alerts');
    }
  },

  createAlert: async (newAlert) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/alerts', newAlert);
      set((state) => ({
        alerts: [...state.alerts, response.data],
        loading: false,
      }));
      toast.success('Alert created successfully!');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create alert', loading: false });
      toast.error(error.response?.data?.message || 'Failed to create alert');
    }
  },

  updateAlert: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/alerts/${id}`, updatedData);
      set((state) => ({
        alerts: state.alerts.map((alert) => (alert.id === id ? { ...alert, ...response.data } : alert)),
        loading: false,
      }));
      toast.success('Alert updated successfully!');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update alert', loading: false });
      toast.error(error.response?.data?.message || 'Failed to update alert');
    }
  },

  deleteAlert: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/alerts/${id}`);
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id),
        loading: false,
      }));
      toast.success('Alert deleted successfully!');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete alert', loading: false });
      toast.error(error.response?.data?.message || 'Failed to delete alert');
    }
  },
}));
