import test from 'node:test';
import assert from 'node:assert/strict';
import {
  timeToMinutes,
  minutesToTime,
  formatCountdown,
  calculateIqamaTime,
  getPrayerScheduleInfo,
  getJumuaTime,
  formatShortDateFR,
} from './prayerTimes.ts';

test('calculateIqamaTime strictly enforces Maghrib as Adhan + 5 min', () => {
  assert.equal(calculateIqamaTime('maghrib', '19:04'), '19:09');
  assert.equal(calculateIqamaTime('maghrib', '17:56'), '18:01');
  assert.equal(calculateIqamaTime('maghrib', '18:59'), '19:04');
});

test('calculateIqamaTime enforces official delays for all prayers', () => {
  // Fajr: +10 min delay (Fajr +10min)
  assert.equal(calculateIqamaTime('fajr', '06:06'), '06:16');
  // Dhuhr: +10 min
  assert.equal(calculateIqamaTime('dhuhr', '12:39'), '12:49');
  // Asr: +10 min
  assert.equal(calculateIqamaTime('asr', '15:28'), '15:38');
  // Isha: +10 min
  assert.equal(calculateIqamaTime('isha', '19:10'), '19:20');
});

test('timeToMinutes converts HH:mm accurately', () => {
  assert.equal(timeToMinutes('00:00'), 0);
  assert.equal(timeToMinutes('06:57'), 417);
  assert.equal(timeToMinutes('12:00'), 720);
  assert.equal(timeToMinutes('23:59'), 1439);
});

test('minutesToTime formats back to standard HH:mm', () => {
  assert.equal(minutesToTime(0), '00:00');
  assert.equal(minutesToTime(417), '06:57');
  assert.equal(minutesToTime(720), '12:00');
});

test('formatCountdown outputs clean French time string', () => {
  assert.equal(formatCountdown(0), 'Maintenant');
  assert.equal(formatCountdown(45), '45 min');
  assert.equal(formatCountdown(60), '1h');
  assert.equal(formatCountdown(135), '2h 15min');
});

test('getPrayerScheduleInfo correctly identifies active prayer during Iqama + 10min window', () => {
  // Dhuhr on 20 Oct 2026 is 13:40, Iqama is 13:50 (+10m), finished at 14:00 (+10m).
  const activeDate = new Date('2026-10-20T13:45:00');
  const activeInfo = getPrayerScheduleInfo(activeDate);

  assert.equal(activeInfo.currentPrayer?.id, 'dhuhr');
  assert.equal(activeInfo.nextPrayer.id, 'asr');

  // At 14:05 (past 14:00, 10 min after Iqama):
  // Prayer has completely finished! currentPrayer must be null, transitioning strictly to next prayer
  const finishedDate = new Date('2026-10-20T14:05:00');
  const finishedInfo = getPrayerScheduleInfo(finishedDate);

  assert.equal(finishedInfo.currentPrayer, null);
  assert.equal(finishedInfo.nextPrayer.id, 'asr');
});

test('getPrayerScheduleInfo keeps today schedule before Isha and resets all prayer times to tomorrow only after Isha', () => {
  // At 10:00 on 26/10/2026 (after Fajr 06:04, before Isha 19:11):
  // All displayed times and date remain 26/10/2026 (Fajr 06:04, Dhuhr 12:39, Isha 19:11)
  const daytime26Oct = new Date(2026, 9, 26, 10, 0, 0);
  const daytimeInfo = getPrayerScheduleInfo(daytime26Oct);

  assert.equal(daytimeInfo.isAfterIsha, false);
  assert.equal(formatShortDateFR(daytimeInfo.effectiveDate), '26/10/2026');
  assert.equal(daytimeInfo.effectiveTimes.fajr, '06:04');
  assert.equal(daytimeInfo.effectiveTimes.isha, '19:11');
  assert.equal(daytimeInfo.nextPrayer.id, 'dhuhr');

  // At 21:00 on 26/10/2026 (after Isha 19:11 + Iqama 19:21 + 10 min = 19:31):
  // Full reset to 27/10/2026 for all prayers
  const afterIsha26Oct = new Date(2026, 9, 26, 21, 0, 0);
  const info = getPrayerScheduleInfo(afterIsha26Oct);

  assert.equal(info.isAfterIsha, true);
  assert.equal(formatShortDateFR(info.effectiveDate), '27/10/2026');
  assert.equal(info.nextPrayer.id, 'fajr');
  assert.equal(info.nextPrayer.time, '06:06');
  assert.equal(info.effectiveTimes.fajr, '06:06');
  assert.equal(info.effectiveTimes.shuruk, '07:23');
  assert.equal(info.effectiveTimes.dhuhr, '12:39');
  assert.equal(info.effectiveTimes.asr, '15:28');
  assert.equal(info.effectiveTimes.maghrib, '17:56');
  assert.equal(info.effectiveTimes.isha, '19:10');
});

test('getJumuaTime switches to 13h00 starting from Sunday 25 Oct 2026', () => {
  // Before Sunday (e.g. Saturday 24 Oct)
  const beforeSunday = new Date('2026-10-24T12:00:00');
  assert.equal(getJumuaTime(beforeSunday), '13:40');

  // Sunday 25 Oct (start of winter time)
  const sunday = new Date('2026-10-25T10:00:00');
  assert.equal(getJumuaTime(sunday), '13:00');

  // Friday 30 Oct 2026 (first Friday after switch)
  const fridayWinter = new Date('2026-10-30T11:00:00');
  assert.equal(getJumuaTime(fridayWinter), '13:00');

  const info = getPrayerScheduleInfo(fridayWinter);
  assert.equal(info.isFriday, true);
  assert.equal(info.nextPrayer.id, 'dhuhr');
  assert.equal(info.nextPrayer.name, "Joumou'a");
  assert.equal(info.nextPrayer.time, '13:00');
  assert.equal(info.nextPrayer.iqama, 'Après Khotba');
});
