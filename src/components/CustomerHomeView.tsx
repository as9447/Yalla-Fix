import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Technician,
  ServiceCategory,
  SERVICE_CATEGORIES,
} from '../data/yallaFixData';
import {
  Search,
  Wrench,
  Droplets,
  Zap,
  Snowflake,
  Paintbrush,
  Star,
  Briefcase,
  MapPin,
  Heart,
  Send,
  Plus,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  Award,
} from 'lucide-react';

interface CustomerHomeViewProps {
  technicians: Technician[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onRequestBooking: (technician: Technician, problemDesc: string, address: string, isUrgent: boolean) => void;
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export const CustomerHomeView: React.FC<CustomerHomeViewProps> = ({
  technicians,
  favorites,
  onToggleFavorite,
  onRequestBooking,
  onSelectCategory,
  selectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [bookingTech, setBookingTech] = useState<Technician | null>(null);
  const [problemDescription, setProblemDescription] = useState('');
  const [addressInput, setAddressInput] = useState('شارع النصر، المعادي، عمارة 14');
  const [isUrgent, setIsUrgent] = useState(true);

  const getCategoryIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-6 h-6 ${isSelected ? 'text-white' : 'text-blue-600'}`;
    switch (iconName) {
      case 'Wrench':
        return <Wrench className={className} />;
      case 'Droplets':
        return <Droplets className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Snowflake':
        return <Snowflake className={className} />;
      case 'Paintbrush':
        return <Paintbrush className={className} />;
      default:
        return <Wrench className={className} />;
    }
  };

  // Filtering
  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'carpenter' && tech.specialty === 'نجار') ||
      (selectedCategory === 'plumber' && tech.specialty === 'سباك') ||
      (selectedCategory === 'electrician' && tech.specialty === 'كهربائي') ||
      (selectedCategory === 'ac' && tech.specialty === 'فني تكييف') ||
      (selectedCategory === 'painter' && tech.specialty === 'دهانات');

    const matchesArea = selectedArea === 'all' || tech.area === selectedArea;

    return matchesSearch && matchesCategory && matchesArea;
  });

  const handleConfirmBooking = () => {
    if (!bookingTech || !problemDescription.trim()) return;
    onRequestBooking(bookingTech, problemDescription, addressInput, isUrgent);
    setBookingTech(null);
    setProblemDescription('');
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Colorful Animated Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white shadow-xl bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-pink-500 animate-gradient-flow border border-white/20">
        {/* Floating background decorative circles */}
        <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-amber-400/20 blur-xl pointer-events-none animate-float-slow-reverse" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-amber-200 border border-white/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>يلا فيكس • خدماتك في إيديك</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
              صنايعية معتمدين بضمان 14 يوم وتتبع لحظي لموقع الفني 🛵
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              احجز فني صيانة محترف في أقل من دقيقة — سباكة، نجارة، كهرباء، وتكييف بأعلى معايير الأمان والشفافية.
            </p>

            {/* Colorful Feature Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>ضمان صيانة معتمد 14 يوم</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-200" />
                <span>وصول خلال 20-30 دقيقة</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-xs flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>تقييم فنيين 4.9/5</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory('all')}
              className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>تصفح قائمة الصنايعية الآن</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن خدمة أو اسم مقدم الخدمة..."
          className="w-full pr-11 pl-4 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Service Categories Scrollable / Grid */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">تخصصات الصيانة السريعة</h2>
          <span className="text-xs text-blue-600 font-semibold">خدماتك في إيديك</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory('all')}
            className={`flex flex-col items-center justify-center min-w-[76px] sm:min-w-[88px] h-24 rounded-2xl border transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-blue-500 shadow-md shadow-blue-500/30 ring-2 ring-blue-300'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 ${
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-white text-blue-600 shadow-xs'
              }`}
            >
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold">الكل</span>
          </motion.button>

          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const getGradient = () => {
              switch (cat.id) {
                case 'carpenter':
                  return isSelected
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-blue-500 shadow-md shadow-blue-500/30 ring-2 ring-blue-300'
                    : 'hover:border-blue-300 hover:bg-blue-50/50';
                case 'plumber':
                  return isSelected
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white border-cyan-500 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-300'
                    : 'hover:border-cyan-300 hover:bg-cyan-50/50';
                case 'electrician':
                  return isSelected
                    ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white border-amber-500 shadow-md shadow-amber-500/30 ring-2 ring-amber-300'
                    : 'hover:border-amber-300 hover:bg-amber-50/50';
                case 'ac':
                  return isSelected
                    ? 'bg-gradient-to-tr from-sky-500 to-indigo-600 text-white border-sky-500 shadow-md shadow-sky-500/30 ring-2 ring-sky-300'
                    : 'hover:border-sky-300 hover:bg-sky-50/50';
                case 'painter':
                  return isSelected
                    ? 'bg-gradient-to-tr from-rose-500 to-pink-600 text-white border-rose-500 shadow-md shadow-rose-500/30 ring-2 ring-rose-300'
                    : 'hover:border-rose-300 hover:bg-rose-50/50';
                default:
                  return isSelected
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
                    : 'hover:bg-slate-100';
              }
            };

            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center justify-center min-w-[76px] sm:min-w-[88px] h-24 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? getGradient()
                    : `bg-slate-50 border-slate-200 text-slate-700 ${getGradient()}`
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white shadow-xs'
                  }`}
                >
                  {getCategoryIcon(cat.iconName, isSelected)}
                </div>
                <span className="text-xs font-bold">{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Filter Toolbar: Area & Sort */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">المنطقة:</span>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">كل مناطق القاهرة</option>
            <option value="المعادي">المعادي</option>
            <option value="التجمع الخامس">التجمع الخامس</option>
            <option value="مصر الجديدة">مصر الجديدة</option>
            <option value="مدينة نصر">مدينة نصر</option>
            <option value="شبرا">شبرا</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          متاح الآن: <strong className="text-blue-600">{filteredTechnicians.length}</strong> صنايعي معتمد
        </div>
      </div>

      {/* Technicians List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTechnicians.map((tech) => {
          const isFav = favorites.includes(tech.id);
          return (
            <motion.div
              key={tech.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Location & Availability Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm relative shrink-0">
                      <span className="no-underline">{tech.avatarText}</span>
                      {tech.isAvailable && (
                        <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-normal no-underline tracking-normal">
                        {tech.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 leading-normal">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="no-underline">{tech.city} - {tech.area}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-blue-600 font-semibold no-underline">{tech.specialty}</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-200 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    متاح الآن
                  </span>
                </div>

                {/* Rating & Experience & Starting Price */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 mb-4 bg-slate-50/80 p-2.5 rounded-2xl">
                  <span className="flex items-center gap-1 text-amber-600 font-bold bg-white px-2 py-1 rounded-xl border border-amber-200/80 shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tech.rating}</span>
                    <span className="text-slate-400 font-normal">({tech.reviewCount})</span>
                  </span>

                  <span className="flex items-center gap-1 text-slate-700 bg-white px-2 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>خبرة {tech.experienceYears} سنوات</span>
                  </span>

                  <span className="text-slate-600 mr-auto text-[11px] pt-0.5">
                    يبدأ من: <strong className="text-slate-900">{tech.hourlyRate} ج.م</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons: Request & Favorite */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookingTech(tech)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>إرسال طلب صيانة</span>
                </button>

                <button
                  onClick={() => onToggleFavorite(tech.id)}
                  className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                    isFav
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                  title={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {bookingTech && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setBookingTech(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBookingTech(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {bookingTech.avatarText}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">طلب صيانة مع {bookingTech.title}</h3>
                <span className="text-xs text-blue-600 font-semibold">
                  {bookingTech.specialty} • {bookingTech.area}
                </span>
              </div>
            </div>

            <div className="space-y-4 py-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ما هي المشكلة التي تحتاج لصيانتها بالتفصيل؟ *
                </label>
                <textarea
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="مثال: تصليح باب الشقة الرئيسي، المفصلات مفككة ويصعب إغلاقه..."
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عنوان الزيارة في القاهرة:
                </label>
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsUrgent(true)}
                  className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isUrgent
                      ? 'bg-blue-50 text-blue-700 border-blue-500 ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>عاجل اليوم (خلال دقائق)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUrgent(false)}
                  className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    !isUrgent
                      ? 'bg-blue-50 text-blue-700 border-blue-500 ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>تحديد موعد لاحق</span>
                </button>
              </div>

              {/* Security & Audio Recording Guarantee Notice */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl text-[11px] text-blue-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>ضمان يلا فيكس:</strong> سيبدأ التسجيل الصوتي لجلسة الصيانة تلقائياً عند وصول الفني لضمان جودة الأعمال وحفظ حقوقك بالكامل مع تتبع GPS لحظي لمساره.
                </span>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={!problemDescription.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                تأكيد طلب الصيانة والتحرك الآن 🛵
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
