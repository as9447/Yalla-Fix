import React, { useState } from 'react';
import {
  User as UserIcon,
  MapPin,
  Wrench,
  ChevronLeft,
  LifeBuoy,
  ShieldCheck,
  LogOut,
  RefreshCw,
  X,
  Check,
} from 'lucide-react';

interface CustomerProfileViewProps {
  onSwitchToTechnician: () => void;
  onOpenStudy: () => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({
  onSwitchToTechnician,
  onOpenStudy,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const savedAddresses = [
    { title: 'المنزل الرئيسي', address: 'شارع النصر، المعادي، عمارة 14، الدور الثالث' },
    { title: 'شقة العائلة', address: 'شارع التسعين الشمالي، التجمع الخامس' },
    { title: 'العيادة / المكتب', address: 'شارع النزهة، مصر الجديدة' },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto" dir="rtl">
      {/* Title */}
      <h2 className="text-xl font-bold text-slate-900 text-center sm:text-right">
        حسابي الشخصي
      </h2>

      {/* User Info Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
          <UserIcon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">أحمد رضوان</h3>
          <span className="text-xs text-blue-600 font-semibold block mb-0.5">عميل مسجل</span>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>القاهرة - مدينة نصر</span>
          </div>
        </div>
      </div>

      {/* Yellow Highlight Card: Become a Craftsman */}
      <div
        onClick={onSwitchToTechnician}
        className="bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-3xl p-5 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              هل أنت فني أو صنايعي؟
            </h4>
            <p className="text-xs text-slate-600">
              انتقل إلى بوابة الفنيين واستقبل طلبات الصيانة وأرباحك فورية
            </p>
          </div>
        </div>
        <ChevronLeft className="w-5 h-5 text-amber-700 shrink-0" />
      </div>

      {/* Options List */}
      <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-xs divide-y divide-slate-100 text-xs sm:text-sm">
        {/* Saved Addresses */}
        <button
          onClick={() => setActiveModal('addresses')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">العناوين المحفوظة</span>
              <span className="text-xs text-slate-500">إدارة عناوين منزلك وعملك لسهولة الطلب</span>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        {/* Marketing Feasibility Study Access */}
        <button
          onClick={onOpenStudy}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">
                دراسة الجدوى والتسويق (Yalla-Fix Deck) 📊
              </span>
              <span className="text-xs text-slate-500">
                استعراض الدراسة التسويقية الكاملة وتصدير شرائح Google Slides
              </span>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        {/* Support Center */}
        <button
          onClick={() => setActiveModal('support')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">مركز المساعدة والدعم الفني</span>
              <span className="text-xs text-slate-500">تواصل مع فريق يلا فيكس لحل أي مشكلة</span>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        {/* Warranty & Privacy */}
        <button
          onClick={() => setActiveModal('policy')}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">سياسة الخصوصية وضمان الصيانة</span>
              <span className="text-xs text-slate-500">شروط الخدمة وضمان جودة الأعمال وحفظ التسجيل</span>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Modal: Saved Addresses */}
      {activeModal === 'addresses' && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-slate-900 text-base mb-4">العناوين المحفوظة</h3>
            <div className="space-y-3">
              {savedAddresses.map((addr, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <strong className="text-slate-900 block mb-0.5">{addr.title}</strong>
                  <span className="text-slate-600">{addr.address}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Support */}
      {activeModal === 'support' && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl relative text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <LifeBuoy className="w-12 h-12 text-blue-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">مركز الدعم والمساعدة - يلا فيكس</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              فريق خدمة عملاء يلا فيكس في خدمتك على مدار الساعة في القاهرة لضمان سرعة تلبية طلبات الصيانة وحل أي شكاوى.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl font-mono text-sm font-bold text-slate-800">
              الخط الساخن: 19850 (أو واتساب: 01011223344)
            </div>
          </div>
        </div>
      )}

      {/* Modal: Policy & Warranty */}
      {activeModal === 'policy' && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl relative space-y-3 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>ضمان يلا فيكس المعتمد</span>
            </div>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>1. ضمان الصيانة:</strong> جميع أعمال السباكة، النجارة، والكهرباء مشمولة بضمان لمدة 14 يوماً من تاريخ انتهاء الصيانة عبر التطبيق.
              </p>
              <p>
                <strong>2. التسجيل الصوتي للجلسة:</strong> يتم تسجيل الجلسات الصوتية لتوثيق اتفاق السعر وقطع الغيار المشتراة لضمان حق العميل والصنايعي ومنع النزاعات.
              </p>
              <p>
                <strong>3. سرية البيانات:</strong> بيانات عنوانك ورقم هاتفك لا تظهر للفني إلا بعد تأكيد الطلب فقط.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
