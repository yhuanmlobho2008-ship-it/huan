export type ProductCategory = 'jersey' | 'boots' | 'ball' | 'accessory';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  sizes: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  selectedSize: string;
  quantity: number;
  addedAt: string;
}

export type CustomerTier = 'member' | 'gold' | 'diamond';

export interface Customer {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  tier: CustomerTier;
  interestedItemsCount: number;
  createdAt: string;
  notes: string;
}

export interface StoreNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system' | 'stock';
  timestamp: string;
  read: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
