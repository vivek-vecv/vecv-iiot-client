import { create } from 'zustand';
import { axiosInstance } from '../api/axiosInstance.js';
import { toast } from 'react-toastify';

const initialState = {
  tags: [],
  historicData: [], // State to store historic data
  isTagsLoading: false,
  isHistoricDataLoading: false,
  tagsConfig: [], // State for tag configurations
};

export const useTagStore = create((set, get) => ({
  ...initialState,

  // Fetch the latest sensor data (live data)
  getTags: async () => {
    set({ isTagsLoading: true });
    try {
      const response = await axiosInstance.get('/tags/latest-sensor-data');
      set({ tags: response.data, isTagsLoading: false });
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tags. Please try again.');
    } finally {
      set({ isTagsLoading: false });
    }
  },

  // Fetch historic data based on date range
  getHistoricData: async (fromDate, toDate) => {
    set({ isHistoricDataLoading: true });
    try {
      const response = await axiosInstance.post('/tags/tags-historic-data', {
        fromDate,
        toDate,
      });
      set({ historicData: response.data, isHistoricDataLoading: false });
    } catch (error) {
      console.error('Error fetching historic data:', error);
      toast.error('Failed to fetch historic data. Please try again.');
    } finally {
      set({ isHistoricDataLoading: false });
    }
  },

  // Fetch tag configurations
  getTagConfig: async () => {
    set({ isTagsLoading: true });
    try {
      const response = await axiosInstance.get('/tags/tag-configurations');
      set({ tagsConfig: response.data, isTagsLoading: false });
      console.log('Tags fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tag configurations. Please try again.');
    } finally {
      set({ isTagsLoading: false });
    }
  },

  // Update tag details (including new fields like severity, line, etc.)
  updateTag: async (id, updates) => {
    try {
      const response = await axiosInstance.put('/tags/update-tag', {
        id,
        column: { ...updates }, // Pass all updates as a single object
      });

      console.log('Update successful:', response.data.message);
      await get().getTagConfig(); // Refresh tag configurations
      await get().getTags(); // Refresh live sensor data
      return response.data; // Return response data for further processing if needed
    } catch (error) {
      console.error('Error updating tag:', error.response?.data || error.message);
      toast.error('Failed to update tag. Please try again.');
      throw error; // Optionally rethrow the error for external handling
    }
  },

  // Create a new tag
  createTag: async (tagData) => {
    try {
      const response = await axiosInstance.post('/tags/create-tag', tagData);
      console.log('Tag created successfully:', response.data);
      await get().getTagConfig(); // Refresh configurations after creating a new tag
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error.response?.data || error.message);
      toast.error('Failed to create tag. Please try again.');
      throw error;
    }
  },

  deleteTag: async (id) => {
    try {
      const response = await axiosInstance.delete(`/tags/delete-tag/${id}`);
      console.log('Tag deleted successfully:', response.data.message);
      toast.success('Tag deleted successfully.');
      await get().getTagConfig();
      await get().getTags();
      return response.data;
    } catch (error) {
      console.error('Error deleting tag:', error.response?.data || error.message);
      toast.error('Failed to delete tag. Please try again.');
      throw error;
    }
  },

  // Reset store state to initial values
  reset: () => set(initialState),
}));
