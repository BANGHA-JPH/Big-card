import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart, CartItem, Vegetable } from '@types/index';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  addItem: (product: Vegetable, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCart: () => Promise<void>;
  saveCart: () => Promise<void>;
  calculateTotal: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,

  addItem: (product: Vegetable, quantity: number) => {
    set((state) => {
      const cart = state.cart || {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        lastUpdated: new Date().toISOString(),
      };

      const existingItem = cart.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * product.price;
      } else {
        cart.items.push({
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          totalPrice: quantity * product.price,
        });
      }

      cart.totalItems = cart.items.length;
      cart.totalPrice = get().calculateTotal();
      cart.lastUpdated = new Date().toISOString();

      return { cart };
    });

    get().saveCart();
  },

  removeItem: (itemId: string) => {
    set((state) => {
      if (!state.cart) return state;

      const cart = state.cart;
      cart.items = cart.items.filter((item) => item.id !== itemId);
      cart.totalItems = cart.items.length;
      cart.totalPrice = get().calculateTotal();
      cart.lastUpdated = new Date().toISOString();

      return { cart };
    });

    get().saveCart();
  },

  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => {
      if (!state.cart) return state;

      const cart = state.cart;
      const item = cart.items.find((i) => i.id === itemId);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.totalPrice = quantity * item.product.price;
      }

      cart.totalPrice = get().calculateTotal();
      cart.lastUpdated = new Date().toISOString();

      return { cart };
    });

    get().saveCart();
  },

  clearCart: () => {
    set({
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        lastUpdated: new Date().toISOString(),
      },
    });

    get().saveCart();
  },

  getCart: async () => {
    try {
      set({ isLoading: true });
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        set({ cart: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error('Get cart error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveCart: async () => {
    try {
      const { cart } = get();
      if (cart) {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Save cart error:', error);
    }
  },

  calculateTotal: () => {
    const { cart } = get();
    if (!cart) return 0;

    return cart.items.reduce((total, item) => total + item.totalPrice, 0);
  },
}));

export default useCartStore;
