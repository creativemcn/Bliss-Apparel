export type Category =
  | "Smartphones"
  | "Laptops"
  | "Headphones"
  | "Smartwatches"
  | "Accessories"
  | "Gaming";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  password?: string | null; // hashed, never exposed to client
  role: UserRole;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image_url: string;
  stock: number;
  specs: Record<string, string | number | boolean>;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string | null;
  total: number;
  status: OrderStatus;
  shipping_address: ShippingAddress;
  payment_intent_id: string | null;
  stripe_session_id?: string | null;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

// Cart store types (Zustand)
export interface CartStoreItem {
  productId: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock: number;
}

export interface CartStore {
  items: CartStoreItem[];
  addItem: (item: Omit<CartStoreItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}
