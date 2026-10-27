import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function timeToMinutes(timeStr) {
  const [h, m] = (timeStr || '00:00').split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function addMinutesToTime(timeStr, minutesToAdd) {
  const totalMin = (timeToMinutes(timeStr) + minutesToAdd + 1440) % 1440;
  const newH = Math.floor(totalMin / 60);
  const newM = totalMin % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}

function getParisDate(ref = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(ref);
  const get = (t) => Number(parts.find((p) => p.type === t)?.value || 0);
  return new Date(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
}

function computeRolledOverTimesFromCalendar(calendarData, fallbackTimes) {
  if (!calendarData || !Array.isArray(calendarData)) return fallbackTimes;

  const parisNow = getParisDate();
  const currentMin = parisNow.getHours() * 60 + parisNow.getMinutes();
  const tomorrow = new Date(parisNow.getFullYear(), parisNow.getMonth(), parisNow.getDate() + 1, 12, 0, 0);

  const todayArr = calendarData[parisNow.getMonth()]?.[String(parisNow.getDate())];
  const tomorrowArr = calendarData[tomorrow.getMonth()]?.[String(tomorrow.getDate())] || todayArr;

  if (!todayArr || todayArr.length < 6) return fallbackTimes;

  // Reset all prayer times to tomorrow's schedule ONLY after Isha finishes (Adhan + 10m Iqama + 10m prayer)
  const ishaEndMin = timeToMinutes(todayArr[5]) + 20;
  const activeArr = currentMin > ishaEndMin ? tomorrowArr : todayArr;

  return {
    fajr: activeArr[0],
    shuruk: activeArr[1],
    dhuhr: activeArr[2],
    asr: activeArr[3],
    maghrib: activeArr[4],
    isha: activeArr[5],
  };
}

async function syncLiveData() {
  console.log('🔄 Synchronisation des données en direct (CotizUp & Mawaqit)...');

  // 1. Sync CotizUp Live Campaign
  let currentAmount = 1442;
  let donorsCount = 30;
  const targetAmount = 50000;

  try {
    const cotizupUrl = 'https://www.cotizup.com/@association-salem-1/grand-projet-financement-du-parking-de-la-mosquee-salem';
    const res = await fetch(cotizupUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    if (res.ok) {
      const html = await res.text();
      const amountMatch = html.match(/data-current-amount="([0-9.]+)"/) || html.match(/data-to="([0-9.]+)"/);
      const donorsMatch = html.match(/data-total-donors="([0-9]+)"/) || html.match(/Donateurs\s*\((\d+)\)/i);

      if (amountMatch) {
        currentAmount = parseFloat(amountMatch[1]);
      }
      if (donorsMatch) {
        donorsCount = parseInt(donorsMatch[1], 10);
      }
      console.log(`✅ CotizUp en direct : ${currentAmount}€ récoltés · ${donorsCount} donateurs`);
    } else {
      console.warn(`⚠️ CotizUp a retourné le statut HTTP ${res.status}, utilisation des données de secours.`);
    }
  } catch (err) {
    console.warn('⚠️ Impossible de joindre CotizUp en direct, utilisation du fallback.', err.message);
  }

  const cotizupPayload = {
    success: true,
    source: 'live-cotizup',
    currentAmount,
    targetAmount,
    donorsCount,
    updatedAt: new Date().toISOString(),
  };

  // 2. Fetch live Mawaqit data directly from official page
  let mawaqitTimes = {
    fajr: '06:06',
    shuruk: '07:23',
    dhuhr: '12:39',
    asr: '15:28',
    maghrib: '17:56',
    isha: '19:10',
  };
  let mawaqitIqama = {
    fajr: '06:16',
    shuruk: '-',
    dhuhr: '12:49',
    asr: '15:38',
    maghrib: '18:01',
    isha: '19:20',
  };
  let jumuaTime = '13:00';
  let announcement = "Salam Aleïkoum, chers fidèles, l'Iqama de la prière du Fajr a lieu 10 minutes après l'Adhan.";
  let calendarData = null;

  try {
    const targetUrl = 'https://mawaqit.net/fr/mosquee-salem-de-st-sulpice-la-pointe-saint-sulpice-la-pointe-81370-france-1';
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    if (res.ok) {
      const html = await res.text();
      const timesMatch = html.match(/"times":\s*(\[[^\]]+\])/);
      const shuruqMatch = html.match(/"shuruq":\s*"([^"]+)"/);
      const jumuaMatch = html.match(/"jumua":\s*"([^"]+)"/);
      const noticeMatch = html.match(/Salam Aleïkoum[^<"]+/);
      const calendarMatch = html.match(/"calendar":\s*(\[\{.*?\}\])/s);

      if (calendarMatch) {
        calendarData = JSON.parse(calendarMatch[1]);
      }

      if (timesMatch) {
        const rawTimes = JSON.parse(timesMatch[1]);
        const shuruq = shuruqMatch ? shuruqMatch[1] : '07:23';
        const baseTimes = {
          fajr: rawTimes[0],
          shuruk: shuruq,
          dhuhr: rawTimes[1],
          asr: rawTimes[2],
          maghrib: rawTimes[3],
          isha: rawTimes[4],
        };

        mawaqitTimes = computeRolledOverTimesFromCalendar(calendarData, baseTimes);

        mawaqitIqama = {
          fajr: addMinutesToTime(mawaqitTimes.fajr, 10),
          shuruk: '-',
          dhuhr: addMinutesToTime(mawaqitTimes.dhuhr, 10),
          asr: addMinutesToTime(mawaqitTimes.asr, 10),
          maghrib: addMinutesToTime(mawaqitTimes.maghrib, 5),
          isha: addMinutesToTime(mawaqitTimes.isha, 10),
        };
      }

      if (jumuaMatch) {
        jumuaTime = '13:00'; // Khotba fixée à 13h00 à la mosquée SALEM
      }

      if (noticeMatch) {
        announcement = noticeMatch[0].replace(/&#039;/g, "'");
      }

      console.log(`✅ Mawaqit en direct : Fajr ${mawaqitTimes.fajr} · Chourouq ${mawaqitTimes.shuruk} · Dhuhr ${mawaqitTimes.dhuhr} · Asr ${mawaqitTimes.asr} · Maghrib ${mawaqitTimes.maghrib} · Isha ${mawaqitTimes.isha}`);
    }
  } catch (err) {
    console.warn('⚠️ Impossible de joindre Mawaqit en direct, conservation des horaires récents :', err.message);
  }

  const mawaqitPayload = {
    success: true,
    source: 'live-mawaqit',
    updatedAt: new Date().toISOString(),
    times: mawaqitTimes,
    iqama: mawaqitIqama,
    jumua: jumuaTime,
    announcement,
    calendar: calendarData,
  };

  // Write files to public/api/
  const publicApiDir = path.join(projectRoot, 'public', 'api');
  fs.mkdirSync(publicApiDir, { recursive: true });

  fs.writeFileSync(
    path.join(publicApiDir, 'cotizup.json'),
    JSON.stringify(cotizupPayload, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(publicApiDir, 'mawaqit.json'),
    JSON.stringify(mawaqitPayload, null, 2),
    'utf8'
  );

  console.log('✅ Fichiers public/api/cotizup.json et public/api/mawaqit.json créés avec succès !');
}

syncLiveData();
