import React, { useState, useEffect } from 'react';
import { SLIDES_DECK_CONTENT } from '../data/marketingStudyData';
import {
  Presentation,
  ChevronRight,
  ChevronLeft,
  Maximize,
  Minimize,
  FileText,
  Share2,
  Sparkles,
  Download,
  CheckCircle2,
} from 'lucide-react';

interface SlideDeckViewerProps {
  onOpenGoogleSlidesModal: () => void;
}

export const SlideDeckViewer: React.FC<SlideDeckViewerProps> = ({
  onOpenGoogleSlidesModal,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(true);

  const totalSlides = SLIDES_DECK_CONTENT.length;
  const slide = SLIDES_DECK_CONTENT[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, isFullscreen]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-1">
            <Presentation className="w-4 h-4" />
            <span>عرض تقديمي تفاعلي جاهز للتصدير</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            شرائح العرض التقديمي للدراسة التسويقية
          </h2>
          <p className="text-xs text-slate-500">
            يمكنك تصفح الشرائح هنا أو تصديرها بنقرة واحدة إلى Google Slides
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
              showNotes
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{showNotes ? 'إخفاء ملاحظات الإلقاء' : 'إظهار ملاحظات الإلقاء'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title={isFullscreen ? 'الخروج من ملء الشاشة' : 'وضع ملء الشاشة'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenGoogleSlidesModal}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Presentation className="w-4 h-4" />
            <span>تصدير إلى Google Slides ↗</span>
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div
        className={`${
          isFullscreen
            ? 'fixed inset-0 z-50 bg-slate-950 p-6 flex flex-col justify-between'
            : 'relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg min-h-[480px] flex flex-col justify-between overflow-hidden'
        }`}
      >
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />

        {/* Slide Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold">
              {slide.category}
            </span>

            <span className="text-xs font-mono font-bold text-slate-400">
              شريحة {currentSlideIndex + 1} من {totalSlides}
            </span>
          </div>

          <h3
            className={`font-black text-slate-900 tracking-tight leading-snug mb-2 ${
              isFullscreen ? 'text-white text-3xl sm:text-4xl' : 'text-xl sm:text-3xl'
            }`}
          >
            {slide.title}
          </h3>

          {slide.subtitle && (
            <p
              className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isFullscreen ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              {slide.subtitle}
            </p>
          )}

          {/* Slide Bullets */}
          <div className="space-y-3.5 my-6">
            {slide.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                  isFullscreen
                    ? 'bg-slate-900/80 border-slate-800 text-slate-200'
                    : 'bg-slate-50/70 border-slate-100 text-slate-800 hover:bg-blue-50/40 hover:border-blue-100'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Speaker Notes Box */}
        {showNotes && slide.notes && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed mt-4 ${
              isFullscreen
                ? 'bg-slate-900 border-slate-800 text-amber-300'
                : 'bg-amber-50/70 border-amber-200 text-amber-900'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ملاحظات مقدم العرض (Speaker Notes):</span>
            </div>
            <p>{slide.notes}</p>
          </div>
        )}

        {/* Slide Navigation Footer Controls */}
        <div
          className={`flex items-center justify-between pt-6 border-t mt-6 ${
            isFullscreen ? 'border-slate-800 text-white' : 'border-slate-100 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>التالي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {SLIDES_DECK_CONTENT.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-6 bg-blue-600'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`الانتقال للشريحة ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide Thumbnails Strip */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 block mb-3 px-2">
          مخطط الشرائح التسع (Slide Thumbnails):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
          {SLIDES_DECK_CONTENT.map((s, idx) => {
            const isCurrent = currentSlideIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  isCurrent
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 font-bold'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">#{idx + 1}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </div>
                <div className="text-[11px] leading-tight line-clamp-2 text-slate-800">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
