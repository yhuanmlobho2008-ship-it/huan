import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminView } from './components/AdminView';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { ShieldCheck, Truck, Clock, RefreshCw, Trophy, ArrowRight } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, setCurrentView } = useStore();

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <AdminView />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Landing Page: Hero section */}
        <HeroSection />

        {/* Category Spotlights */}
        <CategoryShowcase />

        {/* 20 Products Catalog & Filtering */}
        <ProductCatalog />

        {/* Quality & Craftsmanship Assurance Section */}
        <section id="quality" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6">
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Cam kết chất lượng
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight text-balance">
                  Vì Sao Hơn 50.000 Cầu Thủ Phong Trào Lựa Chọn Arena Football?
                </h2>
                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed text-balance">
                  Chúng tôi hiểu rằng mỗi đôi giày đinh bám sân tốt, mỗi chiếc áo đấu thoáng khí hay quả bóng bay đầm chân chính là chìa khóa thăng hoa trong từng pha tranh chấp trên sân cỏ.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">100% Nguồn Gốc Rõ Ràng</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Tất cả các mã sản phẩm từ Nike, Adidas, Puma, Mizuno đều có tem code và hóa đơn xác thực.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Chính Sách Thử Size Tận Sân</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Shipper hỗ trợ mang 2 size liền kề để quý khách ướm thử chân thoải mái trước khi nhận hàng.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Bảo Hành Bung Keo Trọn Mùa</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Miễn phí khâu đế, dán keo nhiệt chuyên dụng cho mọi đôi giày trong suốt 365 ngày sử dụng.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-800/60 flex items-center gap-4">
                  <button
                    onClick={() => {
                      const catalog = document.getElementById('catalog');
                      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>Chọn trang bị ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="px-5 py-3 rounded-xl border border-emerald-700 hover:bg-emerald-900/60 text-emerald-200 text-xs font-semibold transition-all"
                  >
                    Xem cổng quản trị
                  </button>
                </div>
              </div>

              {/* Right Col: Stadium Card presentation */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden border border-emerald-600/30 shadow-2xl bg-emerald-900/40 p-2">
                  <img
                    src="/src/assets/images/hero_football_pitch_1793107358356.jpg"
                    alt="Sân vận động Arena"
                    className="rounded-2xl w-full h-80 sm:h-96 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest">
                        ARENA FOOTBALL ARENA
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold mt-1">
                        Sân Cỏ Của Đam Mê & Bản Lĩnh Thi Đấu
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-md">
                        Mỗi tuần phục vụ hơn 5.000 lượt đặt đồ thể thao cho các giải bóng đá phủi và giải doanh nghiệp.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
