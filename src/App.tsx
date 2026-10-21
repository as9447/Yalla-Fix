import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { initAuth, googleSignIn, logout } from './services/firebase';
import {
  INITIAL_TECHNICIANS,
  INITIAL_ORDERS,
  Technician,
  MaintenanceOrder,
} from './data/yallaFixData';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { CustomerHomeView } from './components/CustomerHomeView';
import { CustomerOrdersView } from './components/CustomerOrdersView';
import { TechnicianPortalView } from './components/TechnicianPortalView';
import { CustomerProfileView } from './components/CustomerProfileView';
import { FavoritesView } from './components/FavoritesView';
import { ExecutiveStudyView } from './components/ExecutiveStudyView';
import { MarketGapSurvey } from './components/MarketGapSurvey';
import { TargetSegmentation } from './components/TargetSegmentation';
import { VoiceToneGuide } from './components/VoiceToneGuide';
import { YallaFixScreensGallery } from './components/YallaFixScreensGallery';
import { SlideDeckViewer } from './components/SlideDeckViewer';
import { GoogleSlidesModal } from './components/GoogleSlidesModal';
import {
  Presentation,
  BookOpen,
  PieChart,
  Users,
  MessageSquare,
  Smartphone,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [studySubTab, setStudySubTab] = useState<string>('executive');
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isSlidesModalOpen, setIsSlidesModalOpen] = useState<boolean>(false);

  // Core application state
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [orders, setOrders] = useState<MaintenanceOrder[]>(INITIAL_ORDERS);
  const [favorites, setFavorites] = useState<string[]>(['tech-1', 'tech-3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio timer ticker for in-progress orders
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((o) => {
          if (o.status === 'in_progress') {
            return {
              ...o,
              audioRecordingSeconds: o.audioRecordingSeconds + 1,
            };
          }
          return o;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        showToast('تم تسجيل الدخول بنجاح عبر حساب Google!');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      showToast(err.message || 'فشل تسجيل الدخول.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      showToast('تم تسجيل الخروج بنجاح.');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleToggleFavorite = (techId: string) => {
    setFavorites((prev) => {
      if (prev.includes(techId)) {
        showToast('تمت الإزالة من المفضلة');
        return prev.filter((id) => id !== techId);
      } else {
        showToast('تمت الإضافة إلى المفضلة ❤️');
        return [...prev, techId];
      }
    });
  };

  const handleRequestBooking = (
    tech: Technician,
    problemDesc: string,
    address: string,
    isUrgent: boolean
  ) => {
    const newCodeNum = 105 + orders.length;
    const newOrder: MaintenanceOrder = {
      id: `req-${newCodeNum}`,
      code: `REQ-${newCodeNum}`,
      customerName: 'أحمد رضوان',
      customerPhone: '01011223344',
      technicianId: tech.id,
      technicianName: tech.name,
      technicianPhone: tech.phone,
      specialty: tech.specialty,
      description: problemDesc,
      address: address,
      area: tech.area,
      status: 'on_the_way',
      statusText: 'في الطريق إليك 🛵',
      timeLabel: isUrgent ? 'عاجل الآن (خلال دقائق)' : 'موعد محدد',
      etaMinutes: 7,
      distanceKm: 1.2,
      audioRecordingSeconds: 0,
      isAudioRecordingActive: false,
      cost: tech.hourlyRate,
      createdAt: 'الآن',
    };

    setOrders([newOrder, ...orders]);
    setActiveTab('orders');
    showToast(`تم إرسال طلب الصيانة #${newOrder.code} إلى ${tech.title}!`);
  };

  const handleSimulateArrival = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'in_progress',
            statusText: 'بدأ التصليح 🛠️',
            distanceKm: 0,
            etaMinutes: 0,
            audioRecordingSeconds: 1,
            isAudioRecordingActive: true,
          };
        }
        return o;
      })
    );
    showToast('وصل الفني! بدأ التسجيل الصوتي لجلسة الصيانة تلقائياً 🎙️');
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'completed',
            statusText: 'مكتمل ✅',
            isAudioRecordingActive: false,
          };
        }
        return o;
      })
    );
    showToast('تم إنهاء الصيانة واستلام الحساب وحفظ الضمان ✅');
  };

  const handleAcceptAndMove = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'on_the_way',
            statusText: 'في الطريق إليك 🛵',
            etaMinutes: 7,
            distanceKm: 1.2,
          };
        }
        return o;
      })
    );
    showToast('تم قبول الطلب! الصنايعي في الطريق إلى العميل 🛵');
  };

  const activeOrdersCount = orders.filter((o) => o.status !== 'completed').length;
  const currentTech = technicians[0]; // Ahmed Abdel Salam

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-20 sm:pb-8 relative overflow-hidden" dir="rtl">
      {/* Floating Dynamic Colorful Ambient Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400/20 via-cyan-400/15 to-indigo-400/10 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400/15 via-pink-400/15 to-amber-300/10 blur-3xl animate-float-slow-reverse" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tl from-emerald-400/15 via-teal-400/15 to-sky-300/10 blur-3xl animate-pulse-glow" />
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Website Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenSlidesModal={() => setIsSlidesModalOpen(true)}
        isLoggingIn={isLoggingIn}
        activeOrdersCount={activeOrdersCount}
      />

      {/* Main Website Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* VIEW 1: Customer Home (Browse & Request) */}
            {activeTab === 'home' && (
              <CustomerHomeView
                technicians={technicians}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onRequestBooking={handleRequestBooking}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            )}

            {/* VIEW 2: Customer Orders & Live Tracking */}
            {activeTab === 'orders' && (
              <CustomerOrdersView
                orders={orders}
                onCompleteOrder={handleCompleteOrder}
                onSimulateArrival={handleSimulateArrival}
              />
            )}

            {/* VIEW 3: Technician / Craftsman Portal */}
            {activeTab === 'technician' && (
              <TechnicianPortalView
                orders={orders}
                technician={currentTech}
                onAcceptAndMove={handleAcceptAndMove}
                onCompleteOrder={handleCompleteOrder}
                onSwitchToCustomer={() => setActiveTab('home')}
              />
            )}

            {/* VIEW 4: Favorites */}
            {activeTab === 'favorites' && (
              <FavoritesView
                technicians={technicians}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onRequestBooking={(tech) => {
                  setActiveTab('home');
                  showToast(`تم اختيار الفني ${tech.name}، اضغط إرسال طلب.`);
                }}
              />
            )}

            {/* VIEW 5: Customer Profile */}
            {activeTab === 'profile' && (
              <CustomerProfileView
                onSwitchToTechnician={() => setActiveTab('technician')}
                onOpenStudy={() => setActiveTab('marketing-study')}
              />
            )}

            {/* VIEW 6: Full Marketing Study & Google Slides Deck Suite */}
            {activeTab === 'marketing-study' && (
              <div className="space-y-6">
                {/* Top Study Navigation Bar */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                    {[
                      { id: 'executive', label: 'ملخص دراسة الجدوى', icon: BookOpen },
                      { id: 'gap-survey', label: 'الفجوة والاستبيان', icon: PieChart },
                      { id: 'segmentation', label: 'الفئات المستهدفة', icon: Users },
                      { id: 'tone-voice', label: 'لغة الخطاب', icon: MessageSquare },
                      { id: 'app-screens', label: 'تحليل الشاشات', icon: Smartphone },
                      { id: 'slide-deck', label: 'عارض الشرائح 9 Deck', icon: Presentation },
                    ].map((sub) => {
                      const Icon = sub.icon;
                      const isCurrent = studySubTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setStudySubTab(sub.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                            isCurrent
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setIsSlidesModalOpen(true)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/25 transition-all"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>تصدير Google Slides ↗</span>
                  </button>
                </div>

                {studySubTab === 'executive' && (
                  <ExecutiveStudyView onNavigateTab={(tabId) => setStudySubTab(tabId)} />
                )}
                {studySubTab === 'gap-survey' && <MarketGapSurvey />}
                {studySubTab === 'segmentation' && <TargetSegmentation />}
                {studySubTab === 'tone-voice' && <VoiceToneGuide />}
                {studySubTab === 'app-screens' && <YallaFixScreensGallery />}
                {studySubTab === 'slide-deck' && (
                  <SlideDeckViewer onOpenGoogleSlidesModal={() => setIsSlidesModalOpen(true)} />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Google Slides Export Modal */}
      <GoogleSlidesModal
        isOpen={isSlidesModalOpen}
        onClose={() => setIsSlidesModalOpen(false)}
        user={user}
        onUserLoginSuccess={(loggedInUser, token) => {
          setUser(loggedInUser);
          setAccessToken(token);
        }}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ordersBadge={activeOrdersCount}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-slate-500 text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-600">يلا فيكس Yalla-Fix ★</span>
            <span>—</span>
            <span>المنصة الرائدة لخدمات الصيانة المنزلية الذكية في مصر (خدماتك في إيديك)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('marketing-study')}
              className="text-purple-600 hover:text-purple-700 font-bold"
            >
              دراسة الجدوى والتسويق 📊
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSlidesModalOpen(true)}
              className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>تصدير Google Slides</span>
            </button>
            <span>•</span>
            <span className="text-slate-400">القاهرة 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
