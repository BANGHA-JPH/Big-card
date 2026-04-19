import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT, StorageKeys } from '@constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear auth and redirect to login
          await AsyncStorage.removeItem(StorageKeys.USER_TOKEN);
          // TODO: Dispatch logout action or navigation event
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string; phone: string }) {
    return this.client.post('/auth/register', data);
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async logout() {
    return this.client.post('/auth/logout');
  }

  async getProfile() {
    return this.client.get('/auth/me');
  }

  async updateProfile(data: any) {
    return this.client.put('/auth/profile', data);
  }

  async forgotPassword(email: string) {
    return this.client.post('/auth/forgot-password', { email });
  }

  // Product endpoints
  async getProducts(page: number = 1, limit: number = 20) {
    return this.client.get('/products', { params: { page, limit } });
  }

  async getProductDetail(productId: string) {
    return this.client.get(`/products/${productId}`);
  }

  async searchProducts(query: string, page: number = 1) {
    return this.client.get('/products/search', { params: { q: query, page } });
  }

  async getCategories() {
    return this.client.get('/categories');
  }

  async getProductsByCategory(categoryId: string, page: number = 1) {
    return this.client.get(`/products/category/${categoryId}`, { params: { page } });
  }

  // Cart endpoints
  async getCart() {
    return this.client.get('/cart');
  }

  async addToCart(productId: string, quantity: number) {
    return this.client.post('/cart/add', { productId, quantity });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.client.put(`/cart/items/${itemId}`, { quantity });
  }

  async removeFromCart(itemId: string) {
    return this.client.delete(`/cart/items/${itemId}`);
  }

  async clearCart() {
    return this.client.delete('/cart');
  }

  // Order endpoints
  async createOrder(data: any) {
    return this.client.post('/orders', data);
  }

  async getOrders(page: number = 1) {
    return this.client.get('/orders', { params: { page } });
  }

  async getOrderDetail(orderId: string) {
    return this.client.get(`/orders/${orderId}`);
  }

  async cancelOrder(orderId: string) {
    return this.client.post(`/orders/${orderId}/cancel`);
  }

  // User endpoints
  async getProfile() {
    return this.client.get('/user/profile');
  }

  async updateProfile(data: any) {
    return this.client.put('/user/profile', data);
  }

  async getAddresses() {
    return this.client.get('/user/addresses');
  }

  async addAddress(data: any) {
    return this.client.post('/user/addresses', data);
  }

  async updateAddress(addressId: string, data: any) {
    return this.client.put(`/user/addresses/${addressId}`, data);
  }

  async deleteAddress(addressId: string) {
    return this.client.delete(`/user/addresses/${addressId}`);
  }

  // Review endpoints
  async getProductReviews(productId: string) {
    return this.client.get(`/products/${productId}/reviews`);
  }

  async addReview(productId: string, data: any) {
    return this.client.post(`/products/${productId}/reviews`, data);
  }

  // Payment endpoints
  async initiatePayment(data: any) {
    return this.client.post('/payments/initiate', data);
  }

  async verifyPayment(transactionId: string) {
    return this.client.post('/payments/verify', { transactionId });
  }
}

export default new ApiService();
