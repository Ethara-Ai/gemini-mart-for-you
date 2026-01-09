export type Category = 
  | 'Electronics'
  | 'Fashion'
  | 'Home Goods'
  | 'Beauty'
  | 'Fitness'
  | 'Food & Beverage'
  | 'Books'
  | 'Toys';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  stock: number;
  shippingEstimate: string; // e.g., "2-3 days"
  isSale: boolean;
  salePrice?: number;
  details: Record<string, string | number>; // Flexible for category-specifics
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: UserAddress;
}

export type ShippingTier = 'standard' | 'express' | 'free';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  shippingTier: ShippingTier;
  date: string;
}

