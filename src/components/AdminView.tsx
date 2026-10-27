import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Customer, ProductCategory, CustomerTier } from '../types';
import {
  Package,
  Users,
  Plus,
  Search,
  Trash2,
  Edit,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  X,
  Save,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    products,
    customers,
    adminTab,
    setAdminTab,
    setCurrentView,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    addCustomer,
    updateCustomer,
    deleteCustomer
  } = useStore();

  // Product filters
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState<string>('all');

  // Customer filters
  const [customerSearch, setCustomerSearch] = useState('');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form states for Product
  const [prodForm, setProdForm] = useState<{
    name: string;
    category: ProductCategory;
    brand: string;
    price: number;
    originalPrice: number;
    stockCount: number;
    inStock: boolean;
    description: string;
    sizes: string;
    image: string;
  }>({
    name: '',
    category: 'jersey',
    brand: 'Adidas',
    price: 850000,
    originalPrice: 1000000,
    stockCount: 20,
    inStock: true,
    description: '',
    sizes: 'S, M, L, XL',
    image: '/src/assets/images/category_jersey_1793107359141.jpg'
  });

  // Form states for Customer
  const [custForm, setCustForm] = useState<{
    name: string;
    phone: string;
    email: string;
    address: string;
    tier: CustomerTier;
    notes: string;
  }>({
    name: '',
    phone: '',
    email: '',
    address: '',
    tier: 'member',
    notes: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Open Product Modal (Add or Edit)
  const openProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setProdForm({
        name: prod.name,
        category: prod.category,
        brand: prod.brand,
        price: prod.price,
        originalPrice: prod.originalPrice || prod.price,
        stockCount: prod.stockCount,
        inStock: prod.inStock,
        description: prod.description,
        sizes: prod.sizes.join(', '),
        image: prod.image
      });
    } else {
      setEditingProduct(null);
      setProdForm({
        name: '',
        category: 'jersey',
        brand: 'Nike',
        price: 750000,
        originalPrice: 950000,
        stockCount: 25,
        inStock: true,
        description: 'Mẫu áo thể thao bóng đá vải dệt co giãn 4 chiều.',
        sizes: 'S, M, L, XL',
        image: '/src/assets/images/category_jersey_1793107359141.jpg'
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim()) return;

    const categoryNames: Record<ProductCategory, string> = {
      jersey: 'Áo đấu bóng đá',
      boots: 'Giày đá bóng',
      ball: 'Bóng thi đấu',
      accessory: 'Phụ kiện bóng đá'
    };

    const parsedSizes = prodForm.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: prodForm.name,
        category: prodForm.category,
        categoryName: categoryNames[prodForm.category],
        brand: prodForm.brand,
        price: Number(prodForm.price),
        originalPrice: Number(prodForm.originalPrice),
        stockCount: Number(prodForm.stockCount),
        inStock: prodForm.inStock,
        description: prodForm.description,
        sizes: parsedSizes.length > 0 ? parsedSizes : ['Tiêu chuẩn'],
        image: prodForm.image
      });
    } else {
      addProduct({
        name: prodForm.name,
        category: prodForm.category,
        categoryName: categoryNames[prodForm.category],
        brand: prodForm.brand,
        price: Number(prodForm.price),
        originalPrice: Number(prodForm.originalPrice),
        rating: 5.0,
        reviewsCount: 1,
        image: prodForm.image,
        inStock: prodForm.inStock,
        stockCount: Number(prodForm.stockCount),
        description: prodForm.description,
        features: ['Chính hãng 100%', 'Chất liệu thoáng mát', 'Bảo hành đầy đủ'],
        sizes: parsedSizes.length > 0 ? parsedSizes : ['Tiêu chuẩn'],
        isFeatured: false,
        isBestSeller: false
      });
    }
    setIsProductModalOpen(false);
  };

  // Open Customer Modal
  const openCustomerModal = (cust?: Customer) => {
    if (cust) {
      setEditingCustomer(cust);
      setCustForm({
        name: cust.name,
        phone: cust.phone,
        email: cust.email,
        address: cust.address,
        tier: cust.tier,
        notes: cust.notes
      });
    } else {
      setEditingCustomer(null);
      setCustForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        tier: 'member',
        notes: 'Khách hàng quan tâm sản phẩm trên website'
      });
    }
    setIsCustomerModalOpen(true);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custForm.name.trim()) return;

    if (editingCustomer) {
      updateCustomer(editingCustomer.id, {
        name: custForm.name,
        phone: custForm.phone,
        email: custForm.email,
        address: custForm.address,
        tier: custForm.tier,
        notes: custForm.notes
      });
    } else {
      addCustomer({
        name: custForm.name,
        phone: custForm.phone,
        email: custForm.email,
        address: custForm.address,
        tier: custForm.tier,
        interestedItemsCount: 1,
        notes: custForm.notes
      });
    }
    setIsCustomerModalOpen(false);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCatFilter !== 'all' && p.category !== productCatFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Customers
  const filteredCustomers = customers.filter((c) => {
    if (!customerSearch.trim()) return true;
    const q = customerSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  const inStockCount = products.filter((p) => p.inStock).length;
  const vipCustomersCount = customers.filter((c) => c.tier !== 'member').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Top Admin Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('store')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:border-emerald-600 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Xem Cửa Hàng</span>
              </button>

              <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  Quản Trị <span className="text-emerald-600">Arena Football</span>
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  ADMIN HUB
                </span>
              </div>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setAdminTab('products')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  adminTab === 'products'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Package className="w-4 h-4 text-emerald-600" />
                <span>Sản phẩm ({products.length})</span>
              </button>
              <button
                onClick={() => setAdminTab('customers')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  adminTab === 'customers'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Khách hàng ({customers.length})</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Tổng sản phẩm</span>
            <div className="text-2xl font-black font-mono tabular-nums text-slate-900 mt-1">
              {products.length}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Bao gồm 4 danh mục chính</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Sản phẩm còn hàng</span>
            <div className="text-2xl font-black font-mono tabular-nums text-emerald-600 mt-1">
              {inStockCount}
            </div>
            <span className="text-[11px] text-slate-400">
              Tạm hết: {products.length - inStockCount}
            </span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Hồ sơ khách hàng</span>
            <div className="text-2xl font-black font-mono tabular-nums text-slate-900 mt-1">
              {customers.length}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">{vipCustomersCount} Khách VIP</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Tổng lượt quan tâm</span>
            <div className="text-2xl font-black font-mono tabular-nums text-emerald-600 mt-1">
              {customers.reduce((acc, c) => acc + c.interestedItemsCount, 0)}
            </div>
            <span className="text-[11px] text-slate-400">Sản phẩm lưu trong giỏ</span>
          </div>
        </div>

        {/* TAB 1: PRODUCT MANAGEMENT */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Tìm tên, hãng..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                {/* Category select */}
                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value)}
                  className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="jersey">Áo đấu bóng đá</option>
                  <option value="boots">Giày đá bóng</option>
                  <option value="ball">Bóng thi đấu</option>
                  <option value="accessory">Phụ kiện sân cỏ</option>
                </select>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={resetProductsToDefault}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors"
                  title="Tải lại 20 sản phẩm mẫu ban đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Khôi phục 20 SP mẫu</span>
                </button>

                <button
                  onClick={() => openProductModal()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm sản phẩm mới</span>
                </button>
              </div>

            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Ảnh & Sản phẩm</th>
                      <th className="py-3.5 px-4">Danh mục / Hãng</th>
                      <th className="py-3.5 px-4">Giá niêm yết</th>
                      <th className="py-3.5 px-4">Size khả dụng</th>
                      <th className="py-3.5 px-4 text-center">Tình trạng</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                        
                        {/* Image & Name */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-contain object-center"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate max-w-xs">{prod.name}</p>
                              <span className="text-[10px] font-mono text-slate-400">{prod.id}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category & Brand */}
                        <td className="py-3 px-4 text-slate-600">
                          <div className="font-semibold text-slate-800">{prod.brand}</div>
                          <div className="text-[11px] text-slate-400">{prod.categoryName}</div>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <div className="font-bold font-mono tabular-nums text-slate-900">
                            {formatPrice(prod.price)}
                          </div>
                          {prod.originalPrice && prod.originalPrice > prod.price && (
                            <div className="text-[10px] text-slate-400 line-through font-mono tabular-nums">
                              {formatPrice(prod.originalPrice)}
                            </div>
                          )}
                        </td>

                        {/* Sizes */}
                        <td className="py-3 px-4 text-slate-600">
                          <div className="flex flex-wrap gap-1 max-w-[140px]">
                            {prod.sizes.map((s) => (
                              <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-[10px] font-mono rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Stock toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                              prod.inStock
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                            }`}
                            title="Bấm để đổi trạng thái kho"
                          >
                            {prod.inStock ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Còn hàng</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                                <span>Tạm hết</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Action buttons */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openProductModal(prod)}
                              className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Chỉnh sửa sản phẩm"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc chắn muốn xóa "${prod.name}"?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CUSTOMER MANAGEMENT */}
        {adminTab === 'customers' && (
          <div className="space-y-6">
            
            {/* Customer Action Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Tìm theo tên, SĐT, mã KH..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                onClick={() => openCustomerModal()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm khách hàng</span>
              </button>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Khách hàng</th>
                      <th className="py-3.5 px-4">Liên hệ</th>
                      <th className="py-3.5 px-4">Địa chỉ giao hàng</th>
                      <th className="py-3.5 px-4">Hạng VIP</th>
                      <th className="py-3.5 px-4 text-center">SP quan tâm</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-slate-50/50 transition-colors">
                        
                        {/* Name & Code */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{cust.name}</div>
                          <div className="text-[11px] font-mono text-emerald-700">{cust.code}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Tạo ngày: {cust.createdAt}</div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4 text-slate-600">
                          <div className="flex items-center gap-1.5 text-slate-800 font-mono">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>{cust.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{cust.email}</span>
                          </div>
                        </td>

                        {/* Address & Notes */}
                        <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                          <div className="flex items-start gap-1.5 text-slate-800">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                            <span className="truncate">{cust.address}</span>
                          </div>
                          {cust.notes && (
                            <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-1">
                              "{cust.notes}"
                            </p>
                          )}
                        </td>

                        {/* Tier */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-[11px] font-bold rounded ${
                              cust.tier === 'diamond'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : cust.tier === 'gold'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {cust.tier === 'diamond'
                              ? 'VIP Diamond'
                              : cust.tier === 'gold'
                              ? 'VIP Gold'
                              : 'Thành viên'}
                          </span>
                        </td>

                        {/* Interested Items Count */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px]">
                            <ShoppingBag className="w-3 h-3 text-emerald-600" />
                            <span>{cust.interestedItemsCount} SP</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openCustomerModal(cust)}
                              className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Sửa khách hàng"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc muốn xóa khách hàng "${cust.name}"?`)) {
                                  deleteCustomer(cust.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Xóa khách hàng"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* PRODUCT MODAL (Add / Edit) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm bóng đá mới'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="Ví dụ: Áo đấu Real Madrid Home 24/25"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Danh mục</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="jersey">Áo đấu bóng đá</option>
                    <option value="boots">Giày đá bóng</option>
                    <option value="ball">Bóng thi đấu</option>
                    <option value="accessory">Phụ kiện sân cỏ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Thương hiệu</label>
                  <input
                    type="text"
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    placeholder="Nike, Adidas, Puma..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Giá bán (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Giá gốc niêm yết</label>
                  <input
                    type="number"
                    value={prodForm.originalPrice}
                    onChange={(e) => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kích thước (cách nhau dấu phẩy)</label>
                  <input
                    type="text"
                    value={prodForm.sizes}
                    onChange={(e) => setProdForm({ ...prodForm, sizes: e.target.value })}
                    placeholder="S, M, L, XL hoặc 39, 40, 41"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tồn kho ban đầu</label>
                  <input
                    type="number"
                    value={prodForm.stockCount}
                    onChange={(e) => setProdForm({ ...prodForm, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mô tả sản phẩm</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  placeholder="Thông tin chi tiết về chất liệu, công nghệ thoáng khí..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={prodForm.inStock}
                  onChange={(e) => setProdForm({ ...prodForm, inStock: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <label htmlFor="inStockCheck" className="text-slate-800 font-medium">
                  Sản phẩm đang sẵn hàng phục vụ khách
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Lưu thay đổi' : 'Tạo sản phẩm'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOMER MODAL (Add / Edit) */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingCustomer ? 'Sửa thông tin khách hàng' : 'Thêm khách hàng mới'}
              </h3>
              <button
                onClick={() => setIsCustomerModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={custForm.name}
                  onChange={(e) => setCustForm({ ...custForm, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn Nam"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Số điện thoại *</label>
                  <input
                    type="text"
                    required
                    value={custForm.phone}
                    onChange={(e) => setCustForm({ ...custForm, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hạng thành viên</label>
                  <select
                    value={custForm.tier}
                    onChange={(e) => setCustForm({ ...custForm, tier: e.target.value as CustomerTier })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="member">Thành viên</option>
                    <option value="gold">VIP Gold</option>
                    <option value="diamond">VIP Diamond</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={custForm.email}
                  onChange={(e) => setCustForm({ ...custForm, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Địa chỉ giao hàng</label>
                <input
                  type="text"
                  value={custForm.address}
                  onChange={(e) => setCustForm({ ...custForm, address: e.target.value })}
                  placeholder="Số nhà, đường, quận/huyện, tỉnh thành..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ghi chú quan tâm / Tư vấn</label>
                <textarea
                  rows={2}
                  value={custForm.notes}
                  onChange={(e) => setCustForm({ ...custForm, notes: e.target.value })}
                  placeholder="Thói quen sân bóng, size áo đấu, dòng giày hay hỏi..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCustomer ? 'Lưu hồ sơ' : 'Thêm khách hàng'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
