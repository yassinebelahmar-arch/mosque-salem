import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

let cachedMawaqitData: any = null;
let lastMawaqitCacheTime = 0;
const MAWAQIT_CACHE_TTL_MS = 60 * 1000; // 1 minute

let cachedCotizupData: any = null;
let lastCotizupCacheTime = 0;
const COTIZUP_CACHE_TTL_MS = 60 * 1000; // 1 minute live sync

function timeToMinutes(timeStr: string): number {
  const [h, m] = (timeStr || '00:00').split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function addMinutesToTime(timeStr: string, minutesToAdd: number): string {
  const totalMin = (timeToMinutes(timeStr) + minutesToAdd + 1440) % 1440;
  const newH = Math.floor(totalMin / 60);
  const newM = totalMin % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}

function getParisDate(ref: Date = new Date()): Date {
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
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value || 0);
  return new Date(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
}

function computeRolledOverTimesFromCalendar(
  calendarData: Array<Record<string, string[]>> | null,
  fallbackTimes: Record<string, string>
): Record<string, string> {
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

function mosquesDataApiPlugin(): Plugin {
  return {
    name: 'mosques-data-api-plugin',
    configureServer(server) {
      // 1. Mawaqit Live Prayer Times & Full 12-Month Calendar
      server.middlewares.use('/api/mawaqit', async (_req, res) => {
        const now = Date.now();
        if (cachedMawaqitData && now - lastMawaqitCacheTime < MAWAQIT_CACHE_TTL_MS) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(cachedMawaqitData));
          return;
        }

        try {
          const targetUrl = 'https://mawaqit.net/fr/mosquee-salem-de-st-sulpice-la-pointe-saint-sulpice-la-pointe-81370-france-1';
          const response = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml',
            },
          });
          const html = await response.text();

          const timesMatch = html.match(/"times":\s*(\[[^\]]+\])/);
          const shuruqMatch = html.match(/"shuruq":\s*"([^"]+)"/);
          const noticeMatch = html.match(/Salam Aleïkoum[^<"]+/);
          const calendarMatch = html.match(/"calendar":\s*(\[\{.*?\}\])/s);

          const rawTimes = timesMatch ? JSON.parse(timesMatch[1]) : ['06:06', '12:39', '15:28', '17:56', '19:10'];
          const shuruq = shuruqMatch ? shuruqMatch[1] : '07:23';
          const notice = noticeMatch
            ? noticeMatch[0].replace(/&#039;/g, "'")
            : "Salam Aleïkoum, chers fidèles, l'Iqama de la prière du Fajr a lieu 10 minutes après l'Adhan.";
          const calendar = calendarMatch ? JSON.parse(calendarMatch[1]) : null;

          const baseTimes = {
            fajr: rawTimes[0] || '06:06',
            shuruk: shuruq || '07:23',
            dhuhr: rawTimes[1] || '12:39',
            asr: rawTimes[2] || '15:28',
            maghrib: rawTimes[3] || '17:56',
            isha: rawTimes[4] || '19:10',
          };

          const rolledTimes = computeRolledOverTimesFromCalendar(calendar, baseTimes);

          cachedMawaqitData = {
            success: true,
            source: 'live-mawaqit',
            updatedAt: new Date().toISOString(),
            times: rolledTimes,
            iqama: {
              fajr: addMinutesToTime(rolledTimes.fajr, 10),
              shuruk: '-',
              dhuhr: addMinutesToTime(rolledTimes.dhuhr, 10),
              asr: addMinutesToTime(rolledTimes.asr, 10),
              maghrib: addMinutesToTime(rolledTimes.maghrib, 5),
              isha: addMinutesToTime(rolledTimes.isha, 10),
            },
            jumua: '13:00',
            announcement: notice,
            calendar: calendar,
          };
          lastMawaqitCacheTime = now;

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(cachedMawaqitData));
        } catch (err) {
          const fallback = {
            success: true,
            source: 'fallback-official',
            updatedAt: new Date().toISOString(),
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
            announcement: "Salam Aleïkoum, chers fidèles, l'Iqama de la prière du Fajr a lieu 10 minutes après l'Adhan.",
            calendar: null,
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(fallback));
        }
      });

      // 2. CotizUp Live Campaign Automatic Sync
      server.middlewares.use('/api/cotizup', async (_req, res) => {
        const now = Date.now();
        if (cachedCotizupData && now - lastCotizupCacheTime < COTIZUP_CACHE_TTL_MS) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(cachedCotizupData));
          return;
        }

        try {
          const cotizupUrl = 'https://www.cotizup.com/@association-salem-1/grand-projet-financement-du-parking-de-la-mosquee-salem';
          const response = await fetch(cotizupUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml',
            },
          });
          const html = await response.text();

          const amountMatch = html.match(/data-current-amount="([0-9.]+)"/) || html.match(/data-to="([0-9.]+)"/);
          const donorsMatch = html.match(/data-total-donors="([0-9]+)"/) || html.match(/Donateurs\s*\((\d+)\)/i) || html.match(/(\d+)\s*participants/i);

          const currentAmount = amountMatch ? parseFloat(amountMatch[1]) : 1442;
          const donorsCount = donorsMatch ? parseInt(donorsMatch[1], 10) : 30;

          cachedCotizupData = {
            success: true,
            source: 'live-cotizup',
            currentAmount: currentAmount || 1442,
            targetAmount: 50000,
            donorsCount: donorsCount || 30,
            updatedAt: new Date().toISOString(),
          };
          lastCotizupCacheTime = now;

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(cachedCotizupData));
        } catch (err) {
          const fallback = {
            success: true,
            source: 'fallback-cache',
            currentAmount: cachedCotizupData?.currentAmount || 1442,
            targetAmount: 50000,
            donorsCount: cachedCotizupData?.donorsCount || 30,
            updatedAt: new Date().toISOString(),
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(fallback));
        }
      });

      // 3. Robust binary static file server for /assets/aistudio/* and /documents/*
      const serveStaticAsset = (baseDir: string, reqPath: string, res: any) => {
        const decodedPath = decodeURIComponent(reqPath.split('?')[0] || '');
        const filePath = path.join(path.resolve(__dirname, baseDir), decodedPath);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const stat = fs.statSync(filePath);
          const ext = path.extname(filePath).toLowerCase();
          const contentType =
            ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.png'
              ? 'image/png'
              : 'application/pdf';
          res.setHeader('Content-Type', contentType);
          res.setHeader('Content-Length', stat.size);
          res.setHeader('Cache-Control', 'no-store');
          fs.createReadStream(filePath).pipe(res);
          return true;
        }
        return false;
      };

      server.middlewares.use('/mosque-salem/assets/aistudio', (req, res, next) => {
        if (serveStaticAsset('public/assets/aistudio', req.url || '', res)) return;
        next();
      });

      server.middlewares.use('/assets/aistudio', (req, res, next) => {
        if (serveStaticAsset('public/assets/aistudio', req.url || '', res)) return;
        next();
      });

      server.middlewares.use('/mosque-salem/documents', (req, res, next) => {
        if (serveStaticAsset('public/documents', req.url || '', res)) return;
        next();
      });

      server.middlewares.use('/documents', (req, res, next) => {
        if (serveStaticAsset('public/documents', req.url || '', res)) return;
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/mosque-salem/',
    plugins: [react(), tailwindcss(), mosquesDataApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
