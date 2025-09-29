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
    console.log('Register slice called with:', userData);
    console.log('API URL:', url);
    console.log('Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
    
    set({ isLoading: true, error: null });
    try {
      console.log('Making API request to:', `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`);
      const response = await axiosMain.post(url, userData);
      console.log('Registration response:', response);
      
      set({ isLoading: false });
      toast.success('Registration successful! Please log in.');
      return true;
    } catch (error: any) {
      console.error('Registration error details:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  },
});
