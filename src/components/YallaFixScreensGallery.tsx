import React, { useState, useEffect } from 'react';
import { YALLA_FIX_SCREENS } from '../data/marketingStudyData';
import {
  Smartphone,
  Mic,
  Play,
  Pause,
  Navigation,
  ShieldCheck,
  Star,
  CheckCircle2,
  DollarSign,
  Maximize2,
  Layers,
} from 'lucide-react';

export const YallaFixScreensGallery: React.FC = () => {
  const [selectedScreenId, setSelectedScreenId] = useState<string>(YALLA_FIX_SCREENS[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSeconds, setAudioSeconds] = useState<number>(18);
  const [simulatedDistance, setSimulatedDistance] = useState<number>(1.2);
  const [simulatedMinutes, setSimulatedMinutes] = useState<number>(7);
  const [isSimulatingTracking, setIsSimulatingTracking] = useState<boolean>(false);
  const [fullImageView, setFullImageView] = useState<string | null>(null);

  // Audio timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // GPS tracking simulation
  useEffect(() => {
    let interval: any = null;
    if (isSimulatingTracking) {
      interval = setInterval(() => {
        setSimulatedMinutes((prev) => {
          if (prev <= 1) {
            setIsSimulatingTracking(false);
            return 0;
          }
          return prev - 1;
        });
        setSimulatedDistance((prev) => {
          if (prev <= 0.2) return 0;
          return Number((prev - 0.2).toFixed(1));
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isSimulatingTracking]);

  const activeScreen =
    YALLA_FIX_SCREENS.find((s) => s.id === selectedScreenId) || YALLA_FIX_SCREENS[0];

  const formatAudioTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold border border-blue-200 mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>التطبيق العملي لشاشات يلا فيكس (Yalla-Fix)</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            معرض شاشات التطبيق: كيف تحل الميزات البرمجية معضلات الدراسة التسويقية؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            استعراض للشاشات الحقيقية المرفقة لتطبيق Yalla-Fix مع تحليل تسويقي يوضح كيف تم تصميم كل شاشة لتجيب على فجوة تسويقية محددة، مثل التسجيل الصوتي لجلسة الصيانة وتتبع الـ GPS اللحظي.
          </p>
        </div>
      </div>

      {/* Screen Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {YALLA_FIX_SCREENS.map((screen) => {
          const isSelected = selectedScreenId === screen.id;
          return (
            <button
              key={screen.id}
              onClick={() => setSelectedScreenId(screen.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Smartphone className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              <span>{screen.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Main Showcase Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Screen Image Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative rounded-[2.5rem] p-3 bg-gradient-to-b from-slate-800 to-slate-950 shadow-2xl border-4 border-slate-700 max-w-[320px] w-full">
              {/* Speaker notch */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />

              {/* Mobile Screen Container */}
              <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 aspect-[9/19.5] border border-slate-800">
                <img
                  src={activeScreen.imagePath}
                  alt={activeScreen.title}
                  className="w-full h-full object-cover"
                />

                {/* Enlarge overlay button */}
                <button
                  onClick={() => setFullImageView(activeScreen.imagePath)}
                  className="absolute bottom-3 left-3 bg-black/70 hover:bg-black text-white p-2 rounded-xl text-xs flex items-center gap-1 backdrop-blur-xs transition-colors"
                  title="عرض الصورة بالحجم الكامل"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>تكبير</span>
                </button>
              </div>

              {/* Bottom home indicator */}
              <div className="w-28 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
            </div>

            <span className="text-[11px] text-slate-500 mt-3 text-center">
              لقطة شاشة حقيقية من واجهة يلا فيكس المرفقة
            </span>
          </div>

          {/* Right Column: Deep Marketing Analysis & Interactive Simulators */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold mb-2">
                {activeScreen.category}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                {activeScreen.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeScreen.marketingObjective}
              </p>
            </div>

            {/* Gap Solved Card */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                الفجوة التسويقية التي تحلها هذه الشاشة:
              </span>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
                {activeScreen.solvesGap}
              </p>
            </div>

            {/* Target Audience Addressed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  الفئة المستهدفة المخاطبة:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                  {activeScreen.targetAddressed}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  الميزة الجوهرية (USP):
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                  {activeScreen.keyFeature}
                </p>
              </div>
            </div>

            {/* Interactive Feature 1: Live Simulation for Audio Recording (لو الشاشة هي التسجيل الصوتي) */}
            {activeScreen.id === 'audio-recording' && (
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-blue-400" />
                    <span className="font-bold text-sm">التسجيل الصوتي لجلسة الصيانة (محاكاة حية)</span>
                  </div>
                  <span className="font-mono text-amber-400 font-bold text-base">
                    {formatAudioTime(audioSeconds)}
                  </span>
                </div>

                <div className="bg-slate-800 p-3 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 flex-1 overflow-hidden h-8">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isPlayingAudio ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'
                        }`}
                        style={{
                          height: isPlayingAudio ? `${Math.max(15, (i % 6) * 6 + 10)}px` : '6px',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlayingAudio ? 'إيقاف مؤقت' : 'تشغيل التسجيل'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  🛡️ بدأ التسجيل تلقائياً عند بدء التصليح لضمان الجودة وحفظ حقوق العميل والصنايعي، ويتم تشفيره وحفظه سحابياً لحل أي خلافات.
                </p>
              </div>
            )}

            {/* Interactive Feature 2: Live Simulation for GPS Tracking */}
            {activeScreen.id === 'live-tracking' && (
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-sky-400" />
                    <span className="font-bold text-sm">تتبع لايف لموقع الفني (محاكاة لحظية)</span>
                  </div>
                  <span className="text-xs bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded-full font-bold">
                    {simulatedMinutes > 0 ? `متبقي ${simulatedMinutes} دقائق` : 'وصل الفني الآن! 🎉'}
                  </span>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">المسافة المتبقية:</span>
                    <strong className="text-lg font-bold text-white">
                      {simulatedDistance > 0 ? `${simulatedDistance} كم` : '0 كم'}
                    </strong>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        setIsSimulatingTracking(true);
                        setSimulatedMinutes(7);
                        setSimulatedDistance(1.2);
                      }}
                      disabled={isSimulatingTracking}
                      className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer"
                    >
                      {isSimulatingTracking ? 'جاري وصول الفني...' : 'محاكاة وصول الفني 🛵'}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  📍 يتم تحديث موقع الفني محمد فؤاد (سباك) لحظياً عبر GPS لشارع التسعين الشمالي، التجمع الخامس.
                </p>
              </div>
            )}

            {/* Interactive Feature 3: Technician Portal Stats */}
            {activeScreen.id === 'technician-portal' && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-sm">مؤشرات أداء الأسطى أحمد عبد السلام</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    متاح للعمل الآن
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-[11px] text-blue-200 block mb-0.5">الأرباح</span>
                    <strong className="text-base sm:text-lg font-extrabold text-emerald-300">
                      3,850 ج.م
                    </strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-[11px] text-blue-200 block mb-0.5">الطلبات المكتملة</span>
                    <strong className="text-base sm:text-lg font-extrabold text-white">
                      32 طلب
                    </strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-[11px] text-blue-200 block mb-0.5">التقييم</span>
                    <strong className="text-base sm:text-lg font-extrabold text-amber-300 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                      4.8
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Image Modal View */}
      {fullImageView && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setFullImageView(null)}
        >
          <div
            className="bg-slate-900 p-3 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center text-white pb-2 px-2 border-b border-slate-800">
              <span className="text-xs font-bold">معاينة الشاشة الأصلية</span>
              <button
                onClick={() => setFullImageView(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-2 overflow-auto flex items-center justify-center">
              <img
                src={fullImageView}
                alt="App Screen"
                className="max-h-[75vh] rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
