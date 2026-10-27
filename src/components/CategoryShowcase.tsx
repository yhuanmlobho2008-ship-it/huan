import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight, Shirt, Footprints, Disc3, ShieldAlert } from 'lucide-react';
import { ProductCategory } from '../types';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const categories: {
    id: ProductCategory;
    title: string;
    subtitle: string;
    count: number;
    image: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'jersey',
      title: 'Áo Đấu CLB & ĐTQG',
      subtitle: 'Mẫu áo mùa giải 24/25 vải dệt thoáng khí công nghệ cao',
      count: 6,
      image: '/src/assets/images/category_jersey_1793107359141.jpg',
      icon: <Shirt className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'boots',
      title: 'Giày Đá Bóng Sân Cỏ',
      subtitle: 'Đinh TF cho sân cỏ nhân tạo và FG cho sân cỏ tự nhiên',
      count: 6,
      image: '/src/assets/images/category_boots_1793107358196.jpg',
      icon: <Footprints className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'ball',
      title: 'Bóng Thi Đấu FIFA Pro',
      subtitle: 'Bóng tiêu chuẩn ngoại hạng, Cúp C1 và V-League',
      count: 4,
      image: '/src/assets/images/category_ball_1793107359402.jpg',
      icon: <Disc3 className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'accessory',
      title: 'Phụ Kiện & Đồ Bảo Hộ',
      subtitle: 'Găng tay thủ môn, bọc ống đồng carbon, tất chống trượt',
      count: 4,
      image: '/src/assets/images/category_boots_1793107358196.jpg',
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />
    }
  ];

  const handleCategoryClick = (id: ProductCategory) => {
    setSelectedCategory(id);
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              Danh mục chuyên biệt
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trang Thiết Bị Bóng Đá Toàn Diện
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Lựa chọn theo từng nhóm sản phẩm chuyên dụng để hoàn thiện trang bị trước mỗi giờ bóng lăn.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              {/* Image slot taking 60% with green tint on hover */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  {cat.icon}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-mono font-medium text-emerald-300">
                    {cat.count} Sản phẩm
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Khám phá danh mục</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
