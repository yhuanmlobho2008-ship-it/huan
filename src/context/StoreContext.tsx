import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Customer, StoreNotification, ToastMessage, ProductCategory } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CUSTOMERS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  customers: Customer[];
  notifications: StoreNotification[];
  toasts: ToastMessage[];
  currentView: 'store' | 'admin';
  adminTab: 'products' | 'customers';
  selectedCategory: 'all' | ProductCategory;
  searchQuery: string;
  selectedProductForModal: Product | null;
  isCartOpen: boolean;
  isNotificationOpen: boolean;
  
  // Setters
  setCurrentView: (view: 'store' | 'admin') => void;
  setAdminTab: (tab: 'products' | 'customers') => void;
  setSelectedCategory: (cat: 'all' | ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProductForModal: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsNotificationOpen: (open: boolean) => void;

  // Cart operations
  addToCart: (product: Product, size: string, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartTotalPrice: number;

  // Product CRUD
  addProduct: (newProd: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Customer CRUD
  addCustomer: (newCust: Omit<Customer, 'id' | 'code' | 'createdAt'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Notifications & Toast
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Older saved data referenced dev-only /src/assets paths that don't exist in production builds
const migrateImagePaths = (json: string) => json.replaceAll('/src/assets/images/', '/images/');

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistent Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('arena_football_products');
      if (saved) return JSON.parse(migrateImagePaths(saved));
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Persistent Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('arena_football_cart');
      if (saved) return JSON.parse(migrateImagePaths(saved));
    } catch {
      // fallback
    }
    return [];
  });

  // Persistent Customers
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('arena_football_customers');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CUSTOMERS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<StoreNotification[]>(() => {
    try {
      const saved = localStorage.getItem('arena_football_notifications');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [adminTab, setAdminTab] = useState<'products' | 'customers'>('products');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('arena_football_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('arena_football_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('arena_football_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('arena_football_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast handler
  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, size: string, quantity = 1) => {
    const chosenSize = size || product.sizes[0] || 'Tiêu chuẩn';
    const cartItemId = `${product.id}-${chosenSize}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            productId: product.id,
            product,
            selectedSize: chosenSize,
            quantity,
            addedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }
        ];
      }
    });

    addToast(
      'Đã thêm vào giỏ hàng',
      `${product.name} (Size: ${chosenSize}, SL: ${quantity}) đã nằm trong giỏ hàng của bạn.`,
      'success'
    );
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.cartItemId === cartItemId);
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    if (item) {
      addToast('Đã xóa sản phẩm', `Đã bỏ ${item.product.name} khỏi giỏ hàng.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    addToast('Giỏ hàng đã dọn sạch', 'Đã xóa toàn bộ sản phẩm khỏi giỏ hàng.', 'info');
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now().toString().slice(-4)}`;
    const created: Product = {
      ...newProd,
      id: newId
    };
    setProducts((prev) => [created, ...prev]);
    addToast('Thêm sản phẩm thành công', `Sản phẩm "${created.name}" đã được đưa lên hệ thống.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    // Also update any matching product inside cart
    setCart((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, product: { ...item.product, ...updates } } : item
      )
    );
    addToast('Cập nhật thành công', 'Thông tin sản phẩm đã được lưu thay đổi.');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.productId !== id));
    addToast('Đã xóa sản phẩm', target ? `Đã gỡ "${target.name}" khỏi danh mục.` : 'Đã xóa sản phẩm.', 'warning');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    addToast('Đã khôi phục dữ liệu', 'Đã tải lại toàn bộ 20 sản phẩm bóng đá mẫu ban đầu.', 'info');
  };

  // Customer CRUD
  const addCustomer = (newCust: Omit<Customer, 'id' | 'code' | 'createdAt'>) => {
    const count = customers.length + 1;
    const code = `KH-${8800 + count}`;
    const created: Customer = {
      ...newCust,
      id: `cust-${Date.now().toString().slice(-4)}`,
      code,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomers((prev) => [created, ...prev]);
    addToast('Thêm khách hàng thành công', `Đã thêm khách hàng "${created.name}" (${code}).`);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    addToast('Đã lưu khách hàng', 'Hồ sơ thông tin khách hàng đã được cập nhật.');
  };

  const deleteCustomer = (id: string) => {
    const target = customers.find((c) => c.id === id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    addToast('Đã xóa khách hàng', target ? `Đã xóa khách hàng ${target.name}.` : 'Đã xóa hồ sơ.', 'warning');
  };

  // Notification actions
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Thông báo', 'Đã đánh dấu tất cả thông báo là đã đọc.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        customers,
        notifications,
        toasts,
        currentView,
        adminTab,
        selectedCategory,
        searchQuery,
        selectedProductForModal,
        isCartOpen,
        isNotificationOpen,
        setCurrentView,
        setAdminTab,
        setSelectedCategory,
        setSearchQuery,
        setSelectedProductForModal,
        setIsCartOpen,
        setIsNotificationOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartTotalPrice,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        markNotificationAsRead,
        markAllNotificationsRead,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
