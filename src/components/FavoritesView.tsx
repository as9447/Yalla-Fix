import React from 'react';
import { Technician } from '../data/yallaFixData';
import { Star, Briefcase, MapPin, Heart, Send } from 'lucide-react';

interface FavoritesViewProps {
  technicians: Technician[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onRequestBooking: (tech: Technician) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  technicians,
  favorites,
  onToggleFavorite,
  onRequestBooking,
}) => {
  const favoriteTechs = technicians.filter((t) => favorites.includes(t.id));

  return (
    <div className="space-y-6 max-w-2xl mx-auto" dir="rtl">
      <h2 className="text-xl font-bold text-slate-900 text-center sm:text-right">
        الفنيون المفضلة
      </h2>

      {favoriteTechs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base mb-1">قائمة المفضلة فارغة حالياً</h3>
          <p className="text-xs text-slate-400">
            يمكنك حفظ الفنيين المفضلين لديك بالضغط على أيقونة القلب في بطاقة الفني بالرئيسية.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteTechs.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                    <span className="no-underline">{tech.avatarText}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-normal no-underline">{tech.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 leading-normal">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="no-underline">{tech.city} - {tech.area}</span>
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  متاح الآن
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{tech.rating}</span>
                  <span className="text-slate-400">({tech.reviewCount} تقييم)</span>
                </span>

                <span className="flex items-center gap-1 text-slate-600">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>خبرة {tech.experienceYears} سنوات</span>
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onRequestBooking(tech)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>إرسال طلب</span>
                </button>

                <button
                  onClick={() => onToggleFavorite(tech.id)}
                  className="p-3 rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 cursor-pointer"
                  title="إزالة من المفضلة"
                >
                  <Heart className="w-5 h-5 fill-rose-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
