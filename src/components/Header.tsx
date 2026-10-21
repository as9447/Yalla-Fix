import React from 'react';
import { User } from 'firebase/auth';
import { motion } from 'motion/react';
import brandLogo from '../assets/images/regenerated_image_1792588295074.x-icon';
import {
  Home,
  Clock,
  Heart,
  User as UserIcon,
  Wrench,
  Presentation,
  Share2,
  Check,
  LogOut,
  Bell,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onOpenSlidesModal: () => void;
  isLoggingIn: boolean;
  activeOrdersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogin,
  onLogout,
  onOpenSlidesModal,
  isLoggingIn,
  activeOrdersCount,
}) => {
  const [copiedShareLink, setCopiedShareLink] = React.useState(false);

  const mainTabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'orders', label: 'طلباتي والتتبع', icon: Clock, badge: activeOrdersCount > 0 ? activeOrdersCount : undefined },
    { id: 'marketing-study', label: 'دراسة الجدوى والتسويق 📊', icon: Presentation, isStudy: true },
    { id: 'technician', label: 'بوابة الفنيين', icon: Wrench },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'profile', label: 'حسابي', icon: UserIcon },
  ];

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: 'يلا فيكس (Yalla-Fix) - خدماتك في إيديك',
      text: 'منصة صيانة المنازل الذكية في مصر: سباكة، نجارة، كهرباء، تكييف مع دراسة الجدوى وتصدير Slides:',
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2500);
    } catch {
      // Ignored
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs relative" dir="rtl">
      {/* Animated Rainbow / Gradient Top Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-500 via-pink-500 via-amber-400 via-emerald-400 to-blue-600 animate-gradient-flow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between py-2.5 sm:py-3 gap-2">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <motion.div
              whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('home')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 flex items-center justify-center text-white shadow-md shadow-blue-500/25 overflow-hidden cursor-pointer shrink-0 relative group"
            >
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-white">
                <img
                  src={brandLogo}
                  alt="Yalla-Fix"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>

            <div onClick={() => setActiveTab('home')} className="cursor-pointer">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-none no-underline">
                  Yalla-Fix
                </span>
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-amber-400 text-lg sm:text-xl leading-none inline-block drop-shadow-xs"
                >
                  ★
                </motion.span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5 leading-none flex items-center gap-1">
                <span>خدماتك في إيديك</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Direct Study Button (Vibrant Purple Glow) */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('marketing-study')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer relative overflow-hidden ${
                activeTab === 'marketing-study'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-400/50'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs'
              }`}
              title="فتح دراسة الجدوى والتسويق"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 animate-pulse" />
              <span className="whitespace-nowrap">دراسة الجدوى 📊</span>
            </motion.button>

            {/* Google Slides Export Button (Vibrant Amber / Orange Gradient) */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenSlidesModal}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-md shadow-amber-500/25 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              title="تصدير العرض التقديمي إلى Google Slides"
            >
              <Presentation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Google Slides</span>
            </motion.button>

            {/* Share Public Link */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-1.5 sm:px-2.5 sm:py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="مشاركة رابط الموقع"
            >
              {copiedShareLink ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4 text-blue-600" />
              )}
            </motion.button>

            {/* Notification Bell with Animated Ripple Badge */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('orders')}
              className="relative p-1.5 sm:p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
              title="الطلبات النشطة"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {activeOrdersCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
              )}
            </motion.button>

            {/* Auth Indicator */}
            {user ? (
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-5 h-5 rounded-full border border-blue-400"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                )}
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-500 p-0.5"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                disabled={isLoggingIn}
                className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-2 py-1.5 rounded-xl"
              >
                <span>Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 no-underline relative ${
                  isActive
                    ? tab.isStudy
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 ring-2 ring-purple-300'
                      : 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/25'
                    : tab.isStudy
                    ? 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="no-underline">{tab.label}</span>
                {tab.badge && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
