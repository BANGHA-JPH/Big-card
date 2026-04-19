import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@types/index';
import { StorageKeys } from '@constants/index';
import apiService from '@services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  getStoredAuth: () => Promise<void>;
  updateProfile: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await apiService.login(email, password);
      
      const { user, token } = response.data.data;
      
      await AsyncStorage.setItem(StorageKeys.USER_TOKEN, token);
      await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (userData: any) => {
    try {
      set({ isLoading: true });
      const response = await apiService.register(userData);
      
      const { user, token } = response.data.data;
      
      await AsyncStorage.setItem(StorageKeys.USER_TOKEN, token);
      await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await apiService.logout();
      
      await AsyncStorage.removeItem(StorageKeys.USER_TOKEN);
      await AsyncStorage.removeItem(StorageKeys.USER_DATA);
      
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  setToken: (token: string | null) => {
    set({ token });
  },

  getStoredAuth: async () => {
    try {
      set({ isLoading: true });
      
      const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);
      const userData = await AsyncStorage.getItem(StorageKeys.USER_DATA);
      
      if (token && userData) {
        set({ 
          token, 
          user: JSON.parse(userData),
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.error('Get stored auth error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: (user: User) => {
    set({ user });
  },
}));

export default useAuthStore;
