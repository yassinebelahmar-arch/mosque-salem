import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CalendarDays, ExternalLink, RefreshCw } from 'lucide-react';
import {
  getPrayerScheduleInfo,
  formatFrenchDate,
  formatShortDateFR,
  calculateIqamaTime,
  getJumuaTime,
  getCurrentParisDate,
} from '../utils/prayerTimes';

interface PrayerTimesStripProps {
  mawaqitUrl: string;
  overrideTimes?: Record<string, string>;
  onOpenCalendar?: () => void;
}

export const PrayerTimesStrip: React.FC<PrayerTimesStripProps> = ({
  mawaqitUrl,
  overrideTimes,
  onOpenCalendar,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => getCurrentParisDate());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState<string>('En direct');
  const [liveData, setLiveData] = useState<{
    times?: Record<string, string>;
    iqama?: Record<string, string>;
    jumua?: string;
    calendar?: Array<Record<string, string[]>> | null;
  }>({
    times: {
      fajr: '06:06',
      shuruk: '07:23',
      dhuhr: '12:39',
      asr: '15:28',
      maghrib: '17:56',
      isha: '19:10',
    },
    iqama: {
      fajr: '06:16',
      shuruk: '-',
      dhuhr: '12:49',
      asr: '15:38',
      maghrib: '18:01',
      isha: '19:20',
    },
    jumua: '13:00',
    calendar: null,
  });

  const fetchLiveMawaqit = () => {
    setIsRefreshing(true);
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    fetch(`${cleanBase}api/mawaqit.json?t=${Date.now()}`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) return fetch(`/api/mawaqit?t=${Date.now()}`, { credentials: 'include' });
        return res;
      })
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (data?.times) {
          setLiveData({
            times: data.times,
            iqama: data.iqama,
            jumua: data.jumua,
            calendar: data.calendar || null,
          });
          const parisNow = getCurrentParisDate();
          setCurrentDate(parisNow);
          setLastSync(
            parisNow.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
          );
        }
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

    const syncInterval = setInterval(() => {
      fetchLiveMawaqit();
    }, 5 * 60 * 1000);

    const timer = setInterval(() => {
      setCurrentDate(getCurrentParisDate());
    }, 30000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(timer);
    };
  }, []);

  const scheduleInfo = getPrayerScheduleInfo(
    currentDate,
    {
      ...liveData.times,
      ...(overrideTimes || {}),
    },
    liveData.iqama,
    liveData.jumua,
    liveData.calendar
  );

  // Use the rolled-over times from scheduleInfo (after each prayer finishes, its time rolls over to tomorrow;
  // after Isha, all displayed times and effectiveDate are tomorrow's schedule, e.g. 27/10/2026)
  const effectiveTimes = {
    ...scheduleInfo.effectiveTimes,
    ...(overrideTimes || {}),
  };

  const isFri = scheduleInfo.isFriday;
  const fajrTime = effectiveTimes.fajr || '06:06';
  const jumuaTime = getJumuaTime(scheduleInfo.effectiveDate); // 13:00
  const dhuhrTime = isFri ? jumuaTime : (effectiveTimes.dhuhr || '12:39');
  const asrTime = effectiveTimes.asr || '15:28';
  const maghribTime = effectiveTimes.maghrib || '17:56';
  const ishaTime = effectiveTimes.isha || '19:10';

  const fixedPrayers = [
    {
      id: 'fajr',
      label: 'Fajr',
      arabic: 'الفجر',
      time: fajrTime,
      iqama: calculateIqamaTime('fajr', fajrTime),
    },
    {
      id: 'dhuhr',
      label: isFri ? "Joumou'a" : 'Dhuhr',
      arabic: isFri ? 'الجمعة' : 'الظهر',
      time: dhuhrTime,
      iqama: isFri ? 'Après khotba' : calculateIqamaTime('dhuhr', dhuhrTime),
      subtitle: isFri ? 'Adhan 13h' : undefined,
    },
    {
      id: 'asr',
      label: 'Asr',
      arabic: 'العصر',
      time: asrTime,
      iqama: calculateIqamaTime('asr', asrTime),
    },
    {
      id: 'maghrib',
      label: 'Maghrib',
      arabic: 'المغرب',
      time: maghribTime,
      iqama: calculateIqamaTime('maghrib', maghribTime),
    },
    {
      id: 'isha',
      label: 'Isha',
      arabic: 'العشاء',
      time: ishaTime,
      iqama: calculateIqamaTime('isha', ishaTime),
    },
  ];

  return (
    <section className="bg-white border-y border-stone-200/90 shadow-xs relative z-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        
        {/* Top Info Bar: Date, Countdown & Full Calendar Action */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-stone-700">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold capitalize">
                {formatFrenchDate(scheduleInfo.effectiveDate)} ({formatShortDateFR(scheduleInfo.effectiveDate)})
              </span>
            </div>

            <span className="text-stone-300 hidden sm:inline">|</span>

            {/* Shuruk info badge */}
            <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
              Chourouq (lever) : <strong className="text-stone-800 font-mono">{effectiveTimes.shuruk || '07:23'}</strong>
            </span>

            {/* Jumua note if Friday */}
            {isFri && (
              <>
                <span className="text-stone-300 hidden md:inline">|</span>
                <span className="text-[11px] sm:text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Vendredi (Joumou'a) : Adhan pour Khotba 13h · Salat Après khotba (13h20/13h30)
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status indicator: "En cours" (strictly during prayer + 10 min after Iqama) OR "Prochaine prière" */}
            {scheduleInfo.currentPrayer ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-medium shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span>
                  En cours : <strong className="text-amber-300 font-bold">{scheduleInfo.currentPrayer.name}</strong> · Prochaine : {scheduleInfo.nextPrayer.name} dans{' '}
                  <span className="font-mono font-bold text-amber-300">{scheduleInfo.formattedCountdown}</span>
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-950 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600 animate-pulse shrink-0" />
                <span>
                  Prochaine prière : <strong className="font-bold">{scheduleInfo.nextPrayer.name} ({scheduleInfo.nextPrayer.time})</strong> dans{' '}
                  <span className="font-mono font-bold text-amber-700">{scheduleInfo.formattedCountdown}</span>
                </span>
              </div>
            )}

            {/* Auto-sync indicator */}
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Synchro auto ({lastSync})</span>
            </span>

            {/* Manual Sync button */}
            <button
              onClick={fetchLiveMawaqit}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Synchroniser immédiatement avec Mawaqit"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-700' : 'text-stone-500'}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Synchro...' : 'Synchroniser'}</span>
            </button>

            {/* Complete Calendar button */}
            <button
              onClick={onOpenCalendar}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Consulter le calendrier complet mensuel"
            >
              <CalendarDays className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Calendrier complet</span>
              <span className="sm:hidden">Calendrier</span>
            </button>
          </div>
        </div>

        {/* 
          STRICTLY FIXED 5 PRAYERS GRID
          Never scrolls horizontally, never wraps into a dropdown.
          Grid with 5 equal columns: Fajr, Dhuhr, Asr, Maghrib, Isha
        */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3 pt-3 w-full">
          {fixedPrayers.map((prayer) => {
            const isNext = scheduleInfo.nextPrayer.id === prayer.id;
            const isCurrent = scheduleInfo.currentPrayer?.id === prayer.id;

            return (
              <div
                key={prayer.id}
                className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all border text-center ${
                  isNext
                    ? 'bg-amber-500/10 border-amber-400 text-amber-950 ring-2 ring-amber-400/40 shadow-xs'
                    : isCurrent
                    ? 'bg-emerald-800 text-white border-emerald-700 shadow-xs'
                    : 'bg-stone-50/90 border-stone-200/90 text-stone-800 hover:border-emerald-300'
                }`}
              >
                {/* Labels: French and Arabic */}
                <div className="flex items-center justify-center gap-1 w-full">
                  <span className={`text-[11px] sm:text-xs font-bold truncate ${
                    isCurrent ? 'text-amber-300' : isNext ? 'text-amber-900' : 'text-stone-700'
                  }`}>
                    {prayer.label}
                  </span>
                  <span
                    className={`hidden sm:inline text-[11px] font-arabic ${
                      isCurrent ? 'text-emerald-200' : 'text-stone-400'
                    }`}
                    dir="rtl"
                  >
                    {prayer.arabic}
                  </span>
                </div>

                {/* Adhan Time */}
                <div className={`font-mono text-base sm:text-xl lg:text-2xl font-black tabular-nums tracking-tight my-0.5 sm:my-1 ${
                  isCurrent ? 'text-white' : 'text-stone-900'
                }`}>
                  {prayer.time}
                </div>

                {/* Iqama Time */}
                <div className={`text-[10px] sm:text-[11px] font-mono tracking-tight font-medium ${
                  isCurrent ? 'text-emerald-100' : 'text-stone-500'
                }`}>
                  <span className="opacity-75">Iqama </span>
                  <strong className={isCurrent ? 'text-white' : 'text-emerald-700 font-bold'}>
                    {prayer.iqama}
                  </strong>
                </div>

                {/* Status Indicator */}
                {isNext && (
                  <span className="mt-1 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-amber-400 text-emerald-950">
                    Prochaine
                  </span>
                )}
                {isCurrent && (
                  <span className="mt-1 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-700 text-amber-300 border border-emerald-600">
                    En cours
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom subtle sync notice */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>
              Horaires du {formatShortDateFR(scheduleInfo.effectiveDate)} · Passage automatique au jour suivant après Isha
            </span>
          </span>
          <a
            href={mawaqitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-800 underline inline-flex items-center gap-1"
          >
            <span>Mawaqit officiel</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
