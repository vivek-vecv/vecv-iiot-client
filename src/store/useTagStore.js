import { create } from 'zustand';
import { axiosInstance } from '../api/axiosInstance.js';
import { toast } from 'react-toastify';

const initialState = {
  tags: [],
  isTagsLoading: false,
};

export const useTagStore = create((set, get) => ({
  ...initialState,
  getTags: async () => {
    set({ isTagsLoading: true });
    try {
      const response = await axiosInstance.get('/tags');
      set({ tags: response.data, isTagsLoading: false });
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tags. Please try again.');
    } finally {
      set({ isTagsLoading: false });
    }
  },
  updateTag: async (id, updatedData) => {
    try {
      const response = await axiosInstance.patch(`/tags/${id}`, updatedData);
      set((state) => ({
        tags: state.tags.map((tag) => (tag._id === id ? { ...tag, ...response.data } : tag)),
      }));
      toast.success('Tag updated successfully!');
    } catch (error) {
      console.error('Error updating tag:', error);
      toast.error('Failed to update tag. Please try again.');
    }
  },
  reset: () => set(initialState),
}));
