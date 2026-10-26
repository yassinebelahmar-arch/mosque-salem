import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CalendarDays, ExternalLink } from 'lucide-react';
import { getPrayerScheduleInfo, formatFrenchDate, calculateIqamaTime, getJumuaTime } from '../utils/prayerTimes';

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
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [liveData, setLiveData] = useState<{
    times?: Record<string, string>;
    iqama?: Record<string, string>;
    jumua?: string;
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
  });

  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    fetch(`${cleanBase}api/mawaqit.json`)
      .then((res) => {
        if (!res.ok) return fetch('/api/mawaqit');
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
          });
        }
      })
      .catch(() => {
        // Fallback already pre-initialized
      });

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const effectiveTimes = {
    ...liveData.times,
    ...(overrideTimes || {}),
  };

  const scheduleInfo = getPrayerScheduleInfo(
    currentDate,
    effectiveTimes,
    liveData.iqama,
    liveData.jumua
  );

  // The 5 mandatory daily prayers strictly requested by the user to remain FIXED (not scrolling or dropdown):
  // Fajr, Dhuhr, Asr, Maghrib, Isha
  const isFri = scheduleInfo.isFriday;
  const fajrTime = effectiveTimes?.fajr || '07:00';
  const jumuaTime = getJumuaTime(currentDate); // 13:00 à partir de dimanche
  const dhuhrTime = isFri ? jumuaTime : (effectiveTimes?.dhuhr || '13:40');
  const asrTime = effectiveTimes?.asr || '16:34';
  const maghribTime = effectiveTimes?.maghrib || '19:04';
  const ishaTime = effectiveTimes?.isha || '20:17';

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
                {formatFrenchDate(currentDate)}
              </span>
            </div>

            <span className="text-stone-300 hidden sm:inline">|</span>

            {/* Shuruk info badge */}
            <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
              Chourouq (lever) : <strong className="text-stone-800 font-mono">{effectiveTimes?.shuruk || '08:15'}</strong>
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
                  Prochaine prière : <strong className="font-bold">{scheduleInfo.nextPrayer.name}</strong> dans{' '}
                  <span className="font-mono font-bold text-amber-700">{scheduleInfo.formattedCountdown}</span>
                </span>
              </div>
            )}

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
            <span>Fajr, Dhuhr, Asr, Maghrib et Isha fixes · Synchronisés avec Mawaqit</span>
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
