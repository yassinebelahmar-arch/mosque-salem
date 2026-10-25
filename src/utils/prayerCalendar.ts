/**
 * Prayer Calendar generator for Mosquée SALEM (Saint-Sulpice-la-Pointe, 81370)
 * Coordinates: 43.7744° N, 1.6853° E
 * Timezone: Europe/Paris (CET/CEST)
 * Calculation standard: French Islamic standard (UOIF 12° / Mawaqit standard)
 */

export interface DayPrayerSchedule {
  day: number;
  dateStr: string; // "YYYY-MM-DD"
  dayName: string; // "Lundi", "Mardi", etc.
  isFriday: boolean;
  isToday: boolean;
  fajr: string;
  shuruk: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  iqamaFajr: string;
  iqamaDhuhr: string;
  iqamaAsr: string;
  iqamaMaghrib: string;
  iqamaIsha: string;
}

// Helper to format minutes to HH:mm
function formatHM(minutes: number): string {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = Math.floor(norm % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Solar calculation for Saint-Sulpice-la-Pointe (approx 43.77° N, 1.68° E)
function calculateDayTimes(year: number, month: number, day: number): Omit<DayPrayerSchedule, 'day' | 'dateStr' | 'dayName' | 'isFriday' | 'isToday'> {
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  
  // Day of year
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  
  // Solar declination & Equation of Time
  const b = (2 * Math.PI * (dayOfYear - 81)) / 365;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); // minutes
  const declination = 23.45 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365) * (Math.PI / 180); // radians
  
  // Latitude for Saint-Sulpice
  const lat = 43.7744 * (Math.PI / 180);
  const lon = 1.6853; // degrees East
  
  // Daylight Saving Time check for France (last Sunday of March to last Sunday of October)
  const isDST = (() => {
    const marchLastSun = 31 - new Date(Date.UTC(year, 2, 31)).getUTCDay();
    const octLastSun = 31 - new Date(Date.UTC(year, 9, 31)).getUTCDay();
    const currentDayVal = month * 100 + day;
    const dstStart = 3 * 100 + marchLastSun;
    const dstEnd = 10 * 100 + octLastSun;
    return currentDayVal >= dstStart && currentDayVal < dstEnd;
  })();

  const timezoneOffsetHours = isDST ? 2 : 1; // UTC+2 in summer, UTC+1 in winter
  
  // Solar noon in local minutes from midnight
  const solarNoon = 12 * 60 - lon * 4 - eot + timezoneOffsetHours * 60;
  
  // Zenith hour angle helper
  const hourAngle = (zenithAngleDeg: number) => {
    const zRad = zenithAngleDeg * (Math.PI / 180);
    const cosH = (Math.cos(zRad) - Math.sin(lat) * Math.sin(declination)) / (Math.cos(lat) * Math.cos(declination));
    if (cosH > 1 || cosH < -1) return 0;
    return (Math.acos(cosH) * 180) / Math.PI * 4; // minutes
  };

  // 12 degrees angle for Fajr and Isha (standard in France / Mawaqit Mosquée SALEM)
  const fajrAngle = 90 + 12;
  const ishaAngle = 90 + 12;
  const sunriseAngle = 90.833; // standard atmospheric refraction
  
  const fajrHA = hourAngle(fajrAngle);
  const sunriseHA = hourAngle(sunriseAngle);
  
  // Asr (Shafi'i: shadow = object length)
  const asrAlt = Math.atan(1 / (1 + Math.tan(Math.abs(lat - declination)))) * (180 / Math.PI);
  const asrHA = hourAngle(90 - asrAlt);
  
  const ishaHA = hourAngle(ishaAngle);

  const fajrMin = Math.round(solarNoon - fajrHA);
  const shurukMin = Math.round(solarNoon - sunriseHA);
  const dhuhrMin = Math.round(solarNoon + 4); // 4 min after noon
  const asrMin = Math.round(solarNoon + asrHA);
  const maghribMin = Math.round(solarNoon + sunriseHA + 2); // sunset + 2m
  const ishaMin = Math.round(solarNoon + ishaHA);

  const fajrStr = formatHM(fajrMin);
  const shurukStr = formatHM(shurukMin);
  const dhuhrStr = formatHM(dhuhrMin);
  const asrStr = formatHM(asrMin);
  const maghribStr = formatHM(maghribMin);
  const ishaStr = formatHM(ishaMin);

  return {
    fajr: fajrStr,
    shuruk: shurukStr,
    dhuhr: dhuhrStr,
    asr: asrStr,
    maghrib: maghribStr,
    isha: ishaStr,
    iqamaFajr: formatHM(fajrMin + 10), // Mosquée SALEM rule: Fajr +10 min
    iqamaDhuhr: formatHM(dhuhrMin + 10),
    iqamaAsr: formatHM(asrMin + 10),
    iqamaMaghrib: formatHM(maghribMin + 5),
    iqamaIsha: formatHM(ishaMin + 10),
  };
}

export const MONTH_NAMES_FR = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export const DAY_NAMES_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

/**
 * Helper to convert HH:mm to minutes
 */
function parseHM(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/**
 * Returns prayer schedule for all days of the given month (1 to 12) and year.
 * If live Mawaqit calendar data is supplied, uses exact Mawaqit times.
 */
export function getMonthlyCalendar(
  year: number,
  month: number,
  mawaqitCalendar?: Array<Record<string, string[]>> | null
): DayPrayerSchedule[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const isCurrentYearMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  const currentDay = today.getDate();

  const mawaqitMonth = mawaqitCalendar && mawaqitCalendar[month - 1] ? mawaqitCalendar[month - 1] : null;

  const list: DayPrayerSchedule[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dDate = new Date(year, month - 1, d);
    const dayOfWeek = dDate.getDay();
    const dayName = DAY_NAMES_FR[dayOfWeek];
    const isFriday = dayOfWeek === 5;
    const isToday = isCurrentYearMonth && d === currentDay;

    let times: Omit<DayPrayerSchedule, 'day' | 'dateStr' | 'dayName' | 'isFriday' | 'isToday'>;

    const mawaqitDay = mawaqitMonth ? mawaqitMonth[String(d)] : null;
    if (mawaqitDay && mawaqitDay.length >= 6) {
      const [fajr, shuruk, dhuhr, asr, maghrib, isha] = mawaqitDay;
      const dhuhrMin = parseHM(dhuhr);
      const asrMin = parseHM(asr);
      const maghribMin = parseHM(maghrib);
      const ishaMin = parseHM(isha);

      times = {
        fajr,
        shuruk,
        dhuhr,
        asr,
        maghrib,
        isha,
        iqamaFajr: formatHM(parseHM(fajr) + 10), // Mosquée SALEM: Fajr +10 min
        iqamaDhuhr: formatHM(dhuhrMin + 10),
        iqamaAsr: formatHM(asrMin + 10),
        iqamaMaghrib: formatHM(maghribMin + 5),
        iqamaIsha: formatHM(ishaMin + 10),
      };
    } else {
      times = calculateDayTimes(year, month, d);
    }

    // À partir de dimanche (25 octobre 2026), Joumou'a le vendredi est à 13h00
    if (isFriday) {
      const winterSwitch = new Date(2026, 9, 25, 0, 0, 0);
      if (dDate >= winterSwitch) {
        times.dhuhr = '13:00';
      }
    }

    list.push({
      day: d,
      dateStr: `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`,
      dayName,
      isFriday,
      isToday,
      ...times,
    });
  }

  return list;
}
