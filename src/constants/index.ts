export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
export const API_TIMEOUT = 30000; // 30 seconds

// Supabase Configuration
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// App Colors
export const Colors = {
  primary: '#2ECC71', // Fresh green for vegetables
  secondary: '#F39C12', // Orange
  darkText: '#2C3E50',
  lightText: '#7F8C8D',
  background: '#FFFFFF',
  lightBackground: '#F5F5F5',
  border: '#E0E0E0',
  error: '#E74C3C',
  success: '#27AE60',
  warning: '#F39C12',
  info: '#3498DB',
  white: '#FFFFFF',
  black: '#000000',
};

// Font Sizes
export const FontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  h1: 32,
  h2: 28,
  h3: 24,
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border Radius
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Screen Names
export const ScreenNames = {
  // Auth Screens
  Splash: 'Splash',
  Login: 'Login',
  Register: 'Register',
  ForgotPassword: 'ForgotPassword',
  
  // Home Screens
  Home: 'Home',
  Search: 'Search',
  ProductDetail: 'ProductDetail',
  
  // Shop Screens
  Shop: 'Shop',
  Category: 'Category',
  
  // Cart Screens
  Cart: 'Cart',
  Checkout: 'Checkout',
  Payment: 'Payment',
  OrderConfirmation: 'OrderConfirmation',
  
  // Orders Screens
  Orders: 'Orders',
  OrderDetail: 'OrderDetail',
  OrderTracking: 'OrderTracking',
  
  // Account Screens
  Account: 'Account',
  Profile: 'Profile',
  EditProfile: 'EditProfile',
  Addresses: 'Addresses',
  AddAddress: 'AddAddress',
  EditAddress: 'EditAddress',
  Favorites: 'Favorites',
  Settings: 'Settings',
  Help: 'Help',
  About: 'About',
};

// Pagination
export const PAGINATION = {
  PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
};

// Local Storage Keys
export const StorageKeys = {
  USER_TOKEN: '@zita_user_token',
  USER_DATA: '@zita_user_data',
  CART: '@zita_cart',
  FAVORITES: '@zita_favorites',
  THEME: '@zita_theme',
  LANGUAGE: '@zita_language',
  SEARCH_HISTORY: '@zita_search_history',
  ADDRESSES: '@zita_addresses',
  PAYMENT_METHODS: '@zita_payment_methods',
};

// Status Messages
export const StatusMessages = {
  LOADING: 'Loading...',
  SUCCESS: 'Success!',
  ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  CONFIRM_DELETE: 'Are you sure you want to delete this?',
};
