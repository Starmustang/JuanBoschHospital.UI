import { useMainStore } from "@/app/store";

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const { isAuthenticated } = useMainStore.getState();
  return isAuthenticated;
};

// Function to get current user
export const getCurrentUser = () => {
  const { user } = useMainStore.getState();
  return user;
};

// Function to get current token
export const getToken = () => {
  const { token } = useMainStore.getState();
  return token;
};
