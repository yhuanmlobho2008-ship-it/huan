import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Shield, LayoutDashboard, Store } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar: React.FC = () => {
  const {
    cartTotalCount,
    setIsCartOpen,
    currentView,
    setCurrentView,
    setSelectedCategory
  } = useStore();

  const handleNavClick = (sectionId: string, category?: string) => {
    if (currentView !== 'store') {
      setCurrentView('store');
    }
    if (category) {
      setSelectedCategory(category as any);
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand wordmark (single line, no descriptor chips) */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
              <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                ARENA<span className="text-emerald-600">.</span>VN
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                Football Store
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => handleNavClick('hero')}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'store' ? 'text-slate-900' : ''
              }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
            >
              Bộ sưu tập
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
            >
              Danh mục
            </button>
            <button
              onClick={() => handleNavClick('quality')}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
            >
              Cam kết chính hãng
            </button>
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'admin' ? 'text-emerald-700 font-bold' : 'hover:text-emerald-700'
              }`}
            >
              {currentView === 'admin' ? (
                <>
                  <Store className="w-4 h-4 text-emerald-600" />
                  <span>Về cửa hàng</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span>Trang quản trị</span>
                </>
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Action & Interactive Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Notification Dropdown */}
            <NotificationDropdown />

            {/* Mobile Admin toggle */}
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
              className="md:hidden p-2.5 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              title={currentView === 'admin' ? 'Cửa hàng' : 'Quản trị'}
            >
              {currentView === 'admin' ? <Store className="w-5 h-5 text-emerald-600" /> : <LayoutDashboard className="w-5 h-5 text-emerald-600" />}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 active:scale-95 transition-all whitespace-nowrap shrink-0"
              aria-label="Mở giỏ hàng"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] font-bold text-emerald-800 bg-white rounded-full tabular-nums">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Giỏ hàng</span>
              {cartTotalCount > 0 && (
                <span className="hidden sm:inline font-mono text-xs text-emerald-100 tabular-nums border-l border-emerald-500/50 pl-2">
                  ({cartTotalCount})
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
