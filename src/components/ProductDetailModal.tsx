import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    setIsCartOpen
  } = useStore();

  const product = selectedProductForModal;
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAdd = () => {
    if (!product.inStock) return;
    addToCart(product, selectedSize || product.sizes[0], quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setSelectedProductForModal(null);
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-slate-100 backdrop-blur text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image showcase */}
          <div className="md:col-span-5 bg-slate-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-72 w-full object-contain object-center"
              referrerPolicy="no-referrer"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-3 py-1 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-md">
                  Tạm hết hàng
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-bold text-emerald-700 uppercase tracking-wider">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryName}</span>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1 text-slate-700 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Product Name */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black font-mono tabular-nums text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-2">
                  <span>Chọn kích thước (Size):</span>
                  <span className="text-slate-400 font-normal">Được thử size khi giao</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        selectedSize === s
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/20'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-900">Số lượng:</span>
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold font-mono tabular-nums text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              {/* Reminder banner: No payment, only cart as required */}
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-800 mb-3 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Sản phẩm được lưu vào giỏ hàng để bạn lựa chọn và kiểm tra. Không yêu cầu thanh toán trực tuyến!
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    !product.inStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-600/25'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Đã thêm vào giỏ!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Thêm vào giỏ hàng</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Chính hãng</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đổi trả 7 ngày</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Giao toàn quốc</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
