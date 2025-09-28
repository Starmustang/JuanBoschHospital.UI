import { LoginRequest, User } from "@/app/(DashboardLayout)/types/auth/auth";
import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";
import { signIn, signOut } from "next-auth/react";

export interface AuthSlice {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    
    // Auth actions
    login: (credentials: LoginRequest) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
    
}

const url = '/Account/login';

export const createAuthSlice: StateCreator<MainStore, [], [], AuthSlice> = (set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (credentials: LoginRequest) => {
      set({ isLoading: true, error: null });
      try {
        const result = await signIn('credentials', {
          ...credentials,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        if (!result?.ok) {
          throw new Error('Login failed. Please check your credentials.');
        }

        set({ isLoading: false, isAuthenticated: true });
        toast.success('Login successful');
        return true;
      } catch (error: any) {
        const errorMessage = error.message || 'Login failed';
        set({
          isLoading: false,
          error: errorMessage,
          isAuthenticated: false,
        });
        toast.error(errorMessage);
        return false;
      }
    },

    logout: async () => {
        await signOut({ redirect: false });

        // Clear axios default headers
        delete axiosMain.defaults.headers.common['Authorization'];

        set({ 
            user: null, 
            token: null, 
            isAuthenticated: false,
            error: null
        });
        
        toast.success('Logged out successfully');
    },

    clearError: () => {
        set({ error: null });
    },

});
