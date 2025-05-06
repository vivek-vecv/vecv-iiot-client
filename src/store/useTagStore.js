import { create } from 'zustand';
import { axiosInstance } from '../api/axiosInstance.js';
import { toast } from 'react-toastify';

const initialState = {
  currentMachineName: '',
  tags: [],
  historicData: [],
  isTagsLoading: false,
  isHistoricDataLoading: false,
  tagsConfig: [],
};

export const useTagStore = create((set, get) => ({
  ...initialState,

  // Fetch the latest sensor data (live data) for a specific machine
  getTags: async (machineName = '') => {
    set({ isTagsLoading: true, currentMachineName: machineName });

    try {
      const response = await axiosInstance.get(
        '/tags/latest-sensor-data',
        {params:{ machineName, line: 'HD' }}
      );
      set({ tags: response.data, isTagsLoading: false });
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tags. Please try again.');
      set({ isTagsLoading: false });
    }
  },

  // Fetch historic data based on date range
  getHistoricData: async (fromDate, toDate) => {
    set({ isHistoricDataLoading: true });
    try {
      const response = await axiosInstance.post(
        '/tags/tags-historic-data',
        { fromDate, toDate }
      );
      set({ historicData: response.data, isHistoricDataLoading: false });
    } catch (error) {
      console.error('Error fetching historic data:', error);
      toast.error('Failed to fetch historic data. Please try again.');
      set({ isHistoricDataLoading: false });
    }
  },

  // Fetch tag configurations
  getTagConfig: async () => {
    set({ isTagsLoading: true });
    try {
      const response = await axiosInstance.get('/tags/tag-configurations');
      set({ tagsConfig: response.data, isTagsLoading: false });
    } catch (error) {
      console.error('Error fetching tag configurations:', error);
      toast.error('Failed to fetch tag configurations. Please try again.');
      set({ isTagsLoading: false });
    }
  },

  // Update a tag (after updating, refresh configs AND live data for the current machine)
  updateTag: async (id, updates) => {
    try {
      const response = await axiosInstance.put('/tags/update-tag', {
        id,
        column: { ...updates },
      });
      toast.success(response.data.message);
      await get().getTagConfig();
      await get().getTags(get().currentMachineName);
      return response.data;
    } catch (error) {
      console.error('Error updating tag:', error.response?.data || error.message);
      toast.error('Failed to update tag. Please try again.');
      throw error;
    }
  },

  // Create a new tag
  createTag: async (tagData) => {
    try {
      const response = await axiosInstance.post('/tags/create-tag', tagData);
      toast.success('Tag created successfully.');
      await get().getTagConfig();
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error.response?.data || error.message);
      toast.error('Failed to create tag. Please try again.');
      throw error;
    }
  },

  // Delete a tag
  deleteTag: async (id) => {
    try {
      const response = await axiosInstance.delete(`/tags/delete-tag/${id}`);
      toast.success(response.data.message);
      await get().getTagConfig();
      await get().getTags(get().currentMachineName);
      return response.data;
    } catch (error) {
      console.error('Error deleting tag:', error.response?.data || error.message);
      toast.error('Failed to delete tag. Please try again.');
      throw error;
    }
  },

  // Reset store to initial state
  reset: () => set(initialState),
}));
