export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  categoryId?: number;
  categorySlug?: string;
  categoryName?: string;
  inventory: number;
  featured: boolean;
  slug: string;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}