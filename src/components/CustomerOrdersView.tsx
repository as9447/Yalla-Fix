import React, { useState, useEffect } from 'react';
import { MaintenanceOrder } from '../data/yallaFixData';
import {
  Navigation,
  Phone,
  Mic,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Star,
  Check,
} from 'lucide-react';

interface CustomerOrdersViewProps {
  orders: MaintenanceOrder[];
  onCompleteOrder: (orderId: string) => void;
  onSimulateArrival: (orderId: string) => void;
}

export const CustomerOrdersView: React.FC<CustomerOrdersViewProps> = ({
  orders,
  onCompleteOrder,
  onSimulateArrival,
}) => {
  const [activeStatusTab, setActiveStatusTab] = useState<'all' | 'on_the_way' | 'in_progress' | 'completed'>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activeRatingOrderId, setActiveRatingOrderId] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState<number>(5);

  const filterTabs = [
    { id: 'all', label: 'الكل' },
    { id: 'on_the_way', label: 'في الطريق والوصول 🛵' },
    { id: 'in_progress', label: 'جاري التصليح 🛠️' },
    { id: 'completed', label: 'مكتملة ✅' },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeStatusTab === 'all') return true;
    return order.status === activeStatusTab;
  });

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Title & Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-center sm:text-right">
          طلبات الصيانة والتتبع اللحظي
        </h2>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeStatusTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStatusTab(tab.id as any)}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-base mb-1">لا توجد طلبات في هذا التبويب</h3>
            <p className="text-xs text-slate-400">
              يمكنك طلب صيانة جديدة من الصفحة الرئيسية بضغطة زر واحدة.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isAudioPlaying = playingAudioId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4 transition-all"
              >
                {/* Header: Request ID, Status Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                    طلب #{order.code}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      order.status === 'on_the_way'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'in_progress'
                        ? 'bg-purple-100 text-purple-800'
                        : order.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {order.statusText}
                  </span>
                </div>

                {/* Technician & Job Info */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 leading-normal no-underline">
                    {order.specialty} • الفني: {order.technicianName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {order.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{order.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{order.timeLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Widget 1: Live GPS Tracking (When status is on_the_way) */}
                {order.status === 'on_the_way' && (
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-blue-200/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                        <span className="font-bold text-xs text-slate-900">
                          تتبع لايف لموقع الفني 🛵
                        </span>
                      </div>

                      <span className="bg-sky-100 text-sky-800 text-xs px-3 py-1 rounded-full font-bold">
                        {order.etaMinutes > 0 ? `متبقي ${order.etaMinutes} دقائق` : 'وصل الفني الآن! 🎉'}
                      </span>
                    </div>

                    {/* Interactive GPS Track Schematic Map */}
                    <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between overflow-hidden shadow-xs">
                      <div className="relative">
                        <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping" />
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/30 relative z-10">
                          🛵
                        </div>
                      </div>

                      <div className="flex-1 mx-4 flex flex-col items-center">
                        <span className="text-[11px] font-bold text-blue-700 bg-white/90 border border-blue-100 px-2.5 py-0.5 rounded-full mb-1 shadow-xs">
                          المسافة المتبقية: {order.distanceKm} كم
                        </span>
                        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 animate-gradient-flow"
                            style={{
                              width: `${Math.min(100, Math.max(10, 100 - (order.distanceKm / 1.5) * 100))}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25">
                        <MapPin className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="text-[11px] text-blue-600 font-semibold text-center flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>يتم تحديث موقع الصنايعي لحظياً عبر GPS</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                      <button
                        onClick={() => onSimulateArrival(order.id)}
                        className="w-full sm:flex-1 py-2.5 px-3 border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>محاكاة وصول الفني 📍</span>
                      </button>

                      <a
                        href={`tel:${order.technicianPhone}`}
                        className="w-full sm:flex-1 py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>اتصال بالفني ({order.technicianPhone})</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Sub-Widget 2: Live Audio Recording (When status is in_progress) */}
                {order.status === 'in_progress' && (
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-purple-200/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-xs sm:text-sm">
                        <Mic className="w-4 h-4 text-blue-600 animate-pulse" />
                        <span>التسجيل الصوتي لجلسة الصيانة 🎙️</span>
                      </div>

                      <span className="font-mono bg-white border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-800">
                        {formatTimer(order.audioRecordingSeconds)}
                      </span>
                    </div>

                    {/* Security Banner */}
                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-slate-700 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        بدأ التسجيل تلقائياً عند بدء التصليح لضمان الجودة وحفظ حقوق العميل والصنايعي.
                      </span>
                    </div>

                    {/* Audio Waveform visualization */}
                    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-3.5 rounded-2xl flex items-center justify-between gap-3 border border-slate-800 shadow-inner">
                      <div className="flex items-center gap-1.5 flex-1 h-9 overflow-hidden px-1">
                        {[...Array(32)].map((_, i) => {
                          const barColors = [
                            'from-blue-500 via-sky-400 to-indigo-400',
                            'from-indigo-500 via-purple-400 to-pink-400',
                            'from-purple-500 via-pink-400 to-rose-400',
                            'from-pink-500 via-rose-400 to-amber-400',
                            'from-amber-500 via-yellow-400 to-emerald-400',
                            'from-emerald-500 via-teal-400 to-sky-400',
                          ];
                          const color = barColors[i % barColors.length];
                          const delay = (i % 8) * 0.12;
                          return (
                            <div
                              key={i}
                              className={`w-1.5 rounded-full bg-gradient-to-t ${color} transition-all duration-200 shadow-sm ${
                                isAudioPlaying || order.status === 'in_progress' ? 'animate-wave-bar opacity-100' : 'opacity-50'
                              }`}
                              style={{
                                height: `${Math.max(8, ((i * 7) % 22) + 6)}px`,
                                animationDelay: `${delay}s`,
                              }}
                            />
                          );
                        })}
                      </div>

                      <button
                        onClick={() =>
                          setPlayingAudioId(isAudioPlaying ? null : order.id)
                        }
                        className="py-2 px-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-blue-500/25 active:scale-95 shrink-0"
                      >
                        {isAudioPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>إيقاف</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>تشغيل التسجيل الصوتي السابق</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Finish Repair Button */}
                    <button
                      onClick={() => {
                        onCompleteOrder(order.id);
                        setActiveRatingOrderId(order.id);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>إنهاء الصيانة ✅ )</span>
                    </button>
                  </div>
                )}

                {/* Sub-Widget 3: Completed Order with Audio Archive */}
                {order.status === 'completed' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>التسجيل الصوتي المحفوظ:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {formatTimer(order.audioRecordingSeconds)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>إجمالي الحساب المدفوع:</span>
                      <strong className="text-emerald-700 text-sm font-bold">
                        {order.cost} ج.م (شامل الضمان)
                      </strong>
                    </div>

                    <a
                      href={`tel:${order.technicianPhone}`}
                      className="block text-center py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700"
                    >
                      اتصال بالفني ({order.technicianPhone})
                    </a>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Customer Rating Modal */}
      {activeRatingOrderId && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveRatingOrderId(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">تم إنهاء الصيانة بنجاح!</h3>
              <p className="text-xs text-slate-500 mt-1">
                كيف كانت تجربتك مع الفني وجودة أعمال الصيانة المنفذة؟
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingStars(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= ratingStars
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveRatingOrderId(null)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              إرسال التقييم وحفظ الضمان
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
