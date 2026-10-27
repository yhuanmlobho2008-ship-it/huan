import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, Copy, MessageCircle, Info, Plus, Minus } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotalCount,
    cartTotalPrice,
    addToast
  } = useStore();

  if (!isCartOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleCopyCart = () => {
    if (cart.length === 0) return;
    const textList = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.product.name} (Size: ${item.selectedSize}) x ${item.quantity} = ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join('\n');
    const fullText = `[ĐƠN HÀNG ARENA FOOTBALL]\n${textList}\n\nTổng giá trị: ${formatPrice(
      cartTotalPrice
    )}\nSố lượng: ${cartTotalCount} món\nThời gian: ${new Date().toLocaleString('vi-VN')}`;

    navigator.clipboard.writeText(fullText);
    addToast('Đã sao chép giỏ hàng', 'Danh sách sản phẩm đã được sao chép vào bộ nhớ tạm.');
  };

  const handleContactHotline = () => {
    addToast(
      'Tư vấn viên sẵn sàng',
      'Hotline & Zalo: 0912.345.678 - Nhân viên Arena Football sẽ kiểm tra kho và giữ size cho bạn!',
      'info'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-100 animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Giỏ hàng của bạn</h3>
                <p className="text-xs text-slate-500 font-mono">
                  {cartTotalCount} sản phẩm đã chọn
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Request Compliance Notice: No checkout, only cart */}
          <div className="mx-4 mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 flex items-start gap-2.5 text-xs leading-relaxed">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Lưu ý hệ thống:</span> Website phục vụ đưa sản phẩm vào giỏ hàng và lưu trữ để tư vấn, không thu tiền hoặc xử lý cổng thanh toán trực tuyến.
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-700">Giỏ hàng đang trống</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Hãy dạo xem danh mục áo đấu, giày cỏ nhân tạo và bóng thi đấu để chọn món đồ yêu thích!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Khám phá sản phẩm
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-white rounded-xl border border-slate-200/90 hover:border-emerald-500/40 transition-all flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Xóa món này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                      <span>Size: <strong className="text-emerald-700">{item.selectedSize}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{formatPrice(item.product.price)}</span>
                    </div>

                    {/* Quantity stepper & row subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors"
                          aria-label="Giảm số lượng"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono tabular-nums text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors"
                          aria-label="Tăng số lượng"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono tabular-nums text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action buttons */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">Tổng giá trị sản phẩm:</span>
                <span className="text-lg font-black font-mono tabular-nums text-emerald-800">
                  {formatPrice(cartTotalPrice)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleCopyCart}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 hover:border-emerald-600 transition-colors shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sao chép đơn</span>
                </button>

                <button
                  onClick={handleContactHotline}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-sm shadow-emerald-600/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Tư vấn qua Zalo</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors underline"
                >
                  Xóa toàn bộ giỏ hàng
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Tiếp tục chọn thêm đồ &rarr;
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
