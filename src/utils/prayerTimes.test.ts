import test from 'node:test';
import assert from 'node:assert/strict';
import {
  timeToMinutes,
  minutesToTime,
  formatCountdown,
  calculateIqamaTime,
  getPrayerScheduleInfo,
  getJumuaTime,
} from './prayerTimes.ts';

test('calculateIqamaTime strictly enforces Maghrib as Adhan + 5 min', () => {
  assert.equal(calculateIqamaTime('maghrib', '19:04'), '19:09');
  assert.equal(calculateIqamaTime('maghrib', '19:10'), '19:15');
  assert.equal(calculateIqamaTime('maghrib', '18:59'), '19:04');
});

test('calculateIqamaTime enforces official delays for all prayers', () => {
  // Fajr: +10 min delay (Fajr +10min)
  assert.equal(calculateIqamaTime('fajr', '07:00'), '07:10');
  // Dhuhr: +10 min
  assert.equal(calculateIqamaTime('dhuhr', '13:40'), '13:50');
  // Asr: +10 min
  assert.equal(calculateIqamaTime('asr', '16:34'), '16:44');
  // Isha: +10 min
  assert.equal(calculateIqamaTime('isha', '20:17'), '20:27');
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
  // Dhuhr is 13:40, Iqama is 13:50 (+10m), finished at 14:00 (+10m).
  // At 13:45, prayer is active (isCurrent === true)
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

test('getPrayerScheduleInfo correctly wraps to Fajr tomorrow night when all salats have finished', () => {
  // At 23:00 (after Isha 20:20 + Iqama 20:30 + 10 min = 20:40)
  const lateDate = new Date('2026-10-20T23:00:00');
  const info = getPrayerScheduleInfo(lateDate);

  assert.equal(info.nextPrayer.id, 'fajr');
  // Isha is finished, so currentPrayer is null (no prayer en cours)
  assert.equal(info.currentPrayer, null);
  assert.equal(info.timeRemainingMinutes, 477);
  assert.equal(info.formattedCountdown, '7h 57min');
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
