import React, { useState } from 'react';
import { TONE_OF_VOICE_RULES } from '../data/marketingStudyData';
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  XCircle,
  Megaphone,
  BellRing,
  Smartphone,
  Quote,
} from 'lucide-react';

export const VoiceToneGuide: React.FC = () => {
  const [activeAudience, setActiveAudience] = useState<number>(0);

  const sampleCampaigns = [
    {
      title: 'إعلان السوشيال ميديا (فيسبوك / إنستغرام لربات البيوت)',
      body: '«باب الشقة بيعلق ومفيش وقت تفاصلي مع نجار؟ مع يلا فيكس.. الأسطى معتمد، في طريقك خلال 7 دقايق، والتسجيل الصوتي لجلسة الصيانة بيحفظ حقك وأمان بيتك. اطلبي دلوقتي بضغطة زر!»',
      tag: 'موجه للعميل',
    },
    {
      title: 'إشعار فوري (Push Notification) على هاتف العميل',
      body: '«🛵 يا فندم، فني السباكة محمد فؤاد في الطريق إليك (على بعد 1.2 كم). تابع خط سيره لايف على الخريطة!»',
      tag: 'تجربة المستخدم',
    },
    {
      title: 'إعلان استقطاب الفنيين والصنائعية المهرة',
      body: '«يا أسطى كريم.. كفاية وقفة على القهوة ومستني زبون! يلا فيكس بيجبلك طلبات صيانة يومية في منطقتك، تسعيرة ثابتة بدون فصال، وأرباحك بتتحول لمحفظتك أول بأول. سجل كفني معتمد النهاردة!»',
      tag: 'موجه للصنايعي',
    },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold border border-blue-200 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>البند رقم (3) من ورقة الملاحظات</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            التحدث بلغة الجمهور المستهدف (Tone of Voice & Messaging)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            النجاح التسويقي لأي مشروع يعتمد على كسر الحواجز النفسية والتحدث باللغة الطبيعية التي يثق بها العميل ويحترمها الفني.
            في السوق المصري، المزج الذكي بين اللهجة المصرية الأصيلة والاحترافية الرقمية هو سر الانتشار وسرعة التبني.
          </p>
        </div>
      </div>

      {/* Audience Toggle & Tone Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap gap-2 mb-6">
          {TONE_OF_VOICE_RULES.map((rule, idx) => {
            const isActive = activeAudience === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveAudience(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {rule.targetAudience}
              </button>
            );
          })}
        </div>

        {(() => {
          const current = TONE_OF_VOICE_RULES[activeAudience];
          return (
            <div className="space-y-6">
              {/* Style Banner */}
              <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200">
                <span className="text-xs font-bold text-blue-800 uppercase block mb-1">
                  طبيعة ونبرة الصوت الموصى بها:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {current.toneStyle}
                </p>
              </div>

              {/* Key Marketing Messages */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  الرسائل الإعلانية الجوهرية (Core Copywriting Angles):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.keyMessages.map((msg, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3"
                    >
                      <Quote className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                        {msg}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Do's and Don'ts of Vocabulary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {/* Words to Use */}
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>مفردات يُفضل استخدامها في الحملات</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.wordsToUse.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        className="bg-white border border-emerald-300 text-emerald-900 text-xs px-2.5 py-1 rounded-lg font-bold shadow-2xs"
                      >
                        ✓ {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Words to Avoid */}
                <div className="bg-red-50/50 p-5 rounded-2xl border border-red-200">
                  <div className="flex items-center gap-2 text-red-800 font-bold text-xs sm:text-sm mb-3">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>عبارات ومصطلحات ممنوعة تجنباً للنفور</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.wordsToAvoid.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        className="bg-white border border-red-300 text-red-900 text-xs px-2.5 py-1 rounded-lg font-medium shadow-2xs"
                      >
                        ✕ {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Real-world Egyptian Advertising Campaigns Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase mb-1">
            <Megaphone className="w-4 h-4" />
            <span>تطبيقات إعلانية عملية</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            نماذج لحملات إعلانية جاهزة بروح السوق المصري
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            كيف نصيغ الإعلانات والإشعارات اليومية لتطبيق يلا فيكس؟
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sampleCampaigns.map((camp, cIdx) => (
            <div
              key={cIdx}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {camp.tag}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-3">{camp.title}</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                  {camp.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>القناة: سوشيال وإشعارات</span>
                <span className="text-emerald-600 font-bold">جاهز للنشر</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
