import { v4 as uuidv4 } from 'uuid';

/**
 * Generate UUID
 */
export const generateId = (): string => {
  return uuidv4();
};

/**
 * Format price
 */
export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

/**
 * Calculate discount
 */
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Apply coupon discount
 */
export const applyCouponDiscount = (
  total: number,
  discount: number,
  discountType: 'percentage' | 'fixed'
): number => {
  if (discountType === 'percentage') {
    return total - (total * discount) / 100;
  }
  return Math.max(0, total - discount);
};

/**
 * Calculate tax
 */
export const calculateTax = (amount: number, taxRate: number = 0.1): number => {
  return amount * taxRate;
};

/**
 * Truncate text
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Capitalize string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Sleep utility
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Paginate results
 */
export const paginate = (page: number = 1, limit: number = 20) => {
  const pageNum = Math.max(1, page);
  const offset = (pageNum - 1) * limit;
  return { offset, limit };
};

/**
 * Build paginated response
 */
export const buildPaginatedResponse = (data: any[], total: number, page: number, limit: number) => {
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

export default {
  generateId,
  formatPrice,
  calculateDiscount,
  applyCouponDiscount,
  calculateTax,
  truncateText,
  capitalize,
  sleep,
  paginate,
  buildPaginatedResponse,
};
