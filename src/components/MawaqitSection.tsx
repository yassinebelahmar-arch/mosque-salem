import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, Calendar, Info, RefreshCw, AlertCircle, CalendarDays, Printer, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { getPrayerScheduleInfo, OFFICIAL_MAWAQIT_NOTICE, calculateIqamaTime, getJumuaTime } from '../utils/prayerTimes';
import { getMonthlyCalendar, MONTH_NAMES_FR, DayPrayerSchedule } from '../utils/prayerCalendar';
import { downloadPrayerCalendarPdf } from '../utils/generatePrayerPdf';

interface MawaqitSectionProps {
  mawaqitUrl: string;
}

export const MawaqitSection: React.FC<MawaqitSectionProps> = ({ mawaqitUrl }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'calendar'>('today');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState<string>('En direct');
  const [announcement, setAnnouncement] = useState<string>(OFFICIAL_MAWAQIT_NOTICE);

  const today = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth() + 1);

  // Live Mawaqit state synchronized with official API
  const [liveData, setLiveData] = useState<{
    times: Record<string, string>;
    iqama: Record<string, string>;
    jumua: string;
    calendar: Array<Record<string, string[]>> | null;
  }>({
    times: {
      fajr: '07:00',
      shuruk: '08:16',
      dhuhr: '13:40',
      asr: '16:34',
      maghrib: '19:04',
      isha: '20:17',
    },
    iqama: {
      fajr: '07:10',
      shuruk: '-',
      dhuhr: '13:50',
      asr: '16:44',
      maghrib: '19:09',
      isha: '20:27',
    },
    jumua: '13:00',
    calendar: null,
  });

  const fetchLiveMawaqit = () => {
    setIsRefreshing(true);
    fetch('/api/mawaqit')
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (data?.times) {
          setLiveData({
            times: data.times,
            iqama: data.iqama || {
              fajr: data.times.fajr,
              dhuhr: '13:50',
              asr: '16:44',
              maghrib: '19:09',
              isha: '20:27',
            },
            jumua: data.jumua || '13:41',
            calendar: data.calendar || null,
          });
          if (data.announcement) {
            setAnnouncement(data.announcement);
          }
        }
        setLastSync(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      })
      .catch(() => {
        setLastSync('À jour');
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchLiveMawaqit();
    const interval = setInterval(() => {
      fetchLiveMawaqit();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const scheduleInfo = getPrayerScheduleInfo(
    today,
    liveData.times,
    liveData.iqama,
    liveData.jumua
  );

  const isFriday = scheduleInfo.isFriday;
  const jumuaTime = getJumuaTime(today); // 13:00 à partir de dimanche

  const fajrAdhan = liveData.times.fajr || '07:00';
  const shurukAdhan = liveData.times.shuruk || '08:16';
  const dhuhrAdhan = isFriday ? jumuaTime : (liveData.times.dhuhr || '13:40');
  const asrAdhan = liveData.times.asr || '16:34';
  const maghribAdhan = liveData.times.maghrib || '19:04';
  const ishaAdhan = liveData.times.isha || '20:17';

  const prayerSchedule = [
    {
      id: 'fajr',
      name: 'Fajr',
      arabic: 'الفجر',
      adhan: fajrAdhan,
      iqama: calculateIqamaTime('fajr', fajrAdhan),
      note: '10 min après l’Adhan',
    },
    {
      id: 'shuruk',
      name: 'Chourouq',
      arabic: 'الشروق',
      adhan: shurukAdhan,
      iqama: '-',
      note: 'Lever du soleil (fin de l’heure de Fajr)',
    },
    {
      id: 'dhuhr',
      name: isFriday ? "Joumou'a (Dhuhr)" : 'Dhuhr',
      arabic: isFriday ? 'الجمعة' : 'الظهر',
      adhan: dhuhrAdhan,
      iqama: isFriday ? 'Après khotba (13h20/30)' : calculateIqamaTime('dhuhr', dhuhrAdhan),
      note: isFriday
        ? 'Adhan pour Khotba 13h · Salat Après khotba (13h20/13h30)'
        : '10 min après l’Adhan',
    },
    {
      id: 'asr',
      name: 'Asr',
      arabic: 'العصر',
      adhan: asrAdhan,
      iqama: calculateIqamaTime('asr', asrAdhan),
      note: '10 min après l’Adhan',
    },
    {
      id: 'maghrib',
      name: 'Maghrib',
      arabic: 'المغرب',
      adhan: maghribAdhan,
      iqama: calculateIqamaTime('maghrib', maghribAdhan),
      note: '5 min après l’Adhan (toujours Adhan + 5 min)',
    },
    {
      id: 'isha',
      name: 'Isha',
      arabic: 'العشاء',
      adhan: ishaAdhan,
      iqama: calculateIqamaTime('isha', ishaAdhan),
      note: '10 min après l’Adhan',
    },
  ];

  // Monthly calendar fully synchronized with Mawaqit data
  const monthlyDays: DayPrayerSchedule[] = getMonthlyCalendar(
    selectedYear,
    selectedMonth,
    liveData.calendar
  );

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

  return (
    <section id="horaires" className="py-14 sm:py-20 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Horaires Officiels & Calendrier Mawaqit</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Horaires de prière & Calendrier complet
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Mosquée SALEM de Saint-Sulpice-la-Pointe. Retrouvez ici les horaires en direct et le calendrier complet mensuel synchronisé avec la borne Mawaqit officielle.
            </p>
          </div>

          {/* Action Links & Refresh */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={fetchLiveMawaqit}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-emerald-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors cursor-pointer"
              title="Vérifier la synchronisation avec Mawaqit"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />
              <span>Synchro : {lastSync}</span>
            </button>

            <a
              href={mawaqitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-2xs"
            >
              <span>Page officielle Mawaqit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* View Switcher Tabs: Today vs Full Monthly Calendar */}
        <div className="flex items-center gap-2 mb-6 p-1.5 bg-stone-100/90 rounded-2xl w-fit border border-stone-200">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'today'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Horaires du jour (En direct)</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Calendrier complet mensuel</span>
          </button>
        </div>

        {/* Official Mosque Committee Notice from Mawaqit on Fajr */}
        {announcement && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300/80 text-amber-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="font-bold block text-amber-900 mb-0.5">
                Information Mawaqit Mosquée SALEM :
              </strong>
              <p className="leading-relaxed">{announcement}</p>
            </div>
          </div>
        )}

        {/* Jumua Special Highlight Notice with exact Khotba time and Salat directly after */}
        <div className="mb-8 p-5 sm:p-6 bg-[#0F3223] text-white rounded-2xl shadow-md border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 font-bold shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Vendredi · Joumou'a - Sermon en français puis en arabe
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                Adhan pour Khotba 13h · Salat Après khotba
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 leading-relaxed">
                La Khotba débute à 13h suivie de la prière à 13h20/13h30. Nous rappelons à l’ensemble des fidèles de veiller scrupuleusement au respect du voisinage, de ne pas bloquer les voies de circulation ni les sorties des riverains.
              </p>
            </div>
          </div>

          <div className="text-xs text-emerald-100/85 bg-emerald-950/70 p-3 rounded-xl border border-emerald-800/80 shrink-0">
            <div className="font-semibold text-amber-300">Consigne de stationnement :</div>
            <div>Respectez les accès riverains Rue des Montamats (pas loin d’ALDI).</div>
          </div>
        </div>

        {/* TAB 1: TODAY'S PRAYER TABLE */}
        {activeTab === 'today' && (
          <div className="bg-[#FAF8F5] rounded-3xl border border-stone-200/90 p-5 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-stone-900">
                  Grille des prières du jour
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Mosquée SALEM · Saint-Sulpice-la-Pointe (81370) · Synchronisé Mawaqit
                </p>
              </div>

              {scheduleInfo.currentPrayer ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-white bg-emerald-800 px-3.5 py-2 rounded-xl shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>
                    Prière en cours : <strong className="text-amber-300">{scheduleInfo.currentPrayer.name}</strong> · Prochaine : {scheduleInfo.nextPrayer.name} dans {scheduleInfo.formattedCountdown}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>
                    Prochaine prière : <strong className="text-stone-900">{scheduleInfo.nextPrayer.name}</strong> dans {scheduleInfo.formattedCountdown}
                  </span>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Prière</th>
                    <th className="py-3 px-4">Nom arabe</th>
                    <th className="py-3 px-4">Adhan (Appel)</th>
                    <th className="py-3 px-4">Iqama (Prière en groupe)</th>
                    <th className="py-3 px-4">Délais & Consignes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm">
                  {prayerSchedule.map((p) => {
                    const isNext = scheduleInfo.nextPrayer.id === p.id;
                    const isCurrent = scheduleInfo.currentPrayer?.id === p.id;
                    return (
                      <tr
                        key={p.name}
                        className={`transition-colors ${
                          isCurrent
                            ? 'bg-emerald-50 font-bold text-emerald-950'
                            : isNext
                            ? 'bg-amber-400/15 font-semibold'
                            : 'hover:bg-white'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-bold text-stone-900 flex items-center gap-2">
                          <span>{p.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-amber-300">
                              En cours
                            </span>
                          )}
                          {isNext && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950">
                              Prochaine
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-emerald-800 font-semibold font-arabic text-lg tracking-normal" dir="rtl">
                          {p.arabic}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900 tabular-nums text-base">
                          {p.adhan}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-700 tabular-nums text-base">
                          {p.iqama}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 text-xs">
                          {p.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Horaires officiels Mawaqit pour Saint-Sulpice-la-Pointe</span>
              </span>
              <button
                onClick={() => setActiveTab('calendar')}
                className="text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
              >
                Voir le calendrier complet de tout le mois →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: FULL MONTHLY CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="bg-[#FAF8F5] rounded-3xl border border-stone-200/90 p-5 sm:p-8 shadow-xs">
            
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer shadow-2xs"
                  aria-label="Mois précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 min-w-[200px] text-center">
                  {MONTH_NAMES_FR[selectedMonth - 1]} {selectedYear}
                </h3>

                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer shadow-2xs"
                  aria-label="Mois suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-3.5 py-2 text-xs font-semibold bg-white border border-stone-300 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-2xs cursor-pointer"
                >
                  {MONTH_NAMES_FR.map((m, idx) => (
                    <option key={m} value={idx + 1}>
                      {m}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => downloadPrayerCalendarPdf(selectedYear, selectedMonth, monthlyDays)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Télécharger le calendrier mensuel en fichier PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger PDF</span>
                </button>
              </div>
            </div>

            {/* Monthly Calendar Table */}
            <div className="overflow-x-auto mt-4 max-h-[620px] overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 bg-[#0F3223] text-white z-10">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Jour</th>
                    <th className="py-2.5 px-2.5 font-semibold">Date</th>
                    <th className="py-2.5 px-2.5 font-semibold">Fajr</th>
                    <th className="py-2.5 px-2.5 font-semibold text-amber-200">Chourouq</th>
                    <th className="py-2.5 px-2.5 font-semibold">Dhuhr</th>
                    <th className="py-2.5 px-2.5 font-semibold">Asr</th>
                    <th className="py-2.5 px-2.5 font-semibold">Maghrib</th>
                    <th className="py-2.5 px-2.5 font-semibold">Isha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {monthlyDays.map((day) => {
                    const isTodayRow = day.isToday;
                    const isFriRow = day.isFriday;

                    return (
                      <tr
                        key={day.day}
                        className={`transition-colors ${
                          isTodayRow
                            ? 'bg-amber-100 font-bold border-l-4 border-l-amber-500'
                            : isFriRow
                            ? 'bg-emerald-50/80 font-medium'
                            : day.day % 2 === 0
                            ? 'bg-white'
                            : 'bg-[#FAF8F5]'
                        } hover:bg-emerald-100/50`}
                      >
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={isFriRow ? 'text-emerald-900 font-bold' : 'text-stone-700'}>
                            {day.dayName}
                          </span>
                          {isTodayRow && (
                            <span className="ml-2 text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-bold">
                              Aujourd'hui
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2.5 font-bold text-stone-900 font-mono">
                          {day.day}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-stone-900">
                          {day.fajr}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-stone-500">
                          {day.shuruk}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-stone-900">
                          {isFriRow ? (
                            <span className="text-emerald-900 font-bold bg-emerald-100/90 px-1.5 py-0.5 rounded" title="Joumou'a : 13h00">
                              {day.dhuhr}
                            </span>
                          ) : (
                            day.dhuhr
                          )}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-stone-900">
                          {day.asr}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-stone-900">
                          {day.maghrib}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-stone-900">
                          {day.isha}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Note under Calendar */}
            <div className="mt-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs text-amber-950 flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Vendredi (Joumou’a) :</strong> Sermon en français puis en arabe · Adhan pour Khotba 13h · Salat Après khotba (13h20 / 13h30).
                </span>
              </span>
              <a
                href={mawaqitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-emerald-900 inline-flex items-center gap-1"
              >
                <span>Vérifier sur Mawaqit</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
