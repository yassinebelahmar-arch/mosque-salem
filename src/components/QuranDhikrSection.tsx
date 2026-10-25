import React, { useState, useRef } from 'react';
import {
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  Heart,
  Moon,
  Sun
} from 'lucide-react';

interface SurahData {
  id: string;
  nameArabic: string;
  nameFrench: string;
  number: number;
  versesCount: number;
  revelation: string;
  audioUrl?: string;
  verses: {
    number: number;
    arabic: string;
    phonetic: string;
    translation: string;
  }[];
}

const SURAHS: SurahData[] = [
  {
    id: 'fatiha',
    nameArabic: 'الفاتحة',
    nameFrench: 'Al-Fatiha (L’Ouverture)',
    number: 1,
    versesCount: 7,
    revelation: 'Mecquoise',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    verses: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        phonetic: 'Bismi Allāhi ar-raḥmāni ar-raḥīmi',
        translation: 'Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux.',
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        phonetic: 'Al-ḥamdu lillāhi rabbi al-‘ālamīna',
        translation: 'Louange à Allah, Seigneur de l’univers.',
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        phonetic: 'Ar-raḥmāni ar-raḥīmi',
        translation: 'Le Tout Miséricordieux, le Très Miséricordieux,',
      },
      {
        number: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        phonetic: 'Māliki yawmi ad-dīni',
        translation: 'Maître du Jour de la rétribution.',
      },
      {
        number: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        phonetic: 'Iyyāka na‘budu wa-iyyāka nasta‘īnu',
        translation: 'C’est Toi [Seul] que nous adorons, et c’est Toi [Seul] dont nous implorons le secours.',
      },
      {
        number: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        phonetic: 'Ihdinā aṣ-ṣirāṭa al-mustaqīma',
        translation: 'Guide-nous dans le droit chemin,',
      },
      {
        number: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        phonetic: 'Ṣirāṭa alladhīna an‘amta ‘alayhim ghayri al-maghḍūbi ‘alayhim walā aḍ-ḍāllīna',
        translation: 'Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.',
      },
    ],
  },
  {
    id: 'ayat-kursi',
    nameArabic: 'آية الكرسي',
    nameFrench: 'Ayat Al-Kursi (Verset du Trône · 2:255)',
    number: 255,
    versesCount: 1,
    revelation: 'Médinoise',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3',
    verses: [
      {
        number: 255,
        arabic:
          'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        phonetic:
          'Allāhu lā ilāha illā huwa al-ḥayyu al-qayyūmu, lā ta’khudhuhu sinatun walā nawmun, lahu mā fī as-samāwāti wamā fī al-arḍi, man dhā alladhī yashfa‘u ‘indahu illā bi-idhnihi, ya‘lamu mā bayna aydīhim wamā khalfahum, walā yuḥīṭūna bi-shay’in min ‘ilmihi illā bimā shā’a, wasi‘a kursiyyuhu as-samāwāti wal-arḍa, walā ya’ūduhu ḥifẓuhumā, wahuwa al-‘aliyyu al-‘aẓīmu.',
        translation:
          'Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même "Al-Qayyum". Ni somnolence ni sommeil ne Le saisissent. À Lui appartient tout ce qui est dans les cieux et sur la terre. Qui peut intercéder auprès de Lui sans Sa permission ? Il sait leur passé et leur futur. Et, de Sa science, ils n’embrassent que ce qu’Il veut. Son Trône "Kursiy" déborde les cieux et la terre, dont la garde ne Lui coûte aucune peine. Et Il est le Très Haut, le Très Grand.',
      },
    ],
  },
  {
    id: 'ikhlas',
    nameArabic: 'الإخلاص',
    nameFrench: 'Al-Ikhlas (Le Monothéisme Pur)',
    number: 112,
    versesCount: 4,
    revelation: 'Mecquoise',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6221.mp3',
    verses: [
      {
        number: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        phonetic: 'Qul huwa Allāhu aḥadun',
        translation: 'Dis : « Il est Allah, Unique.',
      },
      {
        number: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        phonetic: 'Allāhu aṣ-ṣamadu',
        translation: 'Allah, Le Seul à être imploré pour ce que nous désirons.',
      },
      {
        number: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        phonetic: 'Lam yalid walam yūlad',
        translation: 'Il n’a jamais engendré, n’a pas été engendré non plus.',
      },
      {
        number: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        phonetic: 'Walam yakun lahu kufuwan aḥadun',
        translation: 'Et nul n’est égal à Lui. »',
      },
    ],
  },
  {
    id: 'falaq',
    nameArabic: 'الفلق',
    nameFrench: 'Al-Falaq (L’Aube Naissante)',
    number: 113,
    versesCount: 5,
    revelation: 'Mecquoise',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3',
    verses: [
      {
        number: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        phonetic: 'Qul a‘ūdhu bi-rabbi al-falaqi',
        translation: 'Dis : « Je cherche protection auprès du Seigneur de l’aube naissante,',
      },
      {
        number: 2,
        arabic: 'مِن شَرِّ مَا خَلَقَ',
        phonetic: 'Min sharri mā khalaqa',
        translation: 'contre le mal des êtres qu’Il a créés,',
      },
      {
        number: 3,
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        phonetic: 'Wamin sharri ghāsiqin idhā waqaba',
        translation: 'contre le mal de l’obscurité quand elle s’approfondit,',
      },
      {
        number: 4,
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        phonetic: 'Wamin sharri an-naffāthāti fī al-‘uqadi',
        translation: 'contre le mal de celles qui soufflent sur les nœuds,',
      },
      {
        number: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        phonetic: 'Wamin sharri ḥāsidin idhā ḥasada',
        translation: 'et contre le mal de l’envieux quand il envie. »',
      },
    ],
  },
  {
    id: 'nas',
    nameArabic: 'الناس',
    nameFrench: 'An-Nas (Les Hommes)',
    number: 114,
    versesCount: 6,
    revelation: 'Mecquoise',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3',
    verses: [
      {
        number: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        phonetic: 'Qul a‘ūdhu bi-rabbi an-nāsi',
        translation: 'Dis : « Je cherche protection auprès du Seigneur des hommes,',
      },
      {
        number: 2,
        arabic: 'مَلِكِ النَّاسِ',
        phonetic: 'Maliki an-nāsi',
        translation: 'Le Souverain des hommes,',
      },
      {
        number: 3,
        arabic: 'إِلَٰهِ النَّاسِ',
        phonetic: 'Ilāhi an-nāsi',
        translation: 'Dieu des hommes,',
      },
      {
        number: 4,
        arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        phonetic: 'Min sharri al-waswāsi al-khannāsi',
        translation: 'contre le mal du mauvais conseiller, furtif,',
      },
      {
        number: 5,
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        phonetic: 'Alladhī yuwaswisu fī ṣudūri an-nāsi',
        translation: 'qui souffle le mal dans les poitrines des hommes,',
      },
      {
        number: 6,
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        phonetic: 'Mina al-jinnati wan-nāsi',
        translation: 'qu’il soit parmi les djinns ou les hommes. »',
      },
    ],
  },
];

interface DhikrItem {
  id: string;
  category: 'priere' | 'matin_soir' | 'quotidien';
  categoryLabel: string;
  title: string;
  arabic: string;
  phonetic: string;
  translation: string;
  count: number;
  virtue: string;
}

const DHIKR_ITEMS: DhikrItem[] = [
  {
    id: 'dhikr-post-salat-1',
    category: 'priere',
    categoryLabel: 'Après la prière',
    title: 'Istighfar (Demande de pardon)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ ، أَسْتَغْفِرُ اللَّهَ ، أَسْتَغْفِرُ اللَّهَ',
    phonetic: 'Astaghfiru Llāh, Astaghfiru Llāh, Astaghfiru Llāh',
    translation: 'Je demande pardon à Allah (3 fois).',
    count: 3,
    virtue: 'Prononcé immédiatement après la salutation finale de chaque prière obligatoire.',
  },
  {
    id: 'dhikr-post-salat-2',
    category: 'priere',
    categoryLabel: 'Après la prière',
    title: 'Allahumma Antas-Salam',
    arabic:
      'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    phonetic:
      'Allāhumma Anta as-Salāmu wa minka as-Salām, tabārakta yā dhal-jalāli wal-ikrām',
    translation:
      'Ô Allah, Tu es la Paix et de Toi provient la Paix. Béni sois-Tu, Ô Digne de majesté et de générosité.',
    count: 1,
    virtue: 'Hadith authentique rapporté par Muslim.',
  },
  {
    id: 'dhikr-tasbih-salat',
    category: 'priere',
    categoryLabel: 'Après la prière',
    title: 'Tasbih des 33 invocations',
    arabic: 'سُبْحَانَ اللَّهِ (33) · الْحَمْدُ لِلَّهِ (33) · اللَّهُ أَكْبَرُ (33)',
    phonetic: 'Subḥān Allāh (33 fois) · Al-ḥamdu lillāh (33 fois) · Allāhu Akbar (33 fois)',
    translation:
      'Gloire à Allah (33 fois), Louange à Allah (33 fois), Allah est le Plus Grand (33 fois), et pour compléter à 100 : Lā ilāha illallāh waḥdahu lā sharīka lah...',
    count: 33,
    virtue: 'Pardonne les péchés même s’ils égalent l’écume de la mer (Rapporté par Muslim).',
  },
  {
    id: 'dhikr-matin-soir-1',
    category: 'matin_soir',
    categoryLabel: 'Matin & Soir',
    title: 'SubhanAllahi wa bihamdihi',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    phonetic: 'Subḥān Allāhi wa bi-ḥamdihi, Subḥān Allāhi al-‘Aẓīm',
    translation: 'Gloire et louange à Allah, Gloire à Allah l’Immense.',
    count: 100,
    virtue: 'Deux paroles légères sur la langue, lourdes sur la balance, aimées du Tout Miséricordieux (Al-Bukhari & Muslim).',
  },
  {
    id: 'dhikr-matin-soir-2',
    category: 'matin_soir',
    categoryLabel: 'Matin & Soir',
    title: 'Protection absolue (Bismillah)',
    arabic:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    phonetic:
      'Bismi Allāhi alladhī lā yaḍurru ma‘a ismihi shay’un fī al-arḍi walā fī as-samā’i wa-huwa as-samī‘u al-‘alīmu',
    translation:
      'Au nom d’Allah par le nom Duquel rien ne peut nuire sur terre ni dans les cieux, et Il est l’Audient, l’Omniscient.',
    count: 3,
    virtue: 'Rien ne pourra lui nuire jusqu’au soir ou jusqu’au matin (At-Tirmidhi & Abu Dawud).',
  },
  {
    id: 'dhikr-mosquee',
    category: 'quotidien',
    categoryLabel: 'À la mosquée',
    title: 'Invocation en entrant à la mosquée',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    phonetic: 'Allāhumma iftaḥ lī abwāba raḥmatika',
    translation: 'Ô Allah, ouvre-moi les portes de Ta miséricorde.',
    count: 1,
    virtue: 'À prononcer du pied droit en entrant dans la Mosquée SALEM.',
  },
];

export const QuranDhikrSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dhikr' | 'quran' | 'tasbih'>('dhikr');
  const [selectedSurahId, setSelectedSurahId] = useState<string>('fatiha');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showPhonetic, setShowPhonetic] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [textSize, setTextSize] = useState<'md' | 'lg' | 'xl'>('lg');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Digital Tasbih State
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTarget] = useState<number>(33);
  const [selectedTasbihDhikr, setSelectedTasbihDhikr] = useState<string>('subhanallah');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedSurah = SURAHS.find((s) => s.id === selectedSurahId) || SURAHS[0];

  // Web Audio click generator for tactile tasbih
  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const handleTasbihClick = () => {
    playClickSound();
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    setTasbihCount((prev) => {
      const next = prev + 1;
      return next;
    });
  };

  const resetTasbih = () => {
    setTasbihCount(0);
  };

  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false));
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tasbihOptions = [
    { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', french: 'SubhanAllah (Gloire à Allah)' },
    { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', french: 'Alhamdulillah (Louange à Allah)' },
    { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', french: 'Allahu Akbar (Allah est le Plus Grand)' },
    { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', french: 'Astaghfirullah (Pardon d’Allah)' },
    { id: 'lailahaillallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', french: 'La ilaha illallah (Nulle divinité sauf Allah)' },
  ];

  return (
    <section id="coran-dhikr" className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Spiritualité & Méditation</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Saint Coran & Invocations (Dhikr)
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Retrouvez une sélection de sourates essentielles avec texte arabe vocalise, phonétique, traduction française, récitation audio et le chapelet interactif (Tasbih).
            </p>
          </div>

          {/* Navigation Pill Switcher: Invocations first, then Sourates, then Tasbih */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <button
              onClick={() => {
                setActiveTab('dhikr');
                if (audioRef.current) audioRef.current.pause();
                setIsPlayingAudio(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'dhikr'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Invocations (Adhkar)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('quran');
                if (audioRef.current) audioRef.current.pause();
                setIsPlayingAudio(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'quran'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Sourates du Coran</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('tasbih');
                if (audioRef.current) audioRef.current.pause();
                setIsPlayingAudio(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'tasbih'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tasbih Virtuel</span>
            </button>
          </div>
        </div>

        {/* 1. QURAN TAB */}
        {activeTab === 'quran' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Surah List Selector */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block px-1 mb-2">
                Sélectionnez une sourate :
              </span>

              {SURAHS.map((surah) => {
                const isSelected = surah.id === selectedSurahId;
                return (
                  <button
                    key={surah.id}
                    onClick={() => {
                      setSelectedSurahId(surah.id);
                      setIsPlayingAudio(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-700 shadow-md ring-2 ring-emerald-600/30'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {surah.number}
                      </div>
                      <div>
                        <div className="font-semibold text-sm leading-snug">
                          {surah.nameFrench}
                        </div>
                        <div className={`text-[11px] ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>
                          {surah.versesCount} verset{surah.versesCount > 1 ? 's' : ''} · {surah.revelation}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`text-lg font-arabic font-bold shrink-0 ${
                        isSelected ? 'text-amber-300' : 'text-emerald-800'
                      }`}
                      dir="rtl"
                    >
                      {surah.nameArabic}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Surah Reader & Controls */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-sm">
              
              {/* Surah Header & Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                      Sourate n°{selectedSurah.number}
                    </span>
                    <span className="text-xs text-stone-500">
                      {selectedSurah.revelation} · {selectedSurah.versesCount} versets
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                    {selectedSurah.nameFrench}
                  </h3>
                </div>

                {/* Display Controls & Audio */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Audio Player */}
                  {selectedSurah.audioUrl && (
                    <>
                      <audio
                        ref={audioRef}
                        src={selectedSurah.audioUrl}
                        onEnded={() => setIsPlayingAudio(false)}
                      />
                      <button
                        onClick={handleToggleAudio}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isPlayingAudio
                            ? 'bg-amber-400 text-emerald-950 shadow-sm animate-pulse'
                            : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlayingAudio ? 'Pause récitation' : 'Écouter récitation'}</span>
                      </button>
                    </>
                  )}

                  {/* Phonetic Toggle */}
                  <button
                    onClick={() => setShowPhonetic(!showPhonetic)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      showPhonetic
                        ? 'bg-stone-200 text-stone-900 border-stone-300 font-bold'
                        : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                    }`}
                    title="Afficher/Masquer la phonétique"
                  >
                    Phonétique
                  </button>

                  {/* Translation Toggle */}
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      showTranslation
                        ? 'bg-stone-200 text-stone-900 border-stone-300 font-bold'
                        : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                    }`}
                    title="Afficher/Masquer la traduction française"
                  >
                    Français
                  </button>
                </div>
              </div>

              {/* Bismillah Header (except for at-Tawbah) */}
              <div className="py-6 text-center border-b border-stone-100">
                <div className="font-arabic text-2xl sm:text-3xl text-emerald-900 leading-relaxed" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <div className="text-xs text-stone-500 italic mt-1">
                  Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux
                </div>
              </div>

              {/* Verses List */}
              <div className="divide-y divide-stone-100 space-y-4 pt-4">
                {selectedSurah.verses.map((verse) => (
                  <div key={verse.number} className="pt-4 pb-4 space-y-3 group">
                    {/* Verse number and quick actions */}
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                        Verset {verse.number}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(`${verse.arabic}\n${verse.phonetic}\n${verse.translation}`, `v-${verse.number}`)
                        }
                        className="hover:text-emerald-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="Copier le verset"
                      >
                        {copiedId === `v-${verse.number}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Arabic Verse */}
                    <div
                      className={`font-arabic text-right leading-loose text-stone-900 tracking-wide ${
                        textSize === 'xl' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                      }`}
                      dir="rtl"
                    >
                      {verse.arabic}
                      <span className="inline-flex items-center justify-center w-7 h-7 mx-2 rounded-full border border-emerald-600 text-emerald-800 text-xs font-mono font-bold align-middle">
                        {verse.number}
                      </span>
                    </div>

                    {/* Phonetic */}
                    {showPhonetic && (
                      <p className="text-xs sm:text-sm text-stone-600 italic font-mono bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                        {verse.phonetic}
                      </p>
                    )}

                    {/* Translation */}
                    {showTranslation && (
                      <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                        {verse.translation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* 2. DHIKR TAB */}
        {activeTab === 'dhikr' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DHIKR_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900">
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        Répéter {item.count} fois
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-stone-900">
                      {item.title}
                    </h3>

                    {/* Arabic Text */}
                    <div className="p-4 bg-emerald-950 text-amber-200 rounded-2xl text-right font-arabic text-xl sm:text-2xl leading-relaxed shadow-inner" dir="rtl">
                      {item.arabic}
                    </div>

                    {/* Phonetic */}
                    <div className="text-xs text-stone-600 italic font-mono bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                      {item.phonetic}
                    </div>

                    {/* Translation */}
                    <div className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                      {item.translation}
                    </div>
                  </div>

                  {/* Virtue notice and copy */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="italic flex-1 pr-2">{item.virtue}</span>
                    <button
                      onClick={() =>
                        copyToClipboard(`${item.arabic}\n${item.phonetic}\n${item.translation}`, item.id)
                      }
                      className="p-1.5 hover:text-emerald-800 rounded-lg hover:bg-stone-100 transition-colors shrink-0 cursor-pointer"
                      title="Copier le Dhikr"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. DIGITAL TASBIH TAB */}
        {activeTab === 'tasbih' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-md text-center space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chapelet électronique interactif (Sebha)</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                Compteur de Dhikr
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Choisissez votre formule d'évocation et touchez le compteur pour comptabiliser vos louanges.
              </p>
            </div>

            {/* Dhikr formula selector */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {tasbihOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedTasbihDhikr(opt.id);
                    setTasbihCount(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedTasbihDhikr === opt.id
                      ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-600/30'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {opt.arabic}
                </button>
              ))}
            </div>

            {/* Selected formula display */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="font-arabic text-2xl sm:text-3xl text-emerald-950 font-bold" dir="rtl">
                {tasbihOptions.find((o) => o.id === selectedTasbihDhikr)?.arabic}
              </div>
              <div className="text-xs text-stone-600 mt-1">
                {tasbihOptions.find((o) => o.id === selectedTasbihDhikr)?.french}
              </div>
            </div>

            {/* Target Goal Selector */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-stone-600">
              <span>Objectif :</span>
              {[33, 99, 100].map((t) => (
                <button
                  key={t}
                  onClick={() => setTasbihTarget(t)}
                  className={`px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                    tasbihTarget === t
                      ? 'bg-amber-400 border-amber-500 text-emerald-950 font-bold'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Big Interactive Tactile Button */}
            <div className="py-4">
              <button
                onClick={handleTasbihClick}
                className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white shadow-2xl hover:shadow-emerald-900/40 border-4 border-amber-400/80 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none group"
              >
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-200 group-hover:text-amber-300">
                  Toucher pour compter
                </span>
                <span className="font-mono text-5xl sm:text-6xl font-black text-white tabular-nums tracking-tight">
                  {tasbihCount}
                </span>
                <span className="text-xs text-emerald-200/80 font-mono">
                  / {tasbihTarget}
                </span>
              </button>
            </div>

            {/* Goal achieved message */}
            {tasbihCount >= tasbihTarget && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>MachaAllah ! Objectif de {tasbihTarget} complété avec succès !</span>
              </div>
            )}

            {/* Reset Button */}
            <div className="pt-2">
              <button
                onClick={resetTasbih}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl border border-stone-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser le compteur</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
