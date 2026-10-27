import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, RefreshCw, Zap, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const scrollToCatalog = (cat?: string) => {
    if (cat) {
      setSelectedCategory(cat as any);
    }
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Stadium Photo with Deep Emerald Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_football_pitch_1793107358356.jpg"
          alt="Sân vận động bóng đá Arena"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-emerald-950/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          {/* Subtle text kicker without pill boxes */}
          <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4">
            <span>Sân Cỏ Xanh 2026</span>
            <span aria-hidden="true">·</span>
            <span>Trang Phục & Giày Đá Bóng Chính Hãng</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] text-balance">
            Bứt Phá Mọi Giới Hạn Trên <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-wavy underline-offset-8">Sân Cỏ</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-balance">
            Tuyển tập 20+ trang thiết bị bóng đá đỉnh cao: áo đấu các câu lạc bộ danh tiếng, giày cỏ nhân tạo TF bám sân, bóng thi đấu đạt chuẩn FIFA Quality Pro và phụ kiện bảo hộ chuyên nghiệp.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToCatalog('all')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 whitespace-nowrap shrink-0"
            >
              <span>Xem 20 sản phẩm ngay</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => scrollToCatalog('boots')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all whitespace-nowrap shrink-0"
            >
              Giày đinh cỏ nhân tạo TF
            </button>
          </div>
        </div>
      </div>

      {/* Full-width 4-column trust strip below hero */}
      <div className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">100% Chính Hãng</p>
                <p className="text-xs text-slate-400">Cam kết chuẩn hãng đền 200%</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Đổi Size 7 Ngày</p>
                <p className="text-xs text-slate-400">Đổi trả tận nhà không lo lệch form</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Giao Hàng 2H Siêu Tốc</p>
                <p className="text-xs text-slate-400">Nội thành Hà Nội & TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Bảo Hành Keo 365 Ngày</p>
                <p className="text-xs text-slate-400">Đồng hành trọn vẹn mọi trận cầu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
