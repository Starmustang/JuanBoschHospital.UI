import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";
import { RegisterRequest } from "@/app/(DashboardLayout)/types/auth/auth";

export interface RegisterSlice {
  isLoading: boolean;
  error: string | null;
  register: (userData: RegisterRequest) => Promise<boolean>;
}

const url = '/Account/register';

export const createRegisterSlice: StateCreator<MainStore, [], [], RegisterSlice> = (set) => ({
  isLoading: false,
  error: null,
  register: async (userData: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      await axiosMain.post(url, userData);
      set({ isLoading: false });
      toast.success('Registration successful! Please log in.');
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  },
});
