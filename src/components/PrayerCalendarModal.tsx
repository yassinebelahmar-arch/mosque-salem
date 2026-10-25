import React, { useState } from 'react';
import { X, Calendar, Printer, ExternalLink, ChevronLeft, ChevronRight, Download, Info } from 'lucide-react';
import { getMonthlyCalendar, MONTH_NAMES_FR, DayPrayerSchedule } from '../utils/prayerCalendar';
import { downloadPrayerCalendarPdf } from '../utils/generatePrayerPdf';

interface PrayerCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  mawaqitUrl: string;
}

export const PrayerCalendarModal: React.FC<PrayerCalendarModalProps> = ({
  isOpen,
  onClose,
  mawaqitUrl,
}) => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth() + 1); // 1-12
  const [mawaqitCalendar, setMawaqitCalendar] = useState<Array<Record<string, string[]>> | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      fetch('/api/mawaqit')
        .then((res) => {
          if (!res.ok) throw new Error('API unavailable');
          return res.json();
        })
        .then((data) => {
          if (data?.calendar) {
            setMawaqitCalendar(data.calendar);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const days: DayPrayerSchedule[] = getMonthlyCalendar(selectedYear, selectedMonth, mawaqitCalendar);

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const handleDownloadPdf = () => {
    downloadPrayerCalendarPdf(selectedYear, selectedMonth, days);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 print:p-0 print:bg-white">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none">
        
        {/* Header */}
        <div className="bg-[#0A261A] text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0 print:bg-white print:text-stone-900 print:border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 font-bold shadow-sm print:border">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-amber-300 print:text-emerald-800">
                Calendrier Complet Mawaqit · Saint-Sulpice-la-Pointe (81)
              </div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold leading-tight">
                Horaires de prière de la Mosquée SALEM
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
              title="Télécharger le fichier PDF du calendrier"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger PDF</span>
            </button>

            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors cursor-pointer"
              title="Imprimer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Month Selector Bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0 print:bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer print:hidden"
              aria-label="Mois précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-editorial text-lg sm:text-xl font-bold text-stone-900 min-w-[160px] text-center">
              {MONTH_NAMES_FR[selectedMonth - 1]} {selectedYear}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer print:hidden"
              aria-label="Mois suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Select Month Dropdown */}
          <div className="flex items-center gap-2 print:hidden">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {MONTH_NAMES_FR.map((m, idx) => (
                <option key={m} value={idx + 1}>
                  {m}
                </option>
              ))}
            </select>

            <a
              href={mawaqitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-2xs"
            >
              <span>Mawaqit officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Notice */}
        <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-200/80 text-amber-950 text-xs flex items-center gap-2 print:text-[10px]">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Règle Mosquée SALEM :</strong> Iqama 10 min après l'Adhan pour Fajr, Dhuhr, Asr et Isha. Iqama 5 min pour Maghrib. <strong>Vendredi (Joumou’a) :</strong> Sermon en français puis en arabe · Adhan pour Khotba 13h · Salat Après khotba (13h20 / 13h30).
          </span>
        </div>

        {/* Full Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 print:p-0">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-stone-100 text-stone-600 uppercase text-[11px] font-bold border-b border-stone-200">
                <th className="py-2.5 px-3">Jour</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 font-semibold text-stone-900">Fajr</th>
                <th className="py-2.5 px-3 text-stone-500">Chourouq</th>
                <th className="py-2.5 px-3 font-semibold text-stone-900">Dhuhr</th>
                <th className="py-2.5 px-3 font-semibold text-stone-900">Asr</th>
                <th className="py-2.5 px-3 font-semibold text-stone-900">Maghrib</th>
                <th className="py-2.5 px-3 font-semibold text-stone-900">Isha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {days.map((row) => (
                <tr
                  key={row.dateStr}
                  className={`transition-colors ${
                    row.isToday
                      ? 'bg-amber-100/70 font-bold border-l-4 border-l-amber-500'
                      : row.isFriday
                      ? 'bg-emerald-50/60 font-semibold'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <td className="py-2 px-3 font-medium text-stone-900 flex items-center gap-2">
                    <span>{row.dayName}</span>
                    {row.isToday && (
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-emerald-950">
                        Aujourd'hui
                      </span>
                    )}
                    {row.isFriday && !row.isToday && (
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                        Joumou'a
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-stone-600 font-mono">
                    {row.day} {MONTH_NAMES_FR[selectedMonth - 1].slice(0, 4)}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-stone-900">{row.fajr}</td>
                  <td className="py-2 px-3 font-mono text-stone-500">{row.shuruk}</td>
                  <td className="py-2 px-3 font-mono font-bold text-stone-900">{row.dhuhr}</td>
                  <td className="py-2 px-3 font-mono font-bold text-stone-900">{row.asr}</td>
                  <td className="py-2 px-3 font-mono font-bold text-stone-900">{row.maghrib}</td>
                  <td className="py-2 px-3 font-mono font-bold text-stone-900">{row.isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 shrink-0 print:hidden">
          <span>
            Mosquée SALEM de Saint-Sulpice-la-Pointe (81370) · Coordonnées 43.77° N, 1.68° E
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
