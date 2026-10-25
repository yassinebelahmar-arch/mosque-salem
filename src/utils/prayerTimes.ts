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
  nextPrayer: CalculatedPrayer;
  currentPrayer: CalculatedPrayer | null;
  timeRemainingMinutes: number;
  formattedCountdown: string;
  isFriday: boolean;
}

// Official Mawaqit schedule for Mosquée SALEM de Saint-Sulpice-la-Pointe (ID: 48643)
export const DEFAULT_PRAYERS = [
  { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', defaultTime: '06:57', iqamaDelayMin: 10 },
  { id: 'shuruk', name: 'Chourouq', arabicName: 'الشروق', defaultTime: '08:14', iqamaDelayMin: 0 },
  { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', defaultTime: '13:40', iqamaDelayMin: 10 },
  { id: 'asr', name: 'Asr', arabicName: 'العصر', defaultTime: '16:36', iqamaDelayMin: 10 },
  { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', defaultTime: '19:07', iqamaDelayMin: 5 },
  { id: 'isha', name: 'Isha', arabicName: 'العشاء', defaultTime: '20:20', iqamaDelayMin: 10 },
];

export const OFFICIAL_MAWAQIT_NOTICE = "Salam Aleïkoum, chers fidèles, l'Iqama de la prière du Fajr a lieu 10 minutes après l'Adhan.";

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
 * - Maghrib: ALWAYS +5 min from Adhan (e.g. 19:04 -> 19:09, 19:05 -> 19:10)
 * - Isha: +10 min
 */
export function calculateIqamaTime(prayerId: string, adhanTime: string): string {
  const min = timeToMinutes(adhanTime);
  switch (prayerId) {
    case 'fajr':
      return minutesToTime(min + 10); // Fajr +10 min
    case 'dhuhr':
      return minutesToTime(min + 10);
    case 'asr':
      return minutesToTime(min + 10);
    case 'maghrib':
      return minutesToTime(min + 5); // STRICTLY +5 min
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
 * Computes next prayer and countdown based on a reference time and prayer schedule
 * Rule: A prayer is active ("En cours") ONLY between Adhan and (Iqama + 10 minutes).
 * Past 10 minutes after Iqama, the prayer is complete and interface transitions to next upcoming prayer.
 */
export function getPrayerScheduleInfo(
  currentDate: Date,
  timesOverride?: Record<string, string>,
  iqamasOverride?: Record<string, string>,
  jumuaOverride?: string
): NextPrayerInfo {
  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
  const isFri = currentDate.getDay() === 5;

  const prayersList: CalculatedPrayer[] = DEFAULT_PRAYERS.map((p) => {
    let time = timesOverride?.[p.id] || p.defaultTime;
    // À partir de dimanche, l'heure du Joumou'a est à 13h00
    if (isFri && p.id === 'dhuhr') {
      time = jumuaOverride || getJumuaTime(currentDate);
    }
    const prayerMin = timeToMinutes(time);
    
    // Compute dynamic Iqama based on strict Mosquée SALEM delays
    const dynamicIqama = calculateIqamaTime(p.id, time);
    // Strict mosque rule: Fajr is 0 min delay, Maghrib is ALWAYS +5 min delay
    const iqamaStr = isFri && p.id === 'dhuhr'
      ? 'Après Khotba'
      : (p.id === 'maghrib' || p.id === 'fajr'
          ? dynamicIqama
          : (iqamasOverride?.[p.id] && iqamasOverride[p.id] !== '-' ? iqamasOverride[p.id] : dynamicIqama));

    const iqamaMin = (isFri && p.id === 'dhuhr')
      ? prayerMin + 25 // Approximate Khotba duration + prayer
      : timeToMinutes(dynamicIqama);

    // Prayer is officially finished 10 minutes after Iqama
    const prayerEndMin = iqamaMin + 10;

    const isCurrentlyActive = currentMinutes >= prayerMin && currentMinutes <= prayerEndMin;

    return {
      id: p.id,
      name: isFri && p.id === 'dhuhr' ? "Joumou'a" : p.name,
      arabicName: isFri && p.id === 'dhuhr' ? 'الجمعة' : p.arabicName,
      time,
      iqama: iqamaStr,
      isPassed: currentMinutes > prayerEndMin,
      isNext: false,
      isCurrent: isCurrentlyActive,
    };
  });

  // Exclude shuruk for salat calculations (shuruk is sunrise, not a prayer)
  const actualSalats = prayersList.filter((p) => p.id !== 'shuruk');

  // Currently active salat (only if within [prayerMin, iqamaMin + 10])
  const activeSalat = actualSalats.find((p) => p.isCurrent) || null;

  // Next upcoming salat
  let nextSalat = actualSalats.find((p) => timeToMinutes(p.time) > currentMinutes);
  let timeRemainingMinutes = 0;

  if (nextSalat) {
    timeRemainingMinutes = timeToMinutes(nextSalat.time) - currentMinutes;
  } else {
    // All salats today have completed: next prayer is Fajr tomorrow
    const fajr = actualSalats.find((p) => p.id === 'fajr') || actualSalats[0];
    nextSalat = fajr;
    timeRemainingMinutes = 1440 - currentMinutes + timeToMinutes(fajr.time);
  }

  // Mark flags in prayersList
  const enrichedList = prayersList.map((p) => ({
    ...p,
    isNext: p.id === nextSalat?.id,
    isCurrent: p.id === activeSalat?.id,
  }));

  return {
    nextPrayer: enrichedList.find((p) => p.id === nextSalat?.id) || enrichedList[0],
    currentPrayer: activeSalat ? enrichedList.find((p) => p.id === activeSalat.id) || null : null,
    timeRemainingMinutes,
    formattedCountdown: formatCountdown(timeRemainingMinutes),
    isFriday: isFri,
  };
}

/**
 * Returns formatted French date
 */
export function formatFrenchDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
