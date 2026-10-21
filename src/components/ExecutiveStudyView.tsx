import React, { useState } from 'react';
import {
  FEASIBILITY_PILLARS,
  CORE_QUESTIONS,
} from '../data/marketingStudyData';
import {
  TrendingUp,
  Wrench,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileText,
  Lightbulb,
  ArrowRight,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { MarketGrowthChart } from './MarketGrowthChart';

interface ExecutiveStudyViewProps {
  onNavigateTab: (tabId: string) => void;
}

export const ExecutiveStudyView: React.FC<ExecutiveStudyViewProps> = ({ onNavigateTab }) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('marketing');
  const [viewSourceImage, setViewSourceImage] = useState<string | null>(null);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-600" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  const activePillarObj =
    FEASIBILITY_PILLARS.find((p) => p.id === selectedPillar) || FEASIBILITY_PILLARS[0];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>المرجع الشامل لدراسة الجدوى والتسويق لمشروع يلا فيكس (Yalla-Fix)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            الدراسة التسويقية لمشروع <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">يلا فيكس (Yalla-Fix)</span> لخدمات الصيانة المنزلية
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
            بناءً على وثيقة محاور دراسة الجدوى وأسئلتها الاقتصادية الثلاثة، تقدم هذه الدراسة تحليلاً معمقاً لـ
            <span className="text-amber-300 font-semibold"> الفجوة التسويقية</span>، و
            <span className="text-amber-300 font-semibold"> استبيان رأي العملاء والطلب الفعال</span>، و
            <span className="text-amber-300 font-semibold"> تحديد الفئات المستهدفة وقدرتها الشرائية</span>، مع
            <span className="text-amber-300 font-semibold"> صياغة الخطاب التسويقي</span> وتطبيقه على شاشات تطبيق يلا فيكس في السوق المصري.
          </p>

          {/* Quick Stats / Action Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('gap-survey')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
            >
              <span>تحليل الفجوة والاستبيان</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>

            <button
              onClick={() => onNavigateTab('slide-deck')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <span>استعراض شرائح العرض (Slide Deck)</span>
            </button>

            {/* View Original Reference Images button */}
            <div className="flex items-center gap-2 mr-auto">
              <button
                onClick={() =>
                  setViewSourceImage('/assets/aistudio/WhatsApp_Image_2026-10-21_at_3.25.14_PM_7d8bdb4d.jpeg')
                }
                className="inline-flex items-center gap-1.5 text-xs text-sky-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-sky-400/30 px-3 py-2 rounded-xl transition-colors"
                title="عرض ورقة الملاحظات المكتوبة بخط اليد"
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>ورقة النوت بوك المكتوبة</span>
              </button>

              <button
                onClick={() =>
                  setViewSourceImage('/assets/aistudio/WhatsApp_Image_2026-10-21_at_3.24.54_PM_a5129a20.jpeg')
                }
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-amber-400/30 px-3 py-2 rounded-xl transition-colors"
                title="عرض بطاقة مفهوم دراسة الجدوى الاقتصادية"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>بطاقة مفهوم الجدوى</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing original uploaded reference images */}
      {viewSourceImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setViewSourceImage(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-3xl p-4 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
              <span className="font-bold text-sm">الوثيقة الأصلية المرفقة من المستخدم</span>
              <button
                onClick={() => setViewSourceImage(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="py-4 overflow-auto flex items-center justify-center">
              <img
                src={viewSourceImage}
                alt="Source Doc"
                className="max-h-[70vh] rounded-xl object-contain border border-slate-700"
              />
            </div>
            <div className="pt-2 text-center text-xs text-slate-400">
              تم استخراج كافة المحاور والأسئلة التسويقية من هذه الوثيقة وتطبيقها عملياً على منصة يلا فيكس.
            </div>
          </div>
        </div>
      )}

      {/* Section 1: The 4 Pillars of Feasibility (أركان دراسة الجدوى الأربعة) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              المرحلة الأولى: الهيكل المنهجي
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              أركان دراسة الجدوى الأربعة (فنية - مالية - تسويقية - قانونية)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              كما دُوّن في ورقة الملاحظات، لا يمكن لمشروع أن ينجح إلا بتكامل هذه الأركان معاً، مع صدارة الدراسة التسويقية كقائد لجميع القرارات.
            </p>
          </div>
        </div>

        {/* Pillar Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {FEASIBILITY_PILLARS.map((pillar) => {
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`text-right p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'
                    }`}
                  >
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      pillar.id === 'marketing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {pillar.id === 'marketing' ? 'حجر الأساس ★' : 'ركن مساند'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{pillar.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{pillar.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Deep Dive Card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              {getPillarIcon(activePillarObj.iconName)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{activePillarObj.title}</h3>
              <span className="text-xs font-semibold text-blue-700">{activePillarObj.titleEn}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                المحاور الرئيسية التي تغطيها هذه الدراسة:
              </h4>
              <ul className="space-y-2.5">
                {activePillarObj.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-blue-200/60 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-600 mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>تطبيق هذا الركن على مشروع يلا فيكس (Yalla-Fix):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activePillarObj.yallaFixApplication}
                </p>
              </div>

              {activePillarObj.id === 'marketing' && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    استكشف تفاصيل الفجوة والاستبيان الآن:
                  </span>
                  <button
                    onClick={() => onNavigateTab('gap-survey')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>الانتقال للفجوة والاستبيان</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Market Growth Chart (Recharts) */}
      <MarketGrowthChart />

      {/* Section 3: The 3 Core Questions from the Uploaded Image (الأسئلة الجوهرية الثلاثة) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full font-bold border border-amber-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>نص الورقة المرفقة: مفهوم دراسة الجدوى الاقتصادية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            الأسئلة الثلاثة الفاصلة في جدوى مشروع يلا فيكس
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            وفق المعايير الاقتصادية الصارمة، لا يتم البدء في أي مشروع إلا إذا كانت الإجابة على هذه الأسئلة الثلاثة إيجابية ومبرهنة بالأدلة السوقية.
          </p>
        </div>

        <div className="space-y-4">
          {CORE_QUESTIONS.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shrink-0">
                    {item.id}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.question}</h3>
                </div>
                <span className="self-start sm:self-center bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold border border-emerald-200 shrink-0">
                  {item.verdict}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200/60 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-500 block mb-1">
                    المغزى الاقتصادي لهذا السؤال:
                  </span>
                  <p className="text-slate-600 leading-relaxed">{item.significance}</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                  <span className="font-semibold text-blue-700 block mb-1">
                    إجابة وتحقق مشروع يلا فيكس (Yalla-Fix):
                  </span>
                  <p className="text-slate-800 leading-relaxed">{item.yallaFixAnswer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: The 3 Core Pillars of Marketing Study from the Handwritten Note */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white">
        <div className="max-w-3xl mb-8">
          <span className="text-blue-300 text-xs font-bold uppercase tracking-wider block mb-1">
            من الورقة المكتوبة بخط اليد
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">
            المحاور الثلاثة الرئيسية للدراسة التسويقية
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/80 mt-1">
            كما لخصها الدفتر في 3 خطوات عملية متتالية:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white font-extrabold flex items-center justify-center text-base mb-4">
                ١
              </div>
              <h3 className="text-base font-bold text-white mb-2">معرفة الفجوة التسويقية</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                • عمل استبيان علشان أعرف رأي العميل (أعرف هل هو محتاج الخدمة أصلًا ولا لأ).
                <br />
                • تسهيل الخدمات اللي عايزها (طلب سريع، أسعار محددة، فني معتمد).
                <br />
                • تحديد الطلب والأهداف العامة للمشروع.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('gap-survey')}
              className="text-xs font-bold text-sky-300 hover:text-white flex items-center gap-1.5 pt-3 border-t border-white/10"
            >
              <span>فتح الاستبيان والفجوة</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

          {/* Step 2 */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white font-extrabold flex items-center justify-center text-base mb-4">
                ٢
              </div>
              <h3 className="text-base font-bold text-white mb-2">تحديد الفئة المستهدفة</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                • الفئة العمرية (22-55 سنة).
                <br />
                • النطاق الجغرافي (القاهرة الكبرى كمرحلة أولى).
                <br />
                • الجنس (ذكور وإناث - أمان للسيدات).
                <br />
                • المستوى الاجتماعي (فقير / غني)؛ الملاحظة الدقيقة: "هيبان مش هتكسبه" لو استهدفت فئات بدون قدرة شرائية.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('segmentation')}
              className="text-xs font-bold text-sky-300 hover:text-white flex items-center gap-1.5 pt-3 border-t border-white/10"
            >
              <span>تحليل الشرائح والقدرة الشرائية</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

          {/* Step 3 */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 font-extrabold flex items-center justify-center text-base mb-4">
                ٣
              </div>
              <h3 className="text-base font-bold text-white mb-2">التحدث بلغة الجمهور المستهدف</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                • صياغة خطاب قريب من البيت المصري ("خدماتك في إيديك").
                <br />
                • لغة العميل: أمان، توفير وقت، راحة بال، وضمان بدون فصال.
                <br />
                • لغة الفني/الصنايعي: احترام المهنة ("يا أسطى")، أرباحك فورية، وزيادة طلباتك.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('tone-voice')}
              className="text-xs font-bold text-sky-300 hover:text-white flex items-center gap-1.5 pt-3 border-t border-white/10"
            >
              <span>دليل لغة الخطاب والإعلانات</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
