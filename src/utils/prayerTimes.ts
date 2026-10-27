import mawaqitStaticData from '../../public/api/mawaqit.json';

export interface CalculatedPrayer {
  id: string;
  name: string;
  arabicName: string;
  time: string; // HH:mm
  iqama: string;
  isPassed: boolean;
  isNext: boolean;
  isCurrent: boolean;
}

export interface NextPrayerInfo {
  prayers: CalculatedPrayer[];
  effectiveTimes: Record<string, string>;
  effectiveDate: Date;
  isAfterIsha: boolean;
  nextPrayer: CalculatedPrayer;
  currentPrayer: CalculatedPrayer | null;
  timeRemainingMinutes: number;
  formattedCountdown: string;
  isFriday: boolean;
}

// Official Mawaqit schedule for Mosquée SALEM de Saint-Sulpice-la-Pointe (ID: 48643)
export const DEFAULT_PRAYERS = [
  { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', defaultTime: '06:06', iqamaDelayMin: 10 },
  { id: 'shuruk', name: 'Chourouq', arabicName: 'الشروق', defaultTime: '07:23', iqamaDelayMin: 0 },
  { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', defaultTime: '12:39', iqamaDelayMin: 10 },
  { id: 'asr', name: 'Asr', arabicName: 'العصر', defaultTime: '15:28', iqamaDelayMin: 10 },
  { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', defaultTime: '17:56', iqamaDelayMin: 5 },
  { id: 'isha', name: 'Isha', arabicName: 'العشاء', defaultTime: '19:10', iqamaDelayMin: 10 },
];

export const OFFICIAL_MAWAQIT_NOTICE = "Salam Aleïkoum, chers fidèles, l'Iqama de la prière du Fajr a lieu 10 minutes après l'Adhan.";

/**
 * Returns a Date object whose local getters (.getFullYear(), .getMonth(), .getDate(), .getHours(), .getMinutes())
 * reflect the exact wall-clock time in Saint-Sulpice-la-Pointe (Europe/Paris).
 */
export function getCurrentParisDate(referenceDate: Date = new Date()): Date {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(referenceDate);

  const getPart = (type: string) => Number(parts.find((p) => p.type === type)?.value || 0);
  const hour = getPart('hour') % 24;
  return new Date(
    getPart('year'),
    getPart('month') - 1,
    getPart('day'),
    hour,
    getPart('minute'),
    getPart('second')
  );
}

/**
 * Parses "HH:mm" into minutes from midnight
 */
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Converts minutes from midnight into "HH:mm"
 */
export function minutesToTime(minutes: number): string {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Computes official Iqama for a prayer based on Mosquée SALEM delays:
 * - Fajr: +10 min (Fajr +10min)
 * - Dhuhr: +10 min
 * - Asr: +10 min
 * - Maghrib: ALWAYS +5 min from Adhan (e.g. 17:56 -> 18:01)
 * - Isha: +10 min
 */
export function calculateIqamaTime(prayerId: string, adhanTime: string): string {
  const min = timeToMinutes(adhanTime);
  switch (prayerId) {
    case 'fajr':
      return minutesToTime(min + 10);
    case 'dhuhr':
      return minutesToTime(min + 10);
    case 'asr':
      return minutesToTime(min + 10);
    case 'maghrib':
      return minutesToTime(min + 5);
    case 'isha':
      return minutesToTime(min + 10);
    default:
      return adhanTime;
  }
}

/**
 * Formats a remaining duration in minutes into human readable French
 */
export function formatCountdown(minutes: number): string {
  if (minutes <= 0) return 'Maintenant';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) {
    return `${mins} min`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins.toString().padStart(2, '0')}min`;
}

/**
 * Joumou'a time: À partir de dimanche (25 octobre 2026, passage à l'heure d'hiver),
 * l'heure du Joumou'a est fixée à 13h00 (Khotba à 13h00, Salat juste après).
 */
export function getJumuaTime(date: Date = new Date()): string {
  const winterSwitch = new Date(2026, 9, 25, 0, 0, 0); // Dimanche 25 Octobre 2026
  if (date >= winterSwitch) {
    return '13:00';
  }
  return '13:40';
}

/**
 * Looks up the 6 daily times [fajr, shuruk, dhuhr, asr, maghrib, isha] for a specific Date
 * from the Mawaqit 12-month calendar.
 */
export function getDayTimesFromCalendar(
  date: Date,
  calendarOverride?: Array<Record<string, string[]>> | null,
  fallbackTimes?: Record<string, string>
): Record<string, string> {
  const cal = calendarOverride || ((mawaqitStaticData as { calendar?: Array<Record<string, string[]>> }).calendar ?? null);
  const monthIdx = date.getMonth();
  const dayKey = String(date.getDate());
  const dayArr = cal?.[monthIdx]?.[dayKey];

  if (dayArr && dayArr.length >= 6) {
    return {
      fajr: dayArr[0],
      shuruk: dayArr[1],
      dhuhr: dayArr[2],
      asr: dayArr[3],
      maghrib: dayArr[4],
      isha: dayArr[5],
    };
  }

  return {
    fajr: fallbackTimes?.fajr || DEFAULT_PRAYERS[0].defaultTime,
    shuruk: fallbackTimes?.shuruk || DEFAULT_PRAYERS[1].defaultTime,
    dhuhr: fallbackTimes?.dhuhr || DEFAULT_PRAYERS[2].defaultTime,
    asr: fallbackTimes?.asr || DEFAULT_PRAYERS[3].defaultTime,
    maghrib: fallbackTimes?.maghrib || DEFAULT_PRAYERS[4].defaultTime,
    isha: fallbackTimes?.isha || DEFAULT_PRAYERS[5].defaultTime,
  };
}

/**
 * Computes next prayer, countdown, and schedule based on reference time and Mawaqit calendar.
 * Rule:
 * 1. A prayer is active ("En cours") ONLY between Adhan and (Iqama + 10 minutes).
 * 2. Before Isha finishes, all displayed prayer times and the date remain those of today (day D),
 *    while the "Prochaine" indicator moves to the next prayer of today.
 * 3. Once Isha of today finishes (past Iqama Isha + 10 minutes), the full schedule resets at once:
 *    ALL displayed prayer times and the displayed date switch to tomorrow's schedule (day D + 1),
 *    and Fajr of tomorrow is highlighted as the next prayer.
 */
export function getPrayerScheduleInfo(
  currentDate: Date,
  timesOverride?: Record<string, string>,
  _iqamasOverride?: Record<string, string>,
  jumuaOverride?: string,
  calendarOverride?: Array<Record<string, string[]>> | null
): NextPrayerInfo {
  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  const tomorrowDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1,
    12,
    0,
    0
  );

  const todayTimesFromCal = getDayTimesFromCalendar(currentDate, calendarOverride, timesOverride);
  const tomorrowTimesFromCal = getDayTimesFromCalendar(tomorrowDate, calendarOverride, timesOverride);

  // Check if Isha of today has finished (Adhan + 10m Iqama + 10m prayer = Adhan + 20m)
  const todayIshaTime = todayTimesFromCal.isha || timesOverride?.isha || DEFAULT_PRAYERS[5].defaultTime;
  const todayIshaIqamaMin = timeToMinutes(calculateIqamaTime('isha', todayIshaTime));
  const todayIshaEndMin = todayIshaIqamaMin + 10;

  // Global reset after Isha: once Isha is finished, the entire schedule switches to tomorrow (D + 1)
  const isAfterIsha = currentMinutes > todayIshaEndMin;
  const effectiveDate = isAfterIsha ? tomorrowDate : currentDate;
  const effectiveIsFriday = effectiveDate.getDay() === 5;
  const activeDayTimes = isAfterIsha ? tomorrowTimesFromCal : todayTimesFromCal;

  const evaluatedPrayers = DEFAULT_PRAYERS.map((p) => {
    let time = activeDayTimes[p.id] || timesOverride?.[p.id] || p.defaultTime;
    if (effectiveIsFriday && p.id === 'dhuhr') {
      time = jumuaOverride || getJumuaTime(effectiveDate);
    }

    const prayerMin = timeToMinutes(time);
    const dynamicIqama = calculateIqamaTime(p.id, time);
    const iqamaMin =
      effectiveIsFriday && p.id === 'dhuhr'
        ? prayerMin + 25
        : timeToMinutes(dynamicIqama);

    const prayerEndMin = p.id === 'shuruk' ? prayerMin : iqamaMin + 10;

    // If we have already reset to tomorrow's schedule after Isha, no prayer of tomorrow has started or passed yet
    const isCurrentlyActive =
      !isAfterIsha && p.id !== 'shuruk' && currentMinutes >= prayerMin && currentMinutes <= prayerEndMin;
    const isPassed = !isAfterIsha && currentMinutes > prayerEndMin;

    const displayIqama =
      p.id === 'shuruk'
        ? '-'
        : effectiveIsFriday && p.id === 'dhuhr'
        ? 'Après Khotba'
        : dynamicIqama;

    return {
      id: p.id,
      name: effectiveIsFriday && p.id === 'dhuhr' ? "Joumou'a" : p.name,
      arabicName: effectiveIsFriday && p.id === 'dhuhr' ? 'الجمعة' : p.arabicName,
      time,
      iqama: displayIqama,
      isPassed,
      isCurrent: isCurrentlyActive,
    };
  });

  // Exclude shuruk for salat calculations
  const actualSalats = evaluatedPrayers.filter((p) => p.id !== 'shuruk');

  // Currently active salat
  const activeSalat = actualSalats.find((p) => p.isCurrent) || null;

  let nextSalatId = 'fajr';
  let timeRemainingMinutes = 0;

  if (isAfterIsha) {
    // After Isha, we are displaying tomorrow's schedule and the next prayer is tomorrow's Fajr
    const fajrEntry = actualSalats.find((p) => p.id === 'fajr') || actualSalats[0];
    nextSalatId = fajrEntry.id;
    timeRemainingMinutes = 1440 - currentMinutes + timeToMinutes(fajrEntry.time);
  } else {
    const upcomingTodaySalat = actualSalats.find((p) => timeToMinutes(p.time) > currentMinutes);
    if (upcomingTodaySalat) {
      nextSalatId = upcomingTodaySalat.id;
      timeRemainingMinutes = timeToMinutes(upcomingTodaySalat.time) - currentMinutes;
    } else {
      // Currently during Isha (between Isha Adhan and Isha End): next prayer is tomorrow's Fajr
      const tomorrowFajr = tomorrowTimesFromCal.fajr || DEFAULT_PRAYERS[0].defaultTime;
      nextSalatId = 'fajr';
      timeRemainingMinutes = 1440 - currentMinutes + timeToMinutes(tomorrowFajr);
    }
  }

  const effectiveTimes: Record<string, string> = {};
  const enrichedList: CalculatedPrayer[] = evaluatedPrayers.map((p) => {
    effectiveTimes[p.id] = p.time;
    return {
      id: p.id,
      name: p.name,
      arabicName: p.arabicName,
      time: p.time,
      iqama: p.iqama,
      isPassed: p.isPassed,
      isNext: p.id === nextSalatId,
      isCurrent: p.id === activeSalat?.id,
    };
  });

  return {
    prayers: enrichedList,
    effectiveTimes,
    effectiveDate,
    isAfterIsha,
    nextPrayer: enrichedList.find((p) => p.id === nextSalatId) || enrichedList[0],
    currentPrayer: activeSalat ? enrichedList.find((p) => p.id === activeSalat.id) || null : null,
    timeRemainingMinutes,
    formattedCountdown: formatCountdown(timeRemainingMinutes),
    isFriday: effectiveIsFriday,
  };
}

/**
 * Returns formatted French date (e.g. "mardi 27 octobre 2026")
 */
export function formatFrenchDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Returns short numeric French date DD/MM/YYYY (e.g. "27/10/2026")
 */
export function formatShortDateFR(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
