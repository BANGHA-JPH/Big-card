import { create } from 'zustand';
import { Vegetable } from '@types/index';

interface FavoritesState {
  favorites: Vegetable[];
  isFavorite: (productId: string) => boolean;
  addFavorite: (product: Vegetable) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Vegetable) => void;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  isFavorite: (productId: string) => {
    return get().favorites.some((item) => item.id === productId);
  },

  addFavorite: (product: Vegetable) => {
    set((state) => {
      if (!state.favorites.some((item) => item.id === product.id)) {
        return { favorites: [...state.favorites, product] };
      }
      return state;
    });
  },

  removeFavorite: (productId: string) => {
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== productId),
    }));
  },

  toggleFavorite: (product: Vegetable) => {
    const isFav = get().isFavorite(product.id);
    if (isFav) {
      get().removeFavorite(product.id);
    } else {
      get().addFavorite(product);
    }
  },

  clearFavorites: () => {
    set({ favorites: [] });
  },

  getFavoritesCount: () => {
    return get().favorites.length;
  },
}));

export default useFavoritesStore;
