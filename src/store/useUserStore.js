import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  updateProfile: async (updatedProfile) => {
    const response = await axios.put('/api/user/profile', updatedProfile);
    set((state) => ({ ...state, user: response.data }));
    return response.data;
  },
}));

export default useUserStore;
