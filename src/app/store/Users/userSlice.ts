import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";
import { User, Role, AssignRoleRequest } from "@/app/(DashboardLayout)/types/users/user";

export interface UserSlice {
  userList: User[];
  roleList: Role[];
  userIsLoading: boolean;
  userError: string | null;
  showUserModal: boolean;
  showRoleModal: boolean;
  selectedUserId: string | null;
  showUserDeleteModal: boolean;

  // User actions
  fetchUsers: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  assignRole: (request: AssignRoleRequest) => Promise<void>;
  removeRole: (request: AssignRoleRequest) => Promise<void>;
  handleOpenUserModal: (userId?: string) => void;
  handleCloseUserModal: () => void;
  handleOpenRoleModal: (userId: string) => void;
  handleCloseRoleModal: () => void;
  handleOpenUserDeleteModal: (userId: string) => void;
  handleCloseUserDeleteModal: () => void;
  deleteUser: (userId: string) => Promise<void>;
}

const usersUrl = '/Users';
const rolesUrl = '/Roles';

export const createUserSlice: StateCreator<MainStore, [], [], UserSlice> = (set, get) => ({
  userList: [],
  roleList: [],
  userIsLoading: false,
  userError: null,
  showUserModal: false,
  showRoleModal: false,
  selectedUserId: null,
  showUserDeleteModal: false,

  fetchUsers: async () => {
    set({ userIsLoading: true, userError: null });
    try {
      const response = await axiosMain.get(usersUrl);
      set({ userList: response.data, userIsLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch users';
      set({ userError: errorMessage, userIsLoading: false });
      toast.error(errorMessage);
    }
  },

  fetchRoles: async () => {
    try {
      const response = await axiosMain.get(rolesUrl);
      set({ roleList: response.data });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch roles';
      toast.error(errorMessage);
    }
  },

  assignRole: async (request: AssignRoleRequest) => {
    try {
      await axiosMain.post(`${rolesUrl}/${request.roleName}/users/${request.userId}`);
      // Refresh users to get updated roles
      const { fetchUsers } = get();
      await fetchUsers();
      toast.success('Role assigned successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to assign role';
      toast.error(errorMessage);
      throw error;
    }
  },

  removeRole: async (request: AssignRoleRequest) => {
    try {
      await axiosMain.delete(`${rolesUrl}/${request.roleName}/users/${request.userId}`);
      // Refresh users to get updated roles
      const { fetchUsers } = get();
      await fetchUsers();
      toast.success('Role removed successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to remove role';
      toast.error(errorMessage);
      throw error;
    }
  },

  handleOpenUserModal: (userId?: string) => {
    set({ selectedUserId: userId || null, showUserModal: true });
  },

  handleCloseUserModal: () => {
    set({ showUserModal: false, selectedUserId: null });
  },

  handleOpenRoleModal: (userId: string) => {
    set({ selectedUserId: userId, showRoleModal: true });
  },

  handleCloseRoleModal: () => {
    set({ showRoleModal: false, selectedUserId: null });
  },

  handleOpenUserDeleteModal: (userId: string) => {
    set({ selectedUserId: userId, showUserDeleteModal: true });
  },

  handleCloseUserDeleteModal: () => {
    set({ showUserDeleteModal: false, selectedUserId: null });
  },

  deleteUser: async (userId: string) => {
    try {
      await axiosMain.delete(`${usersUrl}/${userId}`);
      const { userList } = get();
      set({ userList: userList.filter((user: User) => user.id !== userId) });
      toast.success('User deleted successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      toast.error(errorMessage);
      throw error;
    }
  },
});
