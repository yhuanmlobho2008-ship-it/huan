import React from 'react';
import { useStore } from '../context/StoreContext';
import { Shield, Phone, Mail, MapPin, Clock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  const handleCategoryClick = (cat: any) => {
    setCurrentView('store');
    setSelectedCategory(cat);
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Wordmark & Introduction */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                ARENA<span className="text-emerald-500">.</span>VN
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ sinh thái trang thiết bị bóng đá chính hãng. Cung cấp áo đấu câu lạc bộ, giày đinh cỏ nhân tạo và bóng thi đấu tiêu chuẩn quốc tế.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Award className="w-4 h-4" />
              <span>Cam kết 100% Sản Phẩm Chính Hãng</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Danh Mục Sản Phẩm
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('jersey')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Áo đấu các câu lạc bộ & ĐTQG
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('boots')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Giày đá bóng cỏ nhân tạo (TF)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('ball')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Quả bóng thi đấu FIFA Pro
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('accessory')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Phụ kiện & Đồ bảo hộ sân cỏ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care Policy */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>· Đổi trả size tận nhà trong vòng 7 ngày</li>
              <li>· Bảo hành bung keo trọn đời sản phẩm</li>
              <li>· Hỗ trợ kiểm tra hàng trước khi nhận</li>
              <li>· Tư vấn form chân bè / chân thon miễn phí</li>
              <li>· Giỏ hàng thông minh không cần thanh toán trước</li>
            </ul>
          </div>

          {/* Col 4: Store Locations & Hotline */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Hệ Thống Sân Cỏ Arena
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Showroom 1: 58 Đường Láng, Đống Đa, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Showroom 2: 120 Hoàng Sa, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2 text-white font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Hotline: 0912.345.678 (8:00 - 22:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>support@arenafootball.vn</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & admin shortcut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Arena Football Sport. All rights reserved. Sân cỏ xanh & trắng.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('admin')}
              className="text-emerald-500 hover:text-emerald-400 font-semibold"
            >
              Khu vực Quản trị (Admin)
            </button>
            <span aria-hidden="true">·</span>
            <span>Phiên bản Việt Nam</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
