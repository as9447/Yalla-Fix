import React, { useState } from 'react';
import { MaintenanceOrder, Technician } from '../data/yallaFixData';
import {
  Wrench,
  Star,
  DollarSign,
  CheckCircle2,
  Phone,
  MapPin,
  Mic,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface TechnicianPortalViewProps {
  orders: MaintenanceOrder[];
  technician: Technician;
  onAcceptAndMove: (orderId: string) => void;
  onCompleteOrder: (orderId: string) => void;
  onSwitchToCustomer: () => void;
}

export const TechnicianPortalView: React.FC<TechnicianPortalViewProps> = ({
  orders,
  technician,
  onAcceptAndMove,
  onCompleteOrder,
  onSwitchToCustomer,
}) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [playingAudio, setPlayingAudio] = useState<boolean>(false);

  // Active technician orders (e.g. pending, on_the_way, in_progress)
  const activeOrders = orders.filter(
    (o) => o.status !== 'completed'
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Technician Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-amber-500/20">
              <Wrench className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-normal no-underline">{technician.title}</h2>
              <span className="text-xs text-slate-500 font-semibold">
                {technician.specialty} • معتمد من منصة يلا فيكس
              </span>
            </div>
          </div>

          {/* Availability Toggle Switch */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-700">
              {isAvailable ? 'متاح للعمل' : 'غير متاح'}
            </span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                isAvailable ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  isAvailable ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 3 Metrics: Earnings, Orders, Rating */}
        <div className="grid grid-cols-3 gap-3 text-center pt-2 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50/80 rounded-2xl">
            <strong className="text-lg sm:text-xl font-extrabold text-emerald-600 block">
              {technician.earnings.toFixed(1)} ج.م
            </strong>
            <span className="text-xs text-slate-500 font-semibold">الأرباح</span>
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-2xl">
            <strong className="text-lg sm:text-xl font-extrabold text-slate-900 block">
              {technician.completedOrders}
            </strong>
            <span className="text-xs text-slate-500 font-semibold">طلب مكتمل</span>
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-2xl">
            <strong className="text-lg sm:text-xl font-extrabold text-amber-500 flex items-center justify-center gap-1">
              <span>{technician.rating}</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </strong>
            <span className="text-xs text-slate-500 font-semibold">التقييم</span>
          </div>
        </div>
      </div>

      {/* Switch Back to Customer View & Current Orders Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          طلبات الصيانة الحالية ({activeOrders.length})
        </h3>

        <button
          onClick={onSwitchToCustomer}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>الرجوع كعميل</span>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>

      {/* Technician Orders List */}
      <div className="space-y-4">
        {activeOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono font-bold text-slate-900">
                طلب #{order.code}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full font-bold ${
                  order.status === 'in_progress'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {order.status === 'in_progress' ? 'جاري التصليح' : 'قيد المراجعة'}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">
                  العميل: {order.customerName} ({order.customerPhone})
                </span>
                <a
                  href={`tel:${order.customerPhone}`}
                  className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-lg flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>اتصال</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {order.description}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{order.address}</span>
              </div>
            </div>

            {/* If In Progress: Audio Recording & Finish Repair */}
            {order.status === 'in_progress' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                    <Mic className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span>التسجيل الصوتي لجلسة الصيانة</span>
                  </div>
                  <span className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    00:18
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 bg-blue-50/70 p-2.5 rounded-xl border border-blue-100 flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    بدأ التسجيل تلقائياً عند بدء التصليح لضمان الجودة وحفظ حقوق العميل والصنايعي.
                  </span>
                </div>

                {/* Sound wave */}
                <div className="bg-slate-900 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1 flex-1 overflow-hidden h-6">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full ${
                          playingAudio ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'
                        }`}
                        style={{ height: playingAudio ? `${(i % 4) * 4 + 8}px` : '4px' }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setPlayingAudio(!playingAudio)}
                    className="text-xs text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>تشغيل التسجيل الصوتي السابق</span>
                  </button>
                </div>

                <button
                  onClick={() => onCompleteOrder(order.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>إنهاء الصيانة واستلام الحساب ✅ ({order.cost} ج.م)</span>
                </button>
              </div>
            )}

            {/* If Pending: Accept and Move Button */}
            {order.status === 'pending' && (
              <button
                onClick={() => onAcceptAndMove(order.id)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <span>قبول والتحرك إلى العميل 🛵</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
