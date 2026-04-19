import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@constants/index';

interface SearchState {
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  removeFromSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  loadSearchHistory: () => Promise<void>;
  saveSearchHistory: () => Promise<void>;
}

const useSearchStore = create<SearchState>((set, get) => ({
  searchHistory: [],

  addToSearchHistory: (query: string) => {
    if (!query.trim()) return;

    set((state) => {
      const history = state.searchHistory.filter((q) => q !== query);
      return { searchHistory: [query, ...history].slice(0, 10) };
    });

    get().saveSearchHistory();
  },

  removeFromSearchHistory: (query: string) => {
    set((state) => ({
      searchHistory: state.searchHistory.filter((q) => q !== query),
    }));

    get().saveSearchHistory();
  },

  clearSearchHistory: () => {
    set({ searchHistory: [] });
    get().saveSearchHistory();
  },

  loadSearchHistory: async () => {
    try {
      const saved = await AsyncStorage.getItem(StorageKeys.SEARCH_HISTORY);
      if (saved) {
        set({ searchHistory: JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Load search history error:', error);
    }
  },

  saveSearchHistory: async () => {
    try {
      const { searchHistory } = get();
      await AsyncStorage.setItem(StorageKeys.SEARCH_HISTORY, JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Save search history error:', error);
    }
  },
}));

export default useSearchStore;
