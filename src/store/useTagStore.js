import { create } from 'zustand';
import { axiosInstance } from '../api/axiosInstance.js';
import { toast } from 'react-toastify';

const initialState = {
  tags: [],
  historicData: [], // New state to store historic data
  isTagsLoading: false,
  isHistoricDataLoading: false,
  tagsConfig: [], // Loading state for historic data
};

export const useTagStore = create((set, get) => ({
  ...initialState,
  getTags: async () => {
    set({ isTagsLoading: true });
    try {
      const response = await axiosInstance.get('/latest-sensor-data');
      set({ tags: response.data, isTagsLoading: false });
      console.log('------------------response---tags----------------\n', response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tags. Please try again.');
    } finally {
      set({ isTagsLoading: false });
    }
  },
  // New function to fetch historic data based on date range
  getHistoricData: async (fromDate, toDate) => {
    set({ isHistoricDataLoading: true });
    try {
      const response = await axiosInstance.post('/tags-historic-data', {
        fromDate: fromDate, // Use the date format from the DatePicker
        toDate: toDate,
      });
      set({ historicData: response.data, isHistoricDataLoading: false });
      console.log('------------------historic data response-------------------\n', response);
    } catch (error) {
      console.error('Error fetching historic data:', error);
      toast.error('Failed to fetch historic data. Please try again.');
    } finally {
      set({ isHistoricDataLoading: false });
    }
  },

  getTagConfig: async () => {
    set({ isTagsLoading: true });
    try {
      const response = await axiosInstance.get('/tag-configurations'); // Fetch data from the tag-configurations API
      set({ tagsConfig: response.data, isTagsLoading: false });
      console.log('Tags fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tags. Please try again.');
    } finally {
      set({ isTagsLoading: false });
    }
  },

  updateTag: async (tagname, column, value) => {
    try {
      // Assuming 'column' is the name of the column (e.g., 'min_value')
      const response = await axiosInstance.put('/update-tag', {
        id: tagname,
        column: column, // Send column name, e.g., 'min_value'
        value: value, // Send the value to update
      });

      console.log('Update successful:', response.data.message);
      await get().getTagConfig();
      await get().getTags();
      return response.data; // Optionally return data for further processing
    } catch (error) {
      console.error('Error updating tag:', error.response?.data || error.message);
      throw error; // Optionally rethrow the error for handling in the calling code
    }
  },

  reset: () => set(initialState),
}));
