import React, { useState } from 'react';
import { SURVEY_FINDINGS } from '../data/marketingStudyData';
import {
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Navigation,
  Mic,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const MarketGapSurvey: React.FC = () => {
  // Simulator user answers
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({
    1: 1, // Fear/Safety
    2: 0, // Yes definitely app
    3: 0, // Excellent safety
    4: 0, // Plumbing
  });

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold border border-blue-200 mb-2">
            <PieChart className="w-3.5 h-3.5" />
            <span>البند رقم (1) من ورقة الملاحظات</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            دراسة الفجوة التسويقية واستبيان رأي العملاء
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            "أعمل استبيان علشان أعرف رأي العميل (أعرف هل هو محتاج الخدمة أصلًا ولا لأ) مثلًا أعمل تسهيل في الخدمات عايزها -&gt; تحديد الطلب / الأهداف عموماً".
            هنا نستعرض كيف تمت دراسة الفجوة في السوق المصري ونتائج الاستبيان الميداني للعينة.
          </p>
        </div>
      </div>

      {/* Market Gap Analysis Table / Comparison */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
            مقارنة الفجوة التسويقية: السوق التقليدي مقابل حل يلا فيكس (Yalla-Fix)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            الفجوة التسويقية (Market Gap) تمثل المسافة بين معاناة العميل اليومية مع الصنايعي التقليدي وما يطمح إليه من خدمة منظمة وسريعة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Market Reality */}
          <div className="bg-red-50/50 rounded-2xl p-6 border border-red-200">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm sm:text-base mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>واقع السوق التقليدي (معاناة العميل)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>المواعيد العشوائية:</strong> الصنايعي يعد بالحضور "العصر" ويتأخر ساعات أو يغلق هاتفه دون اعتذار.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>المغالاة والفصال:</strong> عدم وجود تسعيرة ثابتة، والمبالغة في أسعار قطع الغيار ومصنعية اليد.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>مخاوف الأمان المنزلي:</strong> تردد السيدات وربات البيوت في إدخال فني مجهول السجل والبيانات للبيت.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>غياب الضمان:</strong> إذا تكرر العطل في اليوم التالي، يتهرب الصنايعي أو يطالب بأجر جديد.
                </span>
              </li>
            </ul>
          </div>

          {/* Yalla-Fix Solution */}
          <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base mb-4">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>كيف سد تطبيق يلا فيكس الفجوة؟ (القيمة المضافة)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>
                  <strong>تتبع لحظي GPS:</strong> العميل يرى موقع الفني على الخريطة مباشرة مع توقيت وصول دقيق (متبقي 7 دقائق).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>
                  <strong>تسعيرة واضحة معلنة:</strong> قائمة أسعار موحدة ومحددة لكل نوع صيانة تمنع الفصال والإحراج تماماً.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>
                  <strong>التسجيل الصوتي لجلسة الصيانة:</strong> يبدأ تلقائياً عند بدء التصليح لحفظ حقوق العميل والصنايعي.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>
                  <strong>ضمان معتمد وتقييم شفاف:</strong> الفني معتمد، وتقييماته الحقيقية ظاهرة، مع ضمان صيانة معتمد من المنصة.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Customer Survey Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>محاكي استبيان العميل (Customer Survey Simulator)</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              استبيان التحقق من الاحتياج الفعلي للخدمة (عينة 500 أسرة في القاهرة)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              جرّب الإجابة على أسئلة الاستبيان كأنك عميل لتكتشف إحصائيات السوق وتحليل كل إجابة.
            </p>
          </div>
          <div className="bg-slate-100 rounded-xl px-3 py-2 text-xs text-slate-600 font-medium self-start sm:self-auto">
            حجم العينة: <strong className="text-slate-900">500 مشارك</strong> (القاهرة الكبرى)
          </div>
        </div>

        <div className="space-y-6">
          {SURVEY_FINDINGS.map((q) => {
            const currentSelected = userAnswers[q.id];
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {q.id}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{q.question}</h4>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = currentSelected === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`text-right p-3 rounded-xl border transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-between gap-2 ${
                          isUserChoice
                            ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isUserChoice
                                ? 'border-white bg-white text-blue-600'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isUserChoice && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                          </div>
                          <span>{opt.label}</span>
                        </div>

                        {/* Survey Result Percentage Bar */}
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
                            isUserChoice
                              ? 'bg-blue-700 text-white'
                              : opt.isKeyFinding
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.percentage}%
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex mb-3">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      style={{ width: `${opt.percentage}%` }}
                      className={`h-full ${
                        optIdx === 0
                          ? 'bg-blue-500'
                          : optIdx === 1
                          ? 'bg-sky-400'
                          : optIdx === 2
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      title={`${opt.label}: ${opt.percentage}%`}
                    />
                  ))}
                </div>

                {/* Marketing Insight Box */}
                <div className="bg-white p-3.5 rounded-xl border border-blue-100/80 text-xs text-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 ml-1">الاستنتاج التسويقي للقرار الاستثماري:</strong>
                    <span>{q.insight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Spotlight: Facilitating Services (تسهيل الخدمات في يلا فيكس) */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white">
        <div className="max-w-3xl mb-6">
          <span className="text-blue-300 text-xs font-bold uppercase tracking-wider block mb-1">
            حل الفجوة عملياً
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            كيف يترجم يلا فيكس مبدأ "تسهيل الخدمات التي يحتاجها العميل"؟
          </h3>
          <p className="text-xs sm:text-sm text-blue-200/80 mt-1">
            كما جاء في الورقة: "أعمل تسهيل في الخدمات عايزها"؛ قمنا بتحويل عملية حجز الصيانة الشاقة إلى 3 ضغطات سلسة:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Feature 1 */}
          <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
              <Navigation className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">تتبع الفني لحظياً بالـ GPS</h4>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              لا مزيد من "أنا في السكة وخمس دقائق وهو في حي آخر". العميل يرى حركة دراجة الصنايعي البخارية والمسافة المتبقية بالكيلومتر والدقيقة.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center mb-3">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">التسجيل الصوتي لجلسة الصيانة</h4>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              ميزة حصرية موثقة بالتطبيق تبدأ تلقائياً عند بدء التصليح، توثق اتفاق الأسعار والملاحظات لضمان جودة الأعمال وراحة بال الطرفين.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">فني معتمد وضمان أعمال حقيقي</h4>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              فحص جنائي ومهني لكل أسطى مسجل، مع ضمان صيانة معتمد من إدارة يلا فيكس في حال ظهور أي خلل بعد إتمام الصيانة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
