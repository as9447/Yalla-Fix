import React, { useState } from 'react';
import { TARGET_SEGMENTATION } from '../data/marketingStudyData';
import {
  Users,
  MapPin,
  Calendar,
  Wallet,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  ChevronLeft,
  Building,
  HeartHandshake,
} from 'lucide-react';

export const TargetSegmentation: React.FC = () => {
  const [selectedSegmentIdx, setSelectedSegmentIdx] = useState<number>(3); // Default to Socio-economic (the crucial handwritten note)
  const [activePersona, setActivePersona] = useState<'customer_female' | 'customer_male' | 'craftsman'>('customer_female');

  return (
    <div className="space-y-8" dir="rtl">
      {/* Section Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold border border-blue-200 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>البند رقم (2) من ورقة الملاحظات</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            تحديد الفئة المستهدفة والقدرة الشرائية للجمهور
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            وفقاً لما ورد في الورقة: الفئة العمرية، النطاق الجغرافي، الجنس (ذكر - أنثى)، والمستوى الاجتماعي (فقير / غني)
            مع الملاحظة الجوهرية: <strong className="text-amber-700">"هيبان مش هتكسبه"</strong> لو تم توجيه المجهود لشريحة تفتقر للقدرة أو الرغبة في الدفع.
          </p>
        </div>
      </div>

      {/* The 4 Segmentation Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TARGET_SEGMENTATION.map((seg, idx) => {
          const isSelected = selectedSegmentIdx === idx;
          const getIcon = () => {
            switch (idx) {
              case 0:
                return <Calendar className="w-5 h-5 text-blue-600" />;
              case 1:
                return <MapPin className="w-5 h-5 text-emerald-600" />;
              case 2:
                return <Users className="w-5 h-5 text-purple-600" />;
              case 3:
                return <Wallet className="w-5 h-5 text-amber-600" />;
              default:
                return <Users className="w-5 h-5" />;
            }
          };

          return (
            <button
              key={idx}
              onClick={() => setSelectedSegmentIdx(idx)}
              className={`p-5 rounded-2xl border text-right transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100'
                  }`}
                >
                  {getIcon()}
                </div>
                {idx === 3 && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                    ملاحظة هامة بالورقة ⚠️
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{seg.criterion}</h3>
              <p className="text-xs font-semibold text-blue-700 mb-2">{seg.scope}</p>
              <p className="text-xs text-slate-500 line-clamp-2">{seg.importance}</p>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Segment Breakdown */}
      {(() => {
        const currentSeg = TARGET_SEGMENTATION[selectedSegmentIdx];
        return (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  تحليل المعيار المستهدف ({currentSeg.criterionEn})
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{currentSeg.criterion}</h3>
              </div>
              <div className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-200">
                النطاق المعتمد: {currentSeg.scope}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-1">
                    أهمية هذا المعيار في خطة التسويق:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentSeg.importance}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-1">
                    التحليل السوقي المعمق:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentSeg.analysis}
                  </p>
                </div>

                {/* Handwritten Note Highlight */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block mb-0.5">
                      النص المأخوذ من ورقة الملاحظات:
                    </span>
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      "{currentSeg.handwrittenNote}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Yalla-Fix Strategy Response */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>استراتيجية تطبيق يلا فيكس في تلبية هذا المعيار</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {currentSeg.yallaFixStrategy}
                  </p>
                </div>

                {selectedSegmentIdx === 3 && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
                    <strong className="text-slate-900 block mb-1">
                      لماذا كُتب بالورقة "هيبان مش هتكسبه"؟
                    </strong>
                    في المشاريع الخدمية المنظمة ذات التكلفة التشغيلية (تقنيات GPS، تأمين، خدمة عملاء)، استهداف الشرائح ذات الدخل الشديد الانخفاض يؤدي لفشل المشروع تجارياً، لأنها تبحث عن أرخص بديل بغض النظر عن الجودة أو الأمان. لذا تم تركيز يلا فيكس على الطبقات A و B و High-C التي تقدّر الوقت وتدفع مقابل راحة البال.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Target Personas (نماذج شخصيات الجمهور المستهدف) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            تجسيد الفئات المستهدفة
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            نماذج شخصيات الجمهور (Target Personas) لتطبيق يلا فيكس
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            كيف يرى كل طرف الخدمة؟ ولماذا يعتبر يلا فيكس حلاً مثالياً له؟
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActivePersona('customer_female')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activePersona === 'customer_female'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            الشخصية ١: سارة (ربة منزل - التجمع الخامس)
          </button>
          <button
            onClick={() => setActivePersona('customer_male')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activePersona === 'customer_male'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            الشخصية ٢: م. أحمد رضوان (مدير مشروعات - المعادي)
          </button>
          <button
            onClick={() => setActivePersona('craftsman')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activePersona === 'craftsman'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            الشخصية ٣: الأسطى أحمد عبد السلام (فني نجار معتمد)
          </button>
        </div>

        {/* Persona Details Card */}
        {activePersona === 'customer_female' && (
          <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-2xl p-6 border border-purple-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                  س
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">سارة محمود (34 سنة)</h4>
                  <span className="text-xs text-purple-700 font-semibold">
                    ربة منزل وأم لطفلين - شارع التسعين، التجمع الخامس (الطبقة A)
                  </span>
                </div>
              </div>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-bold">
                محرك القرار: الأمان وراحة البال
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-white p-4 rounded-xl border border-purple-100">
                <strong className="text-purple-900 block mb-1">المعاناة السابقة:</strong>
                <p className="text-slate-600 leading-relaxed">
                  الخوف من إدخال صنايعي مجهول الهوية للمنزل أثناء غياب الزوج في العمل، بالإضافة إلى تسريب الحنفيات وتلف الأبواب باستمرار.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-purple-100">
                <strong className="text-purple-900 block mb-1">الميزة الساحرة في يلا فيكس:</strong>
                <p className="text-slate-600 leading-relaxed">
                  ميزة <strong>"التسجيل الصوتي لجلسة الصيانة"</strong> وتتبع الفني بالاسم والصورة والتقييم، مما يجعلها تشعر بأمان تام وموثوقية 100%.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-purple-100">
                <strong className="text-purple-900 block mb-1">القدرة الشرائية:</strong>
                <p className="text-slate-600 leading-relaxed">
                  مستعدة لدفع أسعار عادلة بدون نقاش مقابل ألا تتعرض لأي مضايقة أو تأخير أو فصال مهين.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePersona === 'customer_male' && (
          <div className="bg-gradient-to-br from-blue-50/50 to-sky-50/30 rounded-2xl p-6 border border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  أ
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">م. أحمد رضوان (39 سنة)</h4>
                  <span className="text-xs text-blue-700 font-semibold">
                    مهندس ديكور - شارع النصر، المعادي (الطبقة B+)
                  </span>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold">
                محرك القرار: الوقت والاحترافية
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <strong className="text-blue-900 block mb-1">المعاناة السابقة:</strong>
                <p className="text-slate-600 leading-relaxed">
                  يومه مزدحم بالاجتماعات والمواعيد، ولا يملك وقتاً للبحث في الشارع أو مساومة فني تكييف أو كهربائي.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <strong className="text-blue-900 block mb-1">الميزة الساحرة في يلا فيكس:</strong>
                <p className="text-slate-600 leading-relaxed">
                  تحديد الموعد بدقة، وإشعار "الفني في الطريق إليك ومتبقي 7 دقائق"، والدفع الإلكتروني أو الكاش الموثق.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <strong className="text-blue-900 block mb-1">القدرة الشرائية:</strong>
                <p className="text-slate-600 leading-relaxed">
                  دخله ممتاز ويطلب خدمات الصيانة بانتظام لكل من شقته بالمعادي وعيادة أسرته.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePersona === 'craftsman' && (
          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-2xl p-6 border border-amber-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                  ع
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">الأسطى أحمد عبد السلام (36 سنة)</h4>
                  <span className="text-xs text-amber-700 font-semibold">
                    فني نجار معتمد - خبرة 8 سنوات - المعادي وضواحيها
                  </span>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold">
                محرك القرار: الدخل اليومي المستقر والكرامة
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-white p-4 rounded-xl border border-amber-100">
                <strong className="text-amber-900 block mb-1">المعاناة السابقة:</strong>
                <p className="text-slate-600 leading-relaxed">
                  أيام عمل متقطعة، والاعتماد على السمسار أو مقهى الصنايعية، والتأخر في استلام مستحقاته من الزبائن.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-100">
                <strong className="text-amber-900 block mb-1">الميزة الساحرة في يلا فيكس:</strong>
                <p className="text-slate-600 leading-relaxed">
                  محفظة الأرباح الفورية (حققت 3850 ج.م في الصورة المرفقة)، والطلبات القريبة في منطقته الجغرافية بدون وسيط.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-100">
                <strong className="text-amber-900 block mb-1">شراكته مع المنصة:</strong>
                <p className="text-slate-600 leading-relaxed">
                  فخور بلقب "فني معتمد" وتقييمه (4.8 من 32 طلباً)، ويعمل بروح الشراكة الحقيقية مع المنصة.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
