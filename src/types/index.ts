// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

// Product Types
export interface Vegetable {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  unit: string; // kg, lb, piece, dozen
  category: string;
  tags: string[];
  isOrganic: boolean;
  isFresh: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  count: number;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Vegetable;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  paymentMethod: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'upi' | 'bank_transfer';
  isDefault: boolean;
}

// Promotion Types
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minAmount?: number;
  expiryDate: string;
  isActive: boolean;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
