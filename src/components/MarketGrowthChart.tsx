import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Users,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface YearMarketData {
  year: string;
  yearLabel: string;
  stage: string;
  marketShare: number; // Percentage
  totalMarketMln: number; // Million EGP
  yallaFixVolumeMln: number; // Million EGP
  completedOrdersK: number; // in Thousands
  certifiedCraftsmen: number; // Number of certified technicians
}

const MARKET_PROJECTION_DATA: YearMarketData[] = [
  {
    year: '2026',
    yearLabel: '2026 (السنة الأولى)',
    stage: 'الإطلاق المركز (المعادي، التجمع الخامس، مصر الجديدة)',
    marketShare: 8.5,
    totalMarketMln: 420,
    yallaFixVolumeMln: 35.7,
    completedOrdersK: 52,
    certifiedCraftsmen: 500,
  },
  {
    year: '2027',
    yearLabel: '2027 (السنة الثانية)',
    stage: 'التوسع الإقليمي (الشيخ زايد، 6 أكتوبر، الجيزة والشروق)',
    marketShare: 22.0,
    totalMarketMln: 680,
    yallaFixVolumeMln: 149.6,
    completedOrdersK: 195,
    certifiedCraftsmen: 1850,
  },
  {
    year: '2028',
    yearLabel: '2028 (السنة الثالثة)',
    stage: 'الريادة القومية (القاهرة الكبرى، الإسكندرية والدلتا)',
    marketShare: 38.5,
    totalMarketMln: 1050,
    yallaFixVolumeMln: 404.2,
    completedOrdersK: 480,
    certifiedCraftsmen: 4300,
  },
];

export const MarketGrowthChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'share' | 'financial' | 'technicians'>('share');

  // Custom Dark/Modern Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as YearMarketData;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl border border-slate-700 shadow-xl text-xs max-w-xs space-y-2" dir="rtl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-sky-400 text-sm">{data.yearLabel}</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">
              يلا فيكس Yalla-Fix
            </span>
          </div>

          <div className="text-[11px] text-slate-300 font-medium">
            <strong>مرحلة الانتشار:</strong> {data.stage}
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">حصة سوق الصيانة الرقمية:</span>
              <strong className="text-amber-400 text-sm font-bold">{data.marketShare}%</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">إجمالي حجم السوق المستهدف:</span>
              <span className="font-semibold text-slate-200">{data.totalMarketMln} مليون ج.م</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">حجم تعاملات يلا فيكس:</span>
              <span className="font-bold text-emerald-400">{data.yallaFixVolumeMln} مليون ج.م</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">الطلبات المكتملة سنوياً:</span>
              <span className="font-semibold text-sky-300">{data.completedOrdersK.toLocaleString()} ألف طلب</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">الفنيون والصنائعية المعتمدون:</span>
              <span className="font-bold text-purple-300">{data.certifiedCraftsmen.toLocaleString()} فني</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6" dir="rtl">
      {/* Chart Title and Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold border border-emerald-200 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>توقعات النمو للسنوات الثلاث القادمة (2026 - 2028)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            مخطط بياني تفاعلي: نمو حصة سوق الصيانة المنزلية لمشروع يلا فيكس
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مبني على وتيرة تحول الأسر المصرية من الصنايعي التقليدي العشوائي إلى الخدمات الرقمية الموثوقة ذات التسجيل الصوتي والـ GPS
          </p>
        </div>

        {/* Metric Switcher Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveMetric('share')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeMetric === 'share'
                ? 'bg-white text-blue-700 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>حصة السوق والطلبات</span>
          </button>

          <button
            onClick={() => setActiveMetric('financial')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeMetric === 'financial'
                ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>حجم السوق المالي</span>
          </button>

          <button
            onClick={() => setActiveMetric('technicians')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeMetric === 'technicians'
                ? 'bg-white text-purple-700 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>الفنيون المعتمدون</span>
          </button>
        </div>
      </div>

      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-4 rounded-2xl border border-blue-200">
          <span className="text-[11px] font-bold text-blue-700 block mb-1">
            قفزة حصة السوق المتوقعة (Market Share)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-900">من 8.5% إلى 38.5%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +300%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            خلال 36 شهراً من التوسع الجغرافي المدروس
          </span>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 p-4 rounded-2xl border border-emerald-200">
          <span className="text-[11px] font-bold text-emerald-700 block mb-1">
            إجمالي تعاملات يلا فيكس (GMV)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-900">404.2 مليون ج.م</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              بحلول 2028
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            بحصة تعاملات مباشرة عبر التطبيق
          </span>
        </div>

        <div className="bg-gradient-to-br from-purple-50/70 to-fuchsia-50/50 p-4 rounded-2xl border border-purple-200">
          <span className="text-[11px] font-bold text-purple-700 block mb-1">
            شبكة الأسطوات والفنيين المعتمدين
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-900">4,300+ فني</span>
            <span className="text-xs font-bold text-purple-600 flex items-center">
              نجار، سباك، كهرباء
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            تم فحصهم وتدريبهم على معايير الجودة والأمان
          </span>
        </div>
      </div>

      {/* Main Interactive Recharts Area */}
      <div className="bg-slate-50/60 p-4 sm:p-6 rounded-3xl border border-slate-200">
        <div className="h-80 sm:h-96 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={MARKET_PROJECTION_DATA}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorShare" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />

              <XAxis
                dataKey="year"
                tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
              />

              {activeMetric === 'share' && (
                <>
                  <YAxis
                    yAxisId="left"
                    domain={[0, 50]}
                    tick={{ fill: '#2563EB', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(val) => `${val}%`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 550]}
                    tick={{ fill: '#059669', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(val) => `${val}k`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '15px', fontSize: '12px' }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="marketShare"
                    name="حصة السوق لـ يلا فيكس (%)"
                    stroke="#2563EB"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorShare)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="completedOrdersK"
                    name="الطلبات المكتملة سنوياً (بالآلاف)"
                    fill="#10B981"
                    radius={[8, 8, 0, 0]}
                    barSize={40}
                  />
                </>
              )}

              {activeMetric === 'financial' && (
                <>
                  <YAxis
                    yAxisId="left"
                    domain={[0, 1200]}
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(val) => `${val}M`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '15px', fontSize: '12px' }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="totalMarketMln"
                    name="إجمالي حجم سوق الصيانة المنظمة (مليون ج.م)"
                    fill="#94A3B8"
                    radius={[8, 8, 0, 0]}
                    barSize={32}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="yallaFixVolumeMln"
                    name="حجم تعاملات يلا فيكس (مليون ج.م)"
                    fill="#059669"
                    radius={[8, 8, 0, 0]}
                    barSize={32}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="yallaFixVolumeMln"
                    name="منحنى نمو الإيرادات"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#F59E0B' }}
                  />
                </>
              )}

              {activeMetric === 'technicians' && (
                <>
                  <YAxis
                    yAxisId="left"
                    domain={[0, 5000]}
                    tick={{ fill: '#9333EA', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(val) => `${val}`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '15px', fontSize: '12px' }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="certifiedCraftsmen"
                    name="عدد الفنيين المعتمدين النشطين (شريك عمل)"
                    stroke="#9333EA"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTech)"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="certifiedCraftsmen"
                    name="مسار انضمام الفنيين"
                    stroke="#EC4899"
                    strokeWidth={2}
                    dot={{ r: 5, fill: '#EC4899' }}
                  />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Drivers / Strategic Commentary below chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-200 mt-2 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
            <strong className="text-blue-900 block mb-1">
              • عام 2026 (مرحلة التأسيس والاختبار):
            </strong>
            <p className="text-slate-600 leading-relaxed">
              تحقيق 8.5% من الحصة السوقية بالتركيز على 3 أحياء عالية الدخل (المعادي، التجمع، مصر الجديدة) لإثبات كفاءة ميزة التسجيل الصوتي وتتبع الـ GPS.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
            <strong className="text-emerald-900 block mb-1">
              • عام 2027 (مرحلة الانتشار والتسارع):
            </strong>
            <p className="text-slate-600 leading-relaxed">
              القفز إلى 22% بافتتاح نطاق الشيخ زايد و6 أكتوبر والشروق، وعقد شراكات حصرية مع إدارات الكومباوندات والمجمعات السكنية.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
            <strong className="text-purple-900 block mb-1">
              • عام 2028 (مرحلة الريادة والاستدامة):
            </strong>
            <p className="text-slate-600 leading-relaxed">
              الاستحواذ على 38.5% والتوسع في الإسكندرية والمدن الساحلية مع قاعدة عملاء متكررة (Repeat Rate &gt; 65%) بدون تكاليف تسويق باهظة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
