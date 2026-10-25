import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

let cachedMawaqitData: any = null;
let lastMawaqitCacheTime = 0;
const MAWAQIT_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let cachedCotizupData: any = null;
let lastCotizupCacheTime = 0;
const COTIZUP_CACHE_TTL_MS = 60 * 1000; // 1 minute live sync

function addMinutesToTime(timeStr: string, minutesToAdd: number): string {
  const [h, m] = (timeStr || '00:00').split(':').map(Number);
  const totalMin = ((h || 0) * 60 + (m || 0) + minutesToAdd) % 1440;
  const newH = Math.floor(totalMin / 60);
  const newM = totalMin % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
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
          const jumuaMatch = html.match(/"jumua":\s*"([^"]+)"/);
          const noticeMatch = html.match(/Salam Aleïkoum[^<"]+/);
          const calendarMatch = html.match(/"calendar":\s*(\[\{.*?\}\])/s);

          const rawTimes = timesMatch ? JSON.parse(timesMatch[1]) : ["07:00", "13:40", "16:34", "19:04", "20:17"];
          const shuruq = shuruqMatch ? shuruqMatch[1] : "08:16";
          const jumua = jumuaMatch ? jumuaMatch[1] : "13:41";
          const notice = noticeMatch ? noticeMatch[0].replace(/&#039;/g, "'") : "Salam Aleïkoum, chers fidèles, nous vous informons qu'étant donné l'heure tardive de la Salat Fajr, les 10 min d'attente entre le Adhan et la prière ont été supprimées.";
          const calendar = calendarMatch ? JSON.parse(calendarMatch[1]) : null;

          const fajr = rawTimes[0] || "07:00";
          const dhuhr = rawTimes[1] || "13:40";
          const asr = rawTimes[2] || "16:34";
          const maghrib = rawTimes[3] || "19:04";
          const isha = rawTimes[4] || "20:17";

          cachedMawaqitData = {
            success: true,
            source: 'live-mawaqit',
            updatedAt: new Date().toISOString(),
            times: {
              fajr,
              shuruk: shuruq || "08:16",
              dhuhr,
              asr,
              maghrib,
              isha,
            },
            iqama: {
              fajr: addMinutesToTime(fajr, 10), // Fajr +10 min
              dhuhr: addMinutesToTime(dhuhr, 10), // +10 min
              asr: addMinutesToTime(asr, 10),     // +10 min
              maghrib: addMinutesToTime(maghrib, 5), // STRICTLY +5 min (e.g. 19:04 -> 19:09)
              isha: addMinutesToTime(isha, 10),   // +10 min
            },
            jumua: '13:00', // Joumou'a : 13h00 à partir de dimanche
            announcement: notice,
            calendar: calendar,
          };
          lastMawaqitCacheTime = now;

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(cachedMawaqitData));
        } catch (err) {
          const defaultMaghrib = "19:04";
          const defaultDhuhr = "13:40";
          const fallback = {
            success: true,
            source: 'fallback-official',
            updatedAt: new Date().toISOString(),
            times: {
              fajr: "07:00",
              shuruk: "08:16",
              dhuhr: defaultDhuhr,
              asr: "16:34",
              maghrib: defaultMaghrib,
              isha: "20:17",
            },
            iqama: {
              fajr: "07:10",
              dhuhr: "13:50",
              asr: "16:44",
              maghrib: addMinutesToTime(defaultMaghrib, 5), // 19:09
              isha: "20:27",
            },
            jumua: '13:00', // Joumou'a : 13h00 à partir de dimanche
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

          const currentAmount = amountMatch ? parseFloat(amountMatch[1]) : 1437;
          const donorsCount = donorsMatch ? parseInt(donorsMatch[1], 10) : 29;

          cachedCotizupData = {
            success: true,
            source: 'live-cotizup',
            currentAmount: currentAmount || 1437,
            targetAmount: 50000,
            donorsCount: donorsCount || 29,
            updatedAt: new Date().toISOString(),
          };
          lastCotizupCacheTime = now;

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(cachedCotizupData));
        } catch (err) {
          const fallback = {
            success: true,
            source: 'fallback-cache',
            currentAmount: cachedCotizupData?.currentAmount || 1437,
            targetAmount: 50000,
            donorsCount: cachedCotizupData?.donorsCount || 29,
            updatedAt: new Date().toISOString(),
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(fallback));
        }
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
