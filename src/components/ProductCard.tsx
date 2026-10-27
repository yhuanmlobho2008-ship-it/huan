import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForModal } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Chuẩn');
  const [imageError, setImageError] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, selectedSize, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  return (
    <div
      onClick={() => setSelectedProductForModal(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Slot (Takes 65% height, uniform neutral backdrop) */}
      <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden flex items-center justify-center p-3">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 text-emerald-800 p-4 text-center">
            <span className="text-xs font-semibold">{product.brand}</span>
            <span className="text-sm font-bold mt-1 text-slate-800">{product.name}</span>
          </div>
        )}

        {/* Quick View Button on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-emerald-700 hover:bg-white shadow-md flex items-center justify-center transition-colors"
            title="Xem chi tiết"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quiet in-stock status indicator */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-md shadow">
              Tạm hết hàng
            </span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Brand / Category (Clean unboxed text with · separator) */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <div className="flex items-center gap-1.5 font-medium uppercase tracking-wider text-[11px] text-emerald-700">
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 lowercase first-letter:uppercase">{product.categoryName}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-700 font-mono text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Sizes Selector Preview */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] font-medium text-slate-400 mr-1">Size:</span>
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-0.5 text-[11px] font-medium rounded border transition-colors ${
                  selectedSize === size
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-slate-400 font-mono">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-bold font-mono tabular-nums text-slate-900">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through font-mono tabular-nums">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAddedRecently
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-sm shadow-emerald-600/20'
            }`}
            title="Thêm vào giỏ hàng"
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Vào giỏ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
