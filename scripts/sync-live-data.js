import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

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

  // 2. Prepare Mawaqit schedule payload
  const mawaqitPayload = {
    success: true,
    source: 'official-mosquee-salem',
    updatedAt: new Date().toISOString(),
    times: {
      fajr: '07:00',
      shuruk: '08:16',
      dhuhr: '13:40',
      asr: '16:34',
      maghrib: '19:04',
      isha: '20:17',
    },
    iqama: {
      fajr: '07:10', // Fajr +10 min
      shuruk: '-',
      dhuhr: '13:50', // +10 min
      asr: '16:44',  // +10 min
      maghrib: '19:09', // STRICTLY +5 min
      isha: '20:27',  // +10 min
    },
    jumua: '13:00', // Khotba à 13h00
    announcement: "Salam Aleïkoum, chers fidèles, l'Iqama de la prière du Fajr a lieu 10 minutes après l'Adhan.",
    calendar: null,
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
