import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { SLIDES_DECK_CONTENT } from '../data/marketingStudyData';
import {
  createGoogleSlidesPresentation,
  ExportResult,
} from '../services/googleSlides';
import { ensureAccessToken, googleSignIn } from '../services/firebase';
import {
  Presentation,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Loader2,
  X,
  Copy,
  Download,
  Check,
} from 'lucide-react';

interface GoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUserLoginSuccess: (user: User, token: string) => void;
}

export const GoogleSlidesModal: React.FC<GoogleSlidesModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserLoginSuccess,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStartExport = async () => {
    try {
      setIsExporting(true);
      setErrorMessage(null);
      setExportResult(null);

      // Obtain or refresh OAuth token with required Google Slides & Drive scopes
      setProgressStatus('التحقق من الاتصال بحساب Google وتصريح Slides...');
      setProgressPercent(15);
      const token = await ensureAccessToken();

      const presentationTitle =
        'الدراسة التسويقية لمشروع يلا فيكس Yalla-Fix (دراسة الجدوى وتحديد الفئات المستهدفة)';

      const result = await createGoogleSlidesPresentation(
        presentationTitle,
        SLIDES_DECK_CONTENT,
        token,
        (step, percent) => {
          setProgressStatus(step);
          setProgressPercent(percent);
        }
      );

      setExportResult(result);
    } catch (err: any) {
      console.error('Error exporting slides:', err);
      setErrorMessage(
        err.message || 'حدث خطأ أثناء الاتصال بـ Google Slides. يرجى إعادة المحاولة.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyDeckText = () => {
    const fullText = SLIDES_DECK_CONTENT.map(
      (s, idx) =>
        `[شريحة ${idx + 1}: ${s.title}]\nالتصنيف: ${s.category}\n${
          s.subtitle ? `الوصف: ${s.subtitle}\n` : ''
        }\nالمحاور:\n${s.bullets.map((b) => `• ${b}`).join('\n')}\n${
          s.notes ? `\nملاحظات الإلقاء: ${s.notes}\n` : ''
        }\n-----------------------------------\n`
    ).join('\n');

    navigator.clipboard.writeText(fullText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleDownloadDeckFile = () => {
    const fullText = SLIDES_DECK_CONTENT.map(
      (s, idx) =>
        `========================================\nشريحة ${idx + 1}: ${s.title}\nالتصنيف: ${
          s.category
        }\n${s.subtitle ? `الوصف: ${s.subtitle}\n` : ''}========================================\n\n${s.bullets
          .map((b) => `• ${b}`)
          .join('\n\n')}\n\n${
          s.notes ? `ملاحظات مقدم العرض:\n${s.notes}\n` : ''
        }\n\n`
    ).join('\n');

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'الدراسة-التسويقية-يلا-فيكس-Yalla-Fix.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <Presentation className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              تصدير العرض التقديمي إلى Google Slides
            </h3>
            <span className="text-xs text-slate-500">
              إنشاء ملف مباشر يحتوي على كافة شرائح دراسة الجدوى وتحديد الفئات
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-4 py-2">
          {/* Deck Summary Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-900">محتويات العرض التقديمي المراد تصديره:</span>
              <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                9 شرائح متكاملة
              </span>
            </div>
            <p className="leading-relaxed">
              • العنوان: <strong>الدراسة التسويقية لمشروع يلا فيكس (Yalla-Fix)</strong>
              <br />
              • المحاور: أركان الجدوى، الأسئلة الجوهرية، الفجوة التسويقية، استبيان الـ 500 أسرة، الفئات المستهدفة، ولغة الخطاب المصري.
            </p>
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>سبب عدم وصول الملف إلى Google Slides:</span>
              </div>
              <p className="leading-relaxed bg-white/80 p-2.5 rounded-xl border border-red-200 font-mono text-[11px]">
                {errorMessage}
              </p>
              <div className="text-[11px] text-slate-600">
                💡 <strong>تنبيه للمتصفح:</strong> إذا ظهرت نافذة تسجيل الدخول وأغلقت أو تم حظرها، تأكد من تفعيل "السماح بالنوافذ المنبثقة (Popups)" في المتصفح.
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          {isExporting && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                  <span>{progressStatus || 'جاري الاتصال بـ Google Slides...'}</span>
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-amber-800">
                يتم الآن فتح الاتصال مع Google Presentations API وإنشاء الشرائح التسع تباعاً.
              </p>
            </div>
          )}

          {/* Success State */}
          {exportResult && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  تم وصول العرض إلى Google Slides بنجاح! 🚀
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  تم إنشاء العرض في Google Drive وحفظ 9 شرائح منسقة. اضغط على الزر أدناه لفتحه في Google Slides الآن:
                </p>
              </div>

              <a
                href={exportResult.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105"
              >
                <span>فتح العرض في Google Slides الآن ↗</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="text-[11px] text-slate-500 font-mono truncate px-2">
                {exportResult.presentationUrl}
              </div>
            </div>
          )}

          {/* Main Action Button */}
          {!exportResult && (
            <button
              onClick={handleStartExport}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تصدير الشرائح إلى حسابك...</span>
                </>
              ) : (
                <>
                  <Presentation className="w-4 h-4" />
                  <span>تصدير الآن إلى Google Slides ↗</span>
                </>
              )}
            </button>
          )}

          {/* Alternative Quick Export Tools (Always Available) */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 block mb-2">
              خيارات إضافية فورية للحصول على كامل محتوى الشرائح:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyDeckText}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">تم نسخ النص!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>نسخ نصوص الشرائح</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadDeckFile}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>تحميل ملف الدراسة (Text)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
