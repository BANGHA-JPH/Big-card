import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { StorageKeys } from '@constants/index';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
  loadTheme: () => Promise<void>;
  saveTheme: () => Promise<void>;
}

const useThemeStore = create<ThemeState>((set, get) => ({
  isDarkMode: false,

  toggleTheme: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
    get().saveTheme();
  },

  setDarkMode: (isDark: boolean) => {
    set({ isDarkMode: isDark });
    get().saveTheme();
  },

  loadTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(StorageKeys.THEME);
      if (savedTheme) {
        set({ isDarkMode: JSON.parse(savedTheme) });
      }
    } catch (error) {
      console.error('Load theme error:', error);
    }
  },

  saveTheme: async () => {
    try {
      const { isDarkMode } = get();
      await AsyncStorage.setItem(StorageKeys.THEME, JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Save theme error:', error);
    }
  },
}));

export default useThemeStore;
