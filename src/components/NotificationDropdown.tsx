import React, { useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Bell, Check, Sparkles, Tag, ShieldCheck, Box } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
  const {
    notifications,
    isNotificationOpen,
    setIsNotificationOpen,
    markNotificationAsRead,
    markAllNotificationsRead
  } = useStore();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen, setIsNotificationOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'promo':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      case 'stock':
        return <Box className="w-4 h-4 text-emerald-600" />;
      case 'order':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        className="relative p-2.5 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        title="Thông báo hệ thống"
        aria-label="Thông báo"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-emerald-600 rounded-full tabular-nums shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Thông báo cửa hàng</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {unreadCount > 0 ? `Có ${unreadCount} thông báo chưa đọc` : 'Tất cả đã đọc'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Đọc tất cả
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">Chưa có thông báo nào.</div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-slate-50 ${
                    !item.read ? 'bg-emerald-50/40' : 'bg-white'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-emerald-100/70 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-semibold truncate ${!item.read ? 'text-slate-900' : 'text-slate-700'}`}>
                        {item.title}
                      </p>
                      <span className="text-[11px] text-slate-400 shrink-0">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500">Arena Football · Cập nhật liên tục 24/7</span>
          </div>
        </div>
      )}
    </div>
  );
};
