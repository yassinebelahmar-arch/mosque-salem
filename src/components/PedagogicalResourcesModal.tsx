import React, { useState, useEffect } from 'react';
import {
  X,
  Folder,
  Download,
  ChevronRight,
  ChevronLeft,
  Printer,
  Sparkles,
  List,
  Loader2
} from 'lucide-react';
import mosqueeLogo from '../assets/images/mosquee-salem-logo.png';
import { downloadPedagogicalPdf } from '../utils/generatePedagogicalPdf';

export type PedagogicalCategory = 'priere' | 'islam' | 'arabe' | 'alphabet';

export interface PedagogicalSection {
  themeNumber: number;
  title: string;
  subtitle?: string;
  arabicTitle?: string;
  intro?: string;
  content: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: string;
}

export interface PedagogicalDocument {
  id: string;
  folder: PedagogicalCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  pagesCount: number;
  description: string;
  pdfFileName: string;
  pdfPath: string;
  fallbackPath?: string;
  imagePreviewUrl?: string;
  sections: PedagogicalSection[];
}

export const PEDAGOGICAL_DOCUMENTS: PedagogicalDocument[] = [
  // =========================================================================
  // 1. CATÉGORIE COURS ARABE : COURS ARABE A1 BASIQUE (SANS AUCUNE FUSION)
  // =========================================================================
  {
    id: 'cours-arabe-a1',
    folder: 'arabe',
    categoryLabel: 'Cours Arabe',
    title: "Cours de Langue Arabe – Niveau A1 Basique",
    subtitle: "Fichier original : 916218149-Cours-Arabe-A1-Basique.pdf (12 pages)",
    badge: 'Catégorie : Cours Arabe A1',
    pagesCount: 12,
    description: "Manuel officiel Niveau A1 (12 pages, non modifié) : lettres isolées avec exemples, voyelles courtes et longues, pronoms personnels et possessifs, phrases verbales et nominales, vocabulaire et 3 dialogues.",
    pdfFileName: '916218149-Cours-Arabe-A1-Basique.pdf',
    pdfPath: 'assets/aistudio/916218149-Cours-Arabe-A1-Basique_2d31bcdd.pdf',
    fallbackPath: 'documents/cours-arabe/916218149-Cours-Arabe-A1-Basique.pdf',
    sections: [
      {
        themeNumber: 1,
        title: "1. Alphabet Arabe – Lettres isolées & Objectifs du cours (Page 1)",
        subtitle: "Objectifs du niveau A1 et tableau des 28 lettres isolées avec exemples",
        arabicTitle: "الحروف العربية المفردة",
        intro: "Ce cours de niveau A1 vous permet de : Lire et écrire l’alphabet arabe, comprendre et prononcer des mots simples, former des phrases simples utiles au quotidien, et lire de courts textes ou dialogues.",
        content: [
          "Tableau officiel de la page 1 du cours Arabe A1 Basique (Lettre, Nom, Son en français, Exemple) :"
        ],
        table: {
          headers: ['Lettre', 'Nom', 'Son en français', 'Exemple'],
          rows: [
            ['ا', 'Alif', 'a (avion)', 'أسد (asad = lion)'],
            ['ب', 'Ba', 'b', 'باب (bāb = porte)'],
            ['ت', 'Ta', 't', 'تمر (tamr = datte)'],
            ['ث', 'Tha', 'th (thank)', 'ثعلب (thaʿlab = renard)'],
            ['ج', 'Jim', 'j (je)', 'جمل (jamal = chameau)'],
            ['ح', 'Ha', 'h aspiré', 'حب (ḥubb = amour)'],
            ['خ', 'Kha', 'kh (loch)', 'خبز (khubz = pain)'],
            ['د', 'Dal', 'd', 'دينار (dīnār = dinar)'],
            ['ذ', 'Dhal', 'dh (this)', 'ذهب (dhahab = or)'],
            ['ر', 'Ra', 'r roulé', 'رسول (rasūl = messager)'],
            ['ز', 'Zay', 'z', 'زيت (zayt = huile)'],
            ['س', 'Sin', 's', 'سلام (salām = paix)'],
            ['ش', 'Shin', 'sh', 'شمس (shams = soleil)'],
            ['ص', 'Sad', 's emphatique', 'صديق (ṣadīq = ami)'],
            ['ض', 'Dad', 'd emphatique', 'ضوء (ḍawʾ = lumière)'],
            ['ط', 'Ta', 't emphatique', 'طريق (ṭarīq = chemin)'],
            ['ظ', 'Za', 'z emphatique (dh)', 'ظرف (ẓarf = enveloppe)'],
            ['ع', 'ʿAyn', 'ʿ (coup de gorge)', 'عقل (ʿaql = raison)'],
            ['غ', 'Ghayn', "gh (fr. 'r' guttural)", 'غيم (ghaym = nuage)'],
            ['ف', 'Fa', 'f', 'فم (fam = bouche)'],
            ['ق', 'Qaf', 'q (k guttural)', 'قلب (qalb = cœur)'],
            ['ك', 'Kaf', 'k', 'كتاب (kitāb = livre)'],
            ['ل', 'Lam', 'l', 'لبن (laban = lait)'],
            ['م', 'Mim', 'm', 'ماء (māʾ = eau)'],
            ['ن', 'Nun', 'n', 'نار (nār = feu)'],
            ['ه', 'Ha', 'h', 'هواء (hawāʾ = air)'],
            ['و', 'Waw', 'w / ou', 'وردة (warda = rose)'],
            ['ي', 'Ya', 'y / i', 'يد (yad = main)']
          ]
        }
      },
      {
        themeNumber: 2,
        title: "2. Les 28 Lettres avec Mots Exemples",
        subtitle: "Application directe sur du vocabulaire illustré",
        arabicTitle: "أمثلة على الحروف المفردة",
        content: [
          "Pour chaque consonne, un mot repère permet d'assimiler son audition et sa prononciation correcte :"
        ],
        table: {
          headers: ['Lettre', 'Son', 'Transcription', 'Arabe', 'Français'],
          rows: [
            ['Alif', 'a (avion)', 'asad', 'أسد', 'Lion'],
            ['Ba', 'b', 'bāb', 'باب', 'Porte'],
            ['Ta', 't', 'tamr', 'تمر', 'Datte'],
            ['Tha', 'th', 'thaʿlab', 'ثعلب', 'Renard'],
            ['Jim', 'j', 'jamal', 'جمل', 'Chameau'],
            ['Ha', 'h aspiré', 'ḥubb', 'حب', 'Amour'],
            ['Kha', 'kh', 'khubz', 'خبز', 'Pain'],
            ['Dal', 'd', 'dīnār', 'دينار', 'Dinar'],
            ['Dhal', 'dh', 'dhahab', 'ذهب', 'Or'],
            ['Ra', 'r roulé', 'rasūl', 'رسول', 'Messager'],
            ['Zay', 'z', 'zayt', 'زيت', 'Huile'],
            ['Sin', 's', 'salām', 'سلام', 'Paix'],
            ['Shin', 'sh', 'shams', 'شمس', 'Soleil'],
            ['Sad', 's emphatique', 'ṣadīq', 'صديق', 'Ami'],
            ['Dad', 'd emphatique', 'ḍawʾ', 'ضوء', 'Lumière'],
            ['Ta', 't emphatique', 'ṭarīq', 'طريق', 'Chemin'],
            ['Za', 'z emphatique', 'ẓarf', 'ظرف', 'Enveloppe'],
            ['Ayn', 'coup de gorge', 'ʿaql', 'عقل', 'Raison'],
            ['Ghayn', 'gh', 'ghaym', 'غيم', 'Nuage'],
            ['Fa', 'f', 'fam', 'فم', 'Bouche'],
            ['Qaf', 'q', 'qalb', 'قلب', 'Cœur'],
            ['Kaf', 'k', 'kitāb', 'كتاب', 'Livre'],
            ['Lam', 'l', 'laban', 'لبن', 'Lait'],
            ['Mim', 'm', 'māʾ', 'ماء', 'Eau'],
            ['Nun', 'n', 'nār', 'نار', 'Feu'],
            ['Ha', 'h', 'hawāʾ', 'هواء', 'Air'],
            ['Waw', 'w / ou', 'warda', 'وردة', 'Rose'],
            ['Ya', 'y / i', 'yad', 'يد', 'Main']
          ]
        }
      },
      {
        themeNumber: 3,
        title: "3. Les Voyelles Courtes & Longues",
        subtitle: "Harakât et lettres de prolongation (Madd)",
        arabicTitle: "الحركات القصيرة وحروف المد الطويلة",
        content: [
          "L'arabe vocalise ses consonnes grâce à 3 voyelles courtes (placées au-dessus ou en-dessous des lettres) et 3 lettres de prolongation pour les sons longs :"
        ],
        table: {
          headers: ['Type', 'Signe / Lettre', 'Nom', 'Son', 'Exemple', 'Signification'],
          rows: [
            ['Courte', 'َ (au-dessus)', 'Fatha (فَتْحَة)', 'a', 'بَ (ba)', 'Son a bref'],
            ['Courte', 'ِ (en-dessous)', 'Kasra (كَسْرَة)', 'i', 'بِ (bi)', 'Son i bref'],
            ['Courte', 'ُ (au-dessus)', 'Damma (ضَمَّة)', 'ou', 'بُ (bou)', 'Son ou bref'],
            ['Longue', 'ـا (Alif)', 'Alif madd', 'ā (a long)', 'باب (bāb)', 'Porte'],
            ['Longue', 'ـي (Ya)', 'Ya madd', 'ī (i long)', 'كبير (kabīr)', 'Grand'],
            ['Longue', 'ـو (Waw)', 'Waw madd', 'ū (ou long)', 'نور (nūr)', 'Lumière']
          ]
        }
      },
      {
        themeNumber: 4,
        title: "4. Les Pronoms Personnels",
        subtitle: "Singulier, duel et pluriel en arabe",
        arabicTitle: "الضمائر المنفصلة",
        content: [
          "Contrairement au français qui n'a que le singulier et le pluriel, la langue arabe possède une forme spécifique pour deux personnes : le duel (المثنى)."
        ],
        table: {
          headers: ['Nombre', 'Arabe', 'Français', 'Transcription', 'Usage'],
          rows: [
            ['Singulier', 'أنا', 'Je (m/f)', 'anā', '1ère personne'],
            ['Singulier', 'أنتَ', 'Tu (masculin)', 'anta', '2ème personne masc.'],
            ['Singulier', 'أنتِ', 'Tu (féminin)', 'anti', '2ème personne fém.'],
            ['Singulier', 'هو', 'Il', 'huwa', '3ème personne masc.'],
            ['Singulier', 'هي', 'Elle', 'hiya', '3ème personne fém.'],
            ['Duel', 'أنتما', 'Vous deux (m/f)', 'antumā', 'Deux personnes adressées'],
            ['Duel', 'هما', 'Eux deux / Elles deux', 'humā', 'Deux personnes absentes'],
            ['Pluriel', 'نحن', 'Nous', 'naḥnu', 'Groupe du locuteur'],
            ['Pluriel', 'أنتم', 'Vous (masculin / mixte)', 'antum', 'Groupe masculin'],
            ['Pluriel', 'أنتن', 'Vous (féminin)', 'antunna', 'Groupe exclusivement féminin'],
            ['Pluriel', 'هم', 'Ils (masculin / mixte)', 'hum', 'Groupe masculin'],
            ['Pluriel', 'هن', 'Elles (féminin)', 'hunna', 'Groupe exclusivement féminin']
          ]
        }
      },
      {
        themeNumber: 5,
        title: "5. Expressions du Quotidien",
        subtitle: "Salutations, présentations et formules usuelles",
        arabicTitle: "عبارات يومية بسيطة",
        content: [
          "Formules pratiques indispensables pour communiquer avec politesse et bienveillance :"
        ],
        table: {
          headers: ['Français', 'Arabe', 'Transcription Phonetique'],
          rows: [
            ['Que la paix soit sur vous (Bonjour)', 'السَّلاَمُ عَلَيْكُمْ', 'as-salāmu ʿalaykum'],
            ['Et sur vous la paix (Réponse)', 'وَعَلَيْكُمُ السَّلاَمُ', 'wa ʿalaykumu s-salām'],
            ['Comment vas-tu ? (à un garçon)', 'كَيْفَ حَالُكَ ؟', 'kayfa ḥāluka ?'],
            ['Comment vas-tu ? (à une fille)', 'كَيْفَ حَالُكِ ؟', 'kayfa ḥāluki ?'],
            ['Je vais bien, merci', 'أَنَا بِخَيْرٍ، شُكْراً', 'anā bikhayr, shukran'],
            ['Quel est ton nom ? (garçon)', 'مَا اسْمُكَ ؟', 'mā ismuka ?'],
            ['Quel est ton nom ? (fille)', 'مَا اسْمُكِ ؟', 'mā ismuki ?'],
            ['Mon nom est...', 'اسْمِي...', 'ismī...'],
            ['Bienvenue', 'أَهْلاً وَسَهْلاً', 'ahlan wa sahlan']
          ]
        }
      },
      {
        themeNumber: 6,
        title: "6. Les Pronoms Possessifs Affixés",
        subtitle: "Exprimer l'appartenance (Exemple avec : كتاب = livre)",
        arabicTitle: "الضمائر المتصلة (الملكية)",
        content: [
          "En arabe, la possession s'exprime en attachant un suffixe directement à la fin du nom :"
        ],
        table: {
          headers: ['Personne', 'Suffixe', 'Arabe', 'Transcription', 'Sens'],
          rows: [
            ['Mon (1ère sing.)', 'ـي', 'كِتَابِي', 'kitābī', 'Mon livre'],
            ['Ton (2ème sing. m.)', 'ـكَ', 'كِتَابُكَ', 'kitābuka', 'Ton livre (masculin)'],
            ['Ton (2ème sing. f.)', 'ـكِ', 'كِتَابُكِ', 'kitābuki', 'Ton livre (féminin)'],
            ['Son (3ème sing. m.)', 'ـهُ', 'كِتَابُهُ', 'kitābuhu', 'Son livre (à lui)'],
            ['Son (3ème sing. f.)', 'ـهَا', 'كِتَابُهَا', 'kitābuhā', 'Son livre (à elle)'],
            ['Notre (1ère plur.)', 'ـنَا', 'كِتَابُنَا', 'kitābunā', 'Notre livre'],
            ['Votre (2ème plur. m.)', 'ـكُمْ', 'كِتَابُكُمْ', 'kitābukum', 'Votre livre (masculin)'],
            ['Votre (2ème plur. f.)', 'ـكُنَّ', 'كِتَابُكُنَّ', 'kitābukunna', 'Votre livre (féminin)'],
            ['Leur (3ème plur. m.)', 'ـهُمْ', 'كِتَابُهُمْ', 'kitābuhum', 'Leur livre (masculin)'],
            ['Leur (3ème plur. f.)', 'ـهُنَّ', 'كِتَابُهُنَّ', 'kitābuhunna', 'Leur livre (féminin)']
          ]
        }
      },
      {
        themeNumber: 7,
        title: "7. Les Phrases en Arabe : Verbales & Nominales",
        subtitle: "Structure grammaticale fondamentale",
        arabicTitle: "الجملة الفعلية والجملة الاسمية",
        content: [
          "La langue arabe distingue deux types fondamentaux de phrases :",
          "1. La phrase verbale (الجملة الفعلية) : Elle commence par un verbe et décrit une action. Structure : Verbe (فعل) + Sujet (فاعل) + Complément (مفعول به).",
          "Exemple : كَتَبَ الطَّالِبُ الدَّرْسَ (kataba ṭ-ṭālibu d-darsa = L'élève a écrit la leçon).",
          "2. La phrase nominale (الجملة الاسمية) : Elle commence par un nom ou un pronom et décrit un état. Structure : Sujet (مبتدأ) + Attribut / Prédicat (خبر).",
          "Exemple : الجَوُّ جَمِيلٌ (al-jawwu jamīlun = Le temps est beau)."
        ],
        table: {
          headers: ['Type', 'Phrase Arabe', 'Transcription', 'Traduction'],
          rows: [
            ['Verbale', 'قَرَأَ الوَلَدُ الكِتَابَ', 'qaraʾa al-waladu al-kitāba', 'Le garçon a lu le livre.'],
            ['Verbale', 'أَكَلَتِ البِنْتُ التُّفَّاحَةَ', 'akalat al-bintu at-tuffāḥata', 'La fille a mangé la pomme.'],
            ['Verbale', 'ذَهَبَ الرَّجُلُ إِلَى السُّوقِ', 'dhahaba ar-rajulu ilā as-sūqi', 'L’homme est allé au marché.'],
            ['Verbale', 'شَرِبَ الطِّفْلُ المَاءَ', 'shariba aṭ-ṭiflu al-māʾa', 'L’enfant a bu l’eau.'],
            ['Nominale', 'البَيْتُ كَبِيرٌ', 'al-baytu kabīrun', 'La maison est grande.'],
            ['Nominale', 'المُعَلِّمُ نَشِيطٌ', 'al-muʿallimu nashīṭun', 'Le professeur est actif.'],
            ['Nominale', 'السَّمَاءُ صَافِيَةٌ', 'as-samāʾu ṣāfiyatun', 'Le ciel est dégagé.'],
            ['Nominale', 'الوَلَدُ مُجْتَهِدٌ', 'al-waladu mujtahidun', 'Le garçon est travailleur.']
          ]
        }
      },
      {
        themeNumber: 8,
        title: "8. Vocabulaire : Noms des Objets & des Animaux",
        subtitle: "Les mots usuels du quotidien",
        arabicTitle: "أسماء الأشياء والحيوانات",
        content: [
          "Mots concrets pour enrichir son vocabulaire personnel :"
        ],
        table: {
          headers: ['Objet', 'Arabe', 'Transcription', 'Animal', 'Arabe', 'Transcription'],
          rows: [
            ['Livre', 'كِتَاب', 'kitāb', 'Lion', 'أَسَد', 'asad'],
            ['Stylo', 'قَلَم', 'qalam', 'Chien', 'كَلْب', 'kalb'],
            ['Table', 'طَاوِلَة', 'ṭāwilah', 'Chat', 'قِطّ', 'qiṭṭ'],
            ['Chaise', 'كُرْسِيّ', 'kursiyy', 'Cheval', 'حِصَان', 'ḥiṣān'],
            ['Porte', 'بَاب', 'bāb', 'Vache', 'بَقَرَة', 'baqarah'],
            ['Fenêtre', 'نَافِذَة', 'nāfidhah', 'Mouton', 'خَرُوف', 'kharūf'],
            ['Clé', 'مِفْتَاح', 'miftāḥ', 'Chèvre', 'مَعْزَة', 'maʿzah'],
            ['Sac', 'حَقِيبَة', 'ḥaqībah', 'Chameau', 'جَمَل', 'jamal'],
            ['Téléphone', 'هَاتِف', 'hātif', 'Âne', 'حِمَار', 'ḥimār'],
            ['Ordinateur', 'حَاسُوب', 'ḥāsūb', 'Éléphant', 'فِيل', 'fīl'],
            ['Maison', 'بَيْت', 'bayt', 'Oiseau', 'طَائِر', 'ṭāʾir'],
            ['Voiture', 'سَيَّارَة', 'sayyārah', 'Poisson', 'سَمَك', 'samak'],
            ['Route', 'طَرِيق', 'ṭarīq', 'Souris', 'فَأْر', 'faʾr'],
            ['Verre', 'كَأْس', 'kaʾs', 'Serpent', 'ثُعْبَان', 'thuʿbān'],
            ['Eau', 'مَاء', 'māʾ', 'Loup', 'ذِئْب', 'dhiʾb']
          ]
        }
      },
      {
        themeNumber: 9,
        title: "9. Dialogue 1 : Projet du Hajj entre Mohamed & Sami",
        subtitle: "Entraide fraternelle et intention sincère",
        arabicTitle: "حوار 1 : نية الحج والتعاون",
        content: [
          "Ce dialogue met en scène deux frères décidant d'économiser ensemble pour accomplir le grand pèlerinage :"
        ],
        table: {
          headers: ['#', 'Personnage', 'Réplique en Arabe', 'Phonétique', 'Traduction Française'],
          rows: [
            ['1', 'Mohamed', 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ', 'As-salāmu ʿalaykum...', 'Que la paix et la bénédiction d’Allah soient sur vous.'],
            ['2', 'Sami', 'وَعَلَيْكُمُ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ', 'Wa ʿalaykumu s-salām...', 'Et sur vous également la paix divine.'],
            ['3', 'Mohamed', 'أَنْتَ تُرِيدُ الحَجَّ ؟', 'Anta turīdu l-ḥajja ?', 'Veux-tu accomplir le Hajj ?'],
            ['4', 'Sami', 'نَعَمْ، أَنَا أُرِيدُهُ لِنَفْسِي.', 'Naʿam, anā urīduhu linafsī.', 'Oui, je le désire pour moi-même.'],
            ['5', 'Mohamed', 'نَجْمَعُ أَمْوَالَنَا لِحَجِّنَا.', 'Najmaʿu amwālanā li-ḥajjinā.', 'Rassemblons notre argent pour notre Hajj.'],
            ['6', 'Sami', 'هَذَا هَدَفُنَا، وَنِيَّتُنَا للهِ.', 'Hādhā hadafunā, wa niyyatunā lillāh.', 'C’est notre objectif, et notre intention est pour Allah.'],
            ['7', 'Mohamed', 'مَالِي قَلِيلٌ، لَكِنْ نَصْبِرُ.', 'Mālī qalīlun, lākin naṣbir.', 'Mon argent est peu, mais soyons patients.'],
            ['8', 'Sami', 'وَأَنَا أُسَاعِدُكَ مِنْ مَالِي.', 'Wa anā usāʿiduka min mālī.', 'Et moi, je t’aide avec mon argent.'],
            ['9', 'Mohamed', 'نَحْنُ شُرَكَاءُ فِي الخَيْرِ.', 'Naḥnu shurakāʾu fī l-khayr.', 'Nous sommes partenaires dans le bien.'],
            ['10', 'Sami', 'بِإِذْنِهِ نَبْلُغُ حَجَّنَا.', 'Bi-idhnihī nablughu ḥajjanā.', 'Avec Sa permission, nous atteindrons notre Hajj.']
          ]
        }
      },
      {
        themeNumber: 10,
        title: "10. Dialogue 2 : Rencontre fraternelle à La Mecque",
        subtitle: "Repères au Haram, conseils d'horaires et partage culinaire",
        arabicTitle: "حوار 2 : لقاء في مكة المكرمة",
        content: [
          "Rencontre entre un pèlerin marocain et un habitant mecquois partageant ses conseils pratiques :"
        ],
        table: {
          headers: ['#', 'Personnage', 'Réplique en Arabe', 'Phonétique', 'Traduction Française'],
          rows: [
            ['1', 'Al-Maghribi', 'أَنَا مُحَمَّدٌ مِنَ المَغْرِبِ، هَذِهِ أَوَّلُ زِيَارَتِي لِمَكَّةَ.', 'Anā muḥammadun...', 'Je suis Mohammed du Maroc, 1ère visite à La Mecque.'],
            ['2', 'Al-Makki', 'أَهْلاً وَسَهْلاً، أَنَا سَامِي مِنْ أَهْلِ مَكَّةَ، يُسْعِدُنِي لِقَاؤُكَ.', 'Ahlan wa sahlan...', 'Bienvenue, je suis Sami de La Mecque, ravi de te rencontrer.'],
            ['3', 'Al-Maghribi', 'أَتَمَنَّى أَنْ أَرَى الكَعْبَةَ عَلَى هُدُوءٍ، مَا نَصِيحَتُكَ ؟', 'Atamannā an arā l-kaʿbata...', 'J’aimerais voir la Kaaba calmement, que conseilles-tu ?'],
            ['4', 'Al-Makki', 'اخْتَرْ وَقْتَ السَّحَرِ أَوْ بَعْدَ الفَجْرِ، الزِّحَامُ يَكُونُ أَقَلَّ.', 'Ikhtar waqta s-saḥar...', 'Choisis avant l’aube ou juste après Fajr, il y a moins de monde.'],
            ['5', 'Al-Maghribi', 'هَلْ تُرِينِي أَقْرَبَ مَدْخَلٍ لِلطَّوَافِ وَالسَّعْيِ ؟', 'Hal turīnī aqraba madkhalin...', 'Peux-tu m’indiquer l’accès le plus proche pour le Tawaf ?'],
            ['6', 'Al-Makki', 'مِنْ هُنَا بَابُ المَلِكِ عَبْدِ العَزِيزِ، وَالإِشَارَاتُ وَاضِحَةٌ.', 'Min hunā bābu l-maliki...', 'Par ici la porte Roi Abdelaziz, les panneaux sont très clairs.'],
            ['7', 'Al-Maghribi', 'أُحِبُّ أَنْ أَتَذَوَّقَ أَطْعِمَتَكُمْ، مَاذَا تَنْصَحُنِي ؟', 'Uḥibbu an atadhawwaqa...', 'J’aimerais goûter vos plats, que me recommandes-tu ?'],
            ['8', 'Al-Makki', 'جَرِّبِ المَعْصُوبَ وَالسَّمْبُوسَةَ، وَكُبَّةً حَارَّةً.', 'Jarribi l-maʿṣūba...', 'Goûte le ma’soub, les samboussas et une kubba épicée.'],
            ['9', 'Al-Maghribi', 'وَعِنْدَنَا الطَّاجِنُ وَالحَرِيرَةُ، سَأَدْعُوكَ لِتَذُوقَهُمَا.', 'Wa ʿindanā ṭ-ṭājinu...', 'Et chez nous il y a le tajine et la harira !'],
            ['10', 'Al-Makki', 'بِكُلِّ سُرُورٍ، نَدْخُلُ مُبَكِّرَيْنِ وَنُصَلِّي سُنَناً قَبْلَ الجَمَاعَةِ.', 'Bi-kulli surūrin...', 'Avec joie, entrons tôt pour prier des prières surérogatoires.']
          ]
        }
      },
      {
        themeNumber: 11,
        title: "11. Dialogue 3 : Entraide spirituelle & Wird coranique",
        subtitle: "Organisation du temps, contacts et sincérité pour Allah",
        arabicTitle: "حوار 3 : الصداقة والورد القرآني",
        content: [
          "Dernier dialogue axé sur l'assiduité spirituelle, la récitation du Coran et le respect mutuel :"
        ],
        table: {
          headers: ['#', 'Personnage', 'Réplique en Arabe', 'Phonétique', 'Traduction Française'],
          rows: [
            ['1', 'Al-Maghribi', 'قَلْبِي يَشْتَاقُ لِرُؤْيَةِ كَعْبَتِكُمْ.', 'Qalbī yashtāqu...', 'Mon cœur aspire avec ferveur à voir votre Kaaba.'],
            ['2', 'Al-Makki', 'طَرِيقُكُمْ مِنْ هَذَا البَابِ، وَخُطُوَاتُكُمْ آمِنَةٌ.', 'Ṭarīqukum min hādhā...', 'Votre chemin passe par cette porte, et vos pas sont en sécurité.'],
            ['3', 'Al-Maghribi', 'هَلْ تُشَارِكُنِي وِرْدِي بَعْدَ الفَجْرِ ؟', 'Hal tushārikunī wirdī...', 'Partages-tu ma lecture du Coran après la prière du Fajr ?'],
            ['4', 'Al-Makki', 'سَأُتَابِعُ وِرْدَكَ، وَتُتَابِعُ وِرْدِي.', 'Sa-utābiʿu wirdaka...', 'Je suivrai ton wird et tu suivras le mien.'],
            ['5', 'Al-Maghribi', 'هَاتِفِي مَفْتُوحٌ؛ هَذَا رَقْمِي.', 'Hātifī maftūḥ...', 'Mon téléphone est ouvert, voici mon numéro.'],
            ['6', 'Al-Makki', 'فُرْصَتُنَا عَظِيمَةٌ؛ نُخْلِصُ نِيَّاتِنَا لِرَبِّنَا.', 'Furṣatunā ʿaẓīmah...', 'Notre opportunité est immense, rendons nos intentions pures pour notre Seigneur.']
          ]
        }
      }
    ]
  },

  // =========================================================================
  // 2. CATÉGORIE ALPHABET : FICHIER DES ALPHABETS (CATÉGORIE SÉPARÉE)
  // =========================================================================
  {
    id: 'alphabet-arabe',
    folder: 'alphabet',
    categoryLabel: 'Alphabet',
    title: "Tableau de l'Alphabet Arabe",
    subtitle: "Fichier original : Alphabet.jpg (Les 28 lettres : Fin, Milieu, Début, Isolée)",
    badge: 'Catégorie : Alphabet',
    pagesCount: 1,
    description: "Fichier officiel de l'alphabet arabe avec les 4 positions d'écriture (Fin, Milieu, Début, Isolée), la transcription phonétique et la règle des 6 lettres qui ne s'attachent pas.",
    pdfFileName: 'Alphabet.jpg',
    pdfPath: 'assets/aistudio/Alphabet_15db26f8.jpg',
    fallbackPath: 'documents/cours-arabe/Alphabet.jpg',
    imagePreviewUrl: 'assets/aistudio/Alphabet_15db26f8.jpg',
    sections: [
      {
        themeNumber: 1,
        title: "1. Tableau des 28 Lettres & Formes d'Écriture",
        subtitle: "Formes isolée, initiale, médiane et finale",
        arabicTitle: "لوحة الحروف العربية",
        intro: "L'alphabet arabe comprend 28 lettres. Chaque lettre change de graphie selon sa position dans le mot (isolée, en début, au milieu ou en fin de mot).",
        content: [
          "L'écriture s'effectue de droite à gauche de façon liée.",
          "Les 6 lettres non-liantes (ا, د, ذ, ر, ز, و) ne s'attachent jamais avec la lettre qui les suit."
        ],
        table: {
          headers: ['Lettre', 'Transcription', 'Fin', 'Milieu', 'Début', 'Isolée', 'Particularité & Prononciation'],
          rows: [
            ['Alif', 'A', 'ـا', 'ـا', 'اـ', 'ا', 'A long ou support de hamza'],
            ['Bâ', 'B', 'ـب', 'ـبـ', 'بـ', 'ب', '1 point en dessous'],
            ['Tâ', 'T', 'ـت', 'ـتـ', 'تـ', 'ت', '2 points au-dessus'],
            ['Thâ', 'Th', 'ـث', 'ـثـ', 'ثـ', 'ث', 'Interdentale : think en anglais'],
            ['Jîm', 'J', 'ـج', 'ـجـ', 'جـ', 'ج', '1 point au milieu'],
            ['Hâ', 'Ḥ', 'ـح', 'ـحـ', 'حـ', 'ح', 'H sourd (pas de vibration)'],
            ['Khâ', 'kh', 'ـخ', 'ـخـ', 'خـ', 'خ', 'Jota en esp. ou achtung en alle.'],
            ['Dal', 'D', 'ـد', 'ـد', 'دـ', 'د', 'Lettre non-liante avec la suivante'],
            ['Dhal', 'Dh', 'ـذ', 'ـذ', 'ذـ', 'ذ', 'Interdentale : that en anglais'],
            ['Râ', 'R', 'ـر', 'ـر', 'رـ', 'ر', 'R roulé'],
            ['Zay', 'Z', 'ـز', 'ـز', 'زـ', 'ز', 'Z standard'],
            ['Sîn', 'S', 'ـس', 'ـسـ', 'سـ', 'س', 'Sifflante standard'],
            ['Shîn', 'Sh', 'ـش', 'ـشـ', 'شـ', 'ش', 'Son sh : chat en français'],
            ['Sâd', 'Ṣ', 'ـص', 'ـصـ', 'صـ', 'ص', 'S emphatique'],
            ['Dâd', 'Ḍ', 'ـض', 'ـضـ', 'ضـ', 'ض', 'D emphatique'],
            ['Tâ', 'Ṭ', 'ـط', 'ـطـ', 'طـ', 'ط', 'T emphatique'],
            ['Zâ', 'Ẓ', 'ـظ', 'ـظـ', 'ظـ', 'ظ', 'Dh emphatique'],
            ['Ayn', 'ʿ', 'ـع', 'ـعـ', 'عـ', 'ع', '« Lettre de l\'agonie »'],
            ['Ghayn', 'Gh', 'ـغ', 'ـغـ', 'غـ', 'غ', 'R parisien à la Jack Brel'],
            ['Fâ', 'F', 'ـف', 'ـفـ', 'فـ', 'ف', '1 point au-dessus'],
            ['Qâf', 'Q', 'ـق', 'ـقـ', 'قـ', 'ق', 'Gutturale profonde'],
            ['Kâf', 'K', 'ـك', 'ـكـ', 'كـ', 'ك', 'K standard'],
            ['Lâm', 'L', 'ـل', 'ـلـ', 'لـ', 'ل', 'L standard'],
            ['Mîm', 'M', 'ـم', 'ـمـ', 'مـ', 'م', 'M standard'],
            ['Nûn', 'N', 'ـن', 'ـنـ', 'نـ', 'ن', '1 point au-dessus'],
            ['Hâ', 'H', 'ـه', 'ـهـ', 'هـ', 'ه', 'H sonore (vibration)'],
            ['Waw', 'W / ou', 'ـو', 'ـو', 'وـ', 'و', 'Ou long et W'],
            ['Yâ', 'Y / i', 'ـي', 'ـيـ', 'يـ', 'ي', 'I long et Ya']
          ]
        },
        callout: "Attention : 6 lettres ne s'attachent pas avec la lettre qui les suit : ا · د · ذ · ر · ز · و"
      }
    ]
  },

  // =========================================================================
  // 3. CATÉGORIE PRIÈRE : CONSULTATION EN LIGNE (SANS PDF)
  // =========================================================================
  {
    id: 'cours-religion-priere-ablutions',
    folder: 'priere',
    categoryLabel: 'Prière',
    title: "J'apprends la Prière et les Ablutions",
    subtitle: "Cours complet en 7 thèmes (Consultation en ligne)",
    badge: 'Catégorie : Prière',
    pagesCount: 43,
    description: "Cours complet sur la prière et les ablutions : sens de la prière, rituel du Woudou, règles de la Awra, déroulement geste par geste et invocations.",
    pdfFileName: '',
    pdfPath: '',
    sections: [
      {
        themeNumber: 1,
        title: "1. Qu'est-ce que la Prière & Récit du Voyage Nocturne",
        subtitle: "Al-Isra wal-Mi'raj et la prescription divine des 5 prières",
        arabicTitle: "فضل الصلاة وقصة فرضها في الإسراء والمعراج",
        content: [
          "La prière (Salat - صلاة) est la colonne vertébrale de l'Islam et le deuxième pilier. En tant que musulmans, nous l'accomplissons 5 fois par jour.",
          "La racine arabe de Salat (صل) évoque le lien direct, le rassemblement et la connexion intime avec Allah.",
          "Histoire de la prescription : C'est lors du Voyage Nocturne (Al-Isra wal Mi'raj) que la prière fut prescrite. Le Prophète ﷺ est monté aux cieux au-delà du Lotus de la Limite.",
          "Au départ, Allah avait ordonné 50 prières par jour. Sur les conseils bienveillants du Prophète Moussa (Moïse), notre Prophète Muhammad ﷺ sollicita un allégement jusqu'à 5 prières, mais dont chacune conserve la récompense intégrale de 10 prières !"
        ],
        callout: "Le Prophète ﷺ a dit : « Le moment où le serviteur est le plus proche de son Seigneur est lorsqu'il est en prosternation (Soujoud). Multipliez-y donc les invocations. » (Rapporté par Mouslim)."
      },
      {
        themeNumber: 2,
        title: "2. Se Préparer à la Prière : Awra, Propreté & Qibla",
        subtitle: "Les conditions préalables indispensables pour garçons et filles",
        arabicTitle: "شروط صحة الصلاة وستر العورة واستقبال القبلة",
        content: [
          "Prier à l'heure : L'action la plus aimée d'Allah est la prière accomplie en son temps légal.",
          "La tenue vestimentaire (Couvrir sa Awra) :",
          "• Pour la jeune fille : Des vêtements amples, opaques et non transparents couvrant tout le corps sauf le visage et les mains.",
          "• Pour le jeune homme : Des vêtements amples couvrant au minimum du nombril jusqu'en dessous du genou (avec les épaules couvertes par bienséance).",
          "Trouver la Qibla : S'orienter en direction de la Kaaba sacrée à La Mecque (à l'aide d'une boussole ou d'une application fiable).",
          "Lieu de prière : L'endroit de prosternation doit être pur, sans aucune souillure ni impureté."
        ]
      },
      {
        themeNumber: 3,
        title: "3. Le Rituel des Ablutions (Woudou) & Invocations",
        subtitle: "Les 8 étapes purificatrices et les causes d'annulation",
        arabicTitle: "صفة الوضوء ونواقضه",
        content: [
          "Les 8 étapes dans l'ordre prophétique :",
          "1. Avoir l'intention sincère dans le cœur et dire : « Bismillâh ».",
          "2. Laver les mains jusqu'aux poignets 3 fois en frottant entre les doigts.",
          "3. Rincer la bouche 3 fois (Madmada).",
          "4. Aspirer l'eau par le nez de la main droite et souffler de la main gauche 3 fois (Istinshaq & Istinthar).",
          "5. Laver l'ensemble du visage 3 fois de la racine des cheveux au menton et d'une oreille à l'autre.",
          "6. Laver les bras jusqu'aux coudes compris 3 fois (bras droit d'abord, puis gauche).",
          "7. Passer les mains mouillées de l'avant vers l'arrière de la tête 1 fois, puis essuyer l'intérieur et l'extérieur des oreilles.",
          "8. Laver les pieds jusqu'aux chevilles comprises 3 fois en passant entre les orteils (pied droit d'abord, puis gauche).",
          "Ce qui annule les ablutions : Le sommeil profond, les gaz (flatulences), les besoins naturels aux toilettes, toucher directement ses parties intimes ou perdre conscience."
        ],
        callout: "Invocation après le Woudou : « Ash-hadu an lâ ilâha illâ-Llâh wahdahu lâ sharîka lah, wa ash-hadu anna Muhammadan ʿabduhu wa rasûluh. Allâhumma jʿalnî mina t-tawwâbîna wa jʿalnî mina l-mutatahhirîn. » (Les 8 portes du Paradis s'ouvrent à celui qui la prononce)."
      },
      {
        themeNumber: 4,
        title: "4. Les 5 Prières Quotidiennes, Rakats & Prières Rawatib",
        subtitle: "Horaires, unités obligatoires (Fard) et surérogatoires (Sunna)",
        arabicTitle: "الصلوات الخمس والسنن الرواتب",
        table: {
          headers: ['Prière', 'Horaires légaux', 'Rakats Obligatoires', 'Prières Sunna Rawatib'],
          rows: [
            ['Fajr (الفجر)', 'De l’aube au lever du soleil (Chourouq)', '2 Rakats (à voix haute)', '2 Rakats avant le Fajr'],
            ['Dhuhr (الظهر)', 'Du zénith au milieu de l’après-midi', '4 Rakats (à voix basse)', '4 ou 2 avant + 2 après'],
            ['Asr (العصر)', 'Du milieu d’après-midi au coucher du soleil', '4 Rakats (à voix basse)', 'Non rattachée'],
            ['Maghrib (المغرب)', 'Du coucher du soleil au crépuscule', '3 Rakats (2 haute + 1 basse)', '2 Rakats après'],
            ['Isha (العشاء)', 'De la nuit noire au tiers de la nuit', '4 Rakats (2 haute + 2 basse)', '2 Rakats après']
          ]
        },
        content: [
          "Le Hadith des 12 Rakats Rawatib : Le Prophète ﷺ a enseigné que quiconque accomplit 12 unités surérogatoires par jour pour Allah, Allah lui bâtit une demeure au Paradis."
        ]
      },
      {
        themeNumber: 5,
        title: "5. Déroulement de la Prière Geste par Geste",
        subtitle: "Takbir, Qiyam, Ruku, Soujoud, Jalsa, Tashahoud et Taslim",
        arabicTitle: "صفة الصلاة خطوة بخطوة",
        content: [
          "1. Takbirat al-Ihram : Debout face à la Qibla, lever les mains au niveau des oreilles/épaules et dire : « Allâhu Akbar ».",
          "2. Qiyam : Poser la main droite sur le poignet gauche sur la poitrine. Réciter la Fatiha puis une sourate en fixant le point de prosternation.",
          "3. Ruku (Inclinaison) : S'incliner avec le dos bien horizontal, mains sur les genoux en disant 3x : « Subhâna Rabbîya l-ʿAdhîm » (Gloire à mon Seigneur le Très Grand).",
          "4. Redressement : Se relever droit en disant : « Samiʿa Llâhu liman hamidah, Rabbanâ wa laka l-hamd ».",
          "5. Soujoud (Prosternation) : Poser 7 membres au sol (le front, le nez, les 2 paumes, les 2 genoux, les orteils) en disant 3x : « Subhâna Rabbîya l-Aʿlâ » (Gloire à mon Seigneur le Très Haut).",
          "6. Jalsa : S'asseoir calmement entre les deux prosternations et dire : « Rabbi ghfir lî » (Seigneur, pardonne-moi).",
          "7. Deuxième Soujoud : Se prosterner à nouveau 3x « Subhâna Rabbîya l-Aʿlâ », ce qui achève la première Rakat.",
          "8. Tashahoud & Salutations : Réciter l'attestation de foi et les prières sur le Prophète ﷺ, puis saluer à droite puis à gauche (« As-salāmu ʿalaykum wa raḥmatullāh »)."
        ]
      },
      {
        themeNumber: 6,
        title: "6. Les Erreurs Fréquentes à Éviter durant la Prière",
        subtitle: "Préserver la concentration et la validité de son office",
        arabicTitle: "أخطاء شائعة يجب تجنبها في الصلاة",
        content: [
          "• Regarder autour de soi : Le regard doit rester fixé humblement sur le lieu de prosternation.",
          "• Se précipiter : La prière requiert sérénité et calme intérieur (Touma'nina). Ne pas bâcler les inclinaisons ni les prosternations.",
          "• Gestes superflus : Éviter de toucher ses vêtements, de se gratter ou de jouer avec ses mains.",
          "• Poser les avant-bras par terre au Soujoud : Seules les paumes doivent toucher le sol ; les coudes restent décollés.",
          "• Parler ou rire : Annule immédiatement la prière."
        ]
      },
      {
        themeNumber: 7,
        title: "7. Invocations Post-Prière, Joumou'a, Aïd & Janaza",
        subtitle: "L'assemblée du vendredi et les offices particuliers",
        arabicTitle: "الأذكار بعد الصلاة وصلاة الجمعة والعيدين والجنازة",
        content: [
          "Invocations après chaque prière obligatoire : Dire 3 fois « Astaghfirullâh », puis « Allâhumma anta s-salâm wa minka s-salâm, tabârakta yâ dhal-jalâli wal-ikrâm ».",
          "Le Tasbih : 33 fois Subhân Allâh, 33 fois Al-hamdu lillâh, 33 fois Allâhu Akbar, et clore avec « Lâ ilâha illâ Llâh wahdahu lâ sharîka lah... ».",
          "La prière du Vendredi (Joumou'a) : Obligation pour les hommes en bonne santé. Sermon (Khotba) suivi de 2 Rakats à voix haute à la mosquée.",
          "La prière de l'Aïd (Aïd al-Fitr & Aïd al-Adha) : 2 Rakats célébrées le matin avec des Takbirs supplémentaires.",
          "La prière mortuaire (Salat al-Janaza) : Accomplie debout sans inclinaison ni prosternation avec 4 Takbirs pour implorer la miséricorde divine sur le défunt."
        ]
      }
    ]
  },

  // =========================================================================
  // 4. CATÉGORIE ISLAM : RÉSUMÉ ISLAM FRANÇAIS ARABE
  // =========================================================================
  {
    id: 'cours-religion-islam-resume',
    folder: 'islam',
    categoryLabel: 'Islam',
    title: "Résumé Islam (Français - Arabe)",
    subtitle: "Fichier original : Resume_islam_francais_arabe.pdf (3 pages, 16 thèmes)",
    badge: 'Catégorie : Islam',
    pagesCount: 3,
    description: "Résumé fondamental de l'Islam en français et en arabe (non modifié, téléchargeable directement en PDF) : croyances, 5 piliers, 6 piliers de la foi, 25 prophètes, sourates, prières, règles et comportement.",
    pdfFileName: 'Resume_islam_francais_arabe.pdf',
    pdfPath: 'assets/aistudio/Resume_islam_francais_arabe_bc3ac02f.pdf',
    fallbackPath: 'documents/cours-religion/Resume_islam_francais_arabe.pdf',
    sections: [
      {
        themeNumber: 1,
        title: "1. Qu'est-ce que l'Islam ?",
        subtitle: "Définition, monothéisme pur et mots essentiels",
        arabicTitle: "ما هو الإسلام ؟",
        content: [
          "L’islam est la soumission à Allah par le monothéisme pur (Tawhid) et l’obéissance sincère. Le musulman croit en Allah seul, en Ses messagers et aux révélations, et cherche à pratiquer sa religion avec sincérité et bon comportement.",
          "Texte arabe : الإسلام هو الاستسلام لله بالتوحيد والانقياد له بالطاعة. يؤمن المسلم بالله ورسله وكتبه، ويسعى إلى العبادة بإخلاص وحسن الخلق.",
          "Mots essentiels :",
          "• Allah (الله) : Le Dieu unique, Créateur souverain de toute chose.",
          "• Islam (الإسلام) : La soumission et l'abandon pacifique à la volonté divine.",
          "• Musulman (مسلم) : La personne qui atteste de sa foi et se soumet à Allah.",
          "• Tawhid (التوحيد) : L’affirmation de l’unicité absolue d’Allah dans Sa seigneurie et Son adoration.",
          "• Sunna (السنة) : L’ensemble des paroles, actes et approbations du Prophète Muhammad ﷺ."
        ]
      },
      {
        themeNumber: 2,
        title: "2. Les Cinq Piliers de l'Islam",
        subtitle: "Les actes fondamentaux de la pratique religieuse",
        arabicTitle: "أركان الإسلام الخمسة",
        content: [
          "Les 5 piliers constituent les fondations obligatoires sur lesquelles repose l'édifice de l'Islam :"
        ],
        table: {
          headers: ['#', 'Pilier', 'Explication en Français', 'Formule Arabe'],
          rows: [
            ['1', 'Shahada (الشهادتان)', 'Attester qu’aucune divinité ne mérite l’adoration sauf Allah et que Muhammad est Son Messager.', 'أشهد أن لا إله إلا الله وأشهد أن محمداً رسول الله'],
            ['2', 'Prière (الصلاة)', 'Accomplir les cinq prières obligatoires chaque jour aux horaires légaux prescrits.', 'إقامة الصلوات الخمس'],
            ['3', 'Zakat (الزكاة)', 'Donner la part obligatoire de ses biens aux bénéficiaires prévus (2,5 % sous conditions de seuil).', 'إيتاء الزكاة لمستحقيها'],
            ['4', 'Jeûne (صيام رمضان)', 'Jeûner du début de l’aube au coucher du soleil pendant le mois sacré de Ramadan.', 'صيام شهر رمضان'],
            ['5', 'Hajj (الحج)', 'Accomplir le pèlerinage à La Mecque au moins une fois dans sa vie pour qui en a les moyens physiques et financiers.', 'حج البيت لمن استطاع إليه سبيلاً']
          ]
        }
      },
      {
        themeNumber: 3,
        title: "3. Les Six Piliers de la Foi",
        subtitle: "Le dogme et les vérités intangibles de la foi (Al-Iman)",
        arabicTitle: "أركان الإيمان الستة",
        content: [
          "La foi en Islam repose sur six articles de foi indispensables :"
        ],
        table: {
          headers: ['Pilier de la Foi', 'Sens théologique', 'En Arabe'],
          rows: [
            ['1. Allah (الله)', 'Croire en Son existence, Son unicité absolue, Ses Noms et Attributs parfaits ; Lui seul mérite l’adoration.', 'الإيمان بالله'],
            ['2. Les Anges (الملائكة)', 'Croire aux anges, créatures de lumière obéissant à Allah, dont Jibril qui transmet les révélations.', 'الإيمان بالملائكة'],
            ['3. Les Livres (الكتب)', 'Croire aux révélations authentiques : la Torah, les Psaumes (Zabour), l’Évangile et le noble Coran.', 'الإيمان بالكتب السماوية'],
            ['4. Les Messagers (الرسل)', 'Croire en tous les prophètes et envoyés par Allah pour guider l’humanité.', 'الإيمان بالرسل'],
            ['5. Le Jour dernier (اليوم الآخر)', 'Croire à la résurrection, au jugement final, à la balance des œuvres, au Paradis et à l’Enfer.', 'الإيمان باليوم الآخر'],
            ['6. Le Destin (القدر)', 'Croire qu’Allah sait toute chose et que tout arrive selon Sa volonté et Sa sagesse, avec responsabilité humaine.', 'الإيمان بالقدر خيره وشره']
          ]
        }
      },
      {
        themeNumber: 4,
        title: "4. Les 25 Prophètes Mentionnés dans le Coran",
        subtitle: "La chaîne bénie des prophètes d'Adam au sceau Muhammad ﷺ",
        arabicTitle: "الأنبياء المذكورون في القرآن الكريم",
        content: [
          "Le Coran nomme expressément 25 prophètes et messagers envoyés par Allah :",
          "Les 5 messagers doués d'une grande détermination (أولو العزم) : Noé (Nuh), Abraham (Ibrahim), Moïse (Musa), Jésus (Isa) et Muhammad ﷺ.",
          "Adam (آدم) est le premier être humain et le premier prophète selon l’islam ; Muhammad ﷺ est le dernier et sceau de tous les prophètes."
        ],
        table: {
          headers: ['N°', 'Nom en Français', 'Nom en Arabe', 'N°', 'Nom en Français', 'Nom en Arabe'],
          rows: [
            ['1', 'Adam', 'آدم', '14', 'Dhul-Kifl', 'ذو الكفل'],
            ['2', 'Idris (Énoch)', 'إدريس', '15', 'Moïse (Musa)', 'موسى'],
            ['3', 'Noé (Nuh)', 'نوح', '16', 'Aaron (Harun)', 'هارون'],
            ['4', 'Houd', 'هود', '17', 'David (Dawud)', 'داود'],
            ['5', 'Salih', 'صالح', '18', 'Salomon (Sulayman)', 'سليمان'],
            ['6', 'Abraham (Ibrahim)', 'إبراهيم', '19', 'Élie (Ilyas)', 'إلياس'],
            ['7', 'Loth (Lut)', 'لوط', '20', 'Élisée (Al-Yasa)', 'اليسع'],
            ['8', 'Ismaël', 'إسماعيل', '21', 'Jonas (Yunus)', 'يونس'],
            ['9', 'Isaac (Ishaq)', 'إسحاق', '22', 'Zacharie (Zakariyya)', 'زكريا'],
            ['10', 'Jacob (Yaqub)', 'يعقوب', '23', 'Jean (Yahya)', 'يحيى'],
            ['11', 'Joseph (Yusuf)', 'يوسف', '24', 'Jésus (Isa)', 'عيسى'],
            ['12', 'Chou‘ayb', 'شعيب', '25', 'Muhammad ﷺ', 'محمد ﷺ'],
            ['13', 'Job (Ayyub)', 'أيوب', '-', '-', '-']
          ]
        }
      },
      {
        themeNumber: 5,
        title: "5. Les Anges & les Livres Révélés",
        subtitle: "Mala'ikah et Saintes Écritures",
        arabicTitle: "الملائكة والكتب السماوية",
        content: [
          "Les Anges principaux :",
          "• Jibril (جبريل) : Chargé de transmettre la révélation aux prophètes.",
          "• Mikaïl (ميكائيل) : Associé à la pluie, à la végétation et à la subsistance par la permission d’Allah.",
          "• Israfil (إسرافيل) : Chargé de souffler dans la Trompe au Jour Dernier.",
          "• L'ange de la mort (ملك الموت) : Chargé de recueillir les âmes sur ordre divin.",
          "Les Livres célestes :",
          "• La Torah (التوراة) révélée à Moïse (Musa).",
          "• Les Psaumes / Zabour (الزبور) révélés à David (Dawud).",
          "• L’Évangile / Injeel (الإنجيل) révélé à Jésus (Isa).",
          "• Le Coran (القرآن) révélé à Muhammad ﷺ, dernière révélation comprenant 114 sourates, descendue progressivement sur environ 23 ans."
        ]
      },
      {
        themeNumber: 6,
        title: "6. Les Sourates & Passages à Apprendre en Priorité",
        subtitle: "Les textes essentiels pour la prière quotidienne",
        arabicTitle: "سور وآيات مهمة يُستحسن حفظها",
        content: [
          "À apprendre en priorité absolue :",
          "1. Al-Fatiha (الفاتحة) : La mère du Livre, récitée à chaque unité de prière.",
          "2. Les trois sourates protectrices : Al-Ikhlas (الإخلاص), Al-Falaq (الفلق), An-Nas (الناس).",
          "3. Al-Kafirun (الكافرون) & Al-Asr (العصر) : L'affirmation du monothéisme et la valeur du temps.",
          "4. Ayat al-Kursi (آية الكرسي - verset 255 d'Al-Baqara) : Le verset le plus éminent du Coran.",
          "5. Les deux derniers versets de la sourate Al-Baqara (آخر آيتين من سورة البقرة) : Protection nocturne accordée à celui qui les récite."
        ]
      },
      {
        themeNumber: 7,
        title: "7. Les Cinq Prières & la Purification",
        subtitle: "Woudou, Ghusl, Tayammum et conditions de validité",
        arabicTitle: "الصلاة والطهارة",
        table: {
          headers: ['Prière', 'Nom Arabe', 'Rakats Obligatoires'],
          rows: [
            ['Aube', 'الفجر (Al-Fajr)', '2 Rakats'],
            ['Midi', 'الظهر (Ad-Dhuhr)', '4 Rakats'],
            ['Après-midi', 'العصر (Al-Asr)', '4 Rakats'],
            ['Coucher du soleil', 'المغرب (Al-Maghrib)', '3 Rakats'],
            ['Nuit', 'العشاء (Al-Isha)', '4 Rakats'],
            ['Total quotidien', 'المجموع', '17 Rakats obligatoires']
          ]
        },
        content: [
          "Conditions de la prière : La purification (Woudou), l’entrée de l’heure, la couverture de la Awra, l’orientation vers la Qibla et l’intention.",
          "Wudu (الوضوء) : Intention, lavage des mains, de la bouche, du nez, du visage, des bras jusqu’aux coudes, essuyage de la tête et des oreilles, lavage des pieds jusqu'aux chevilles.",
          "Le Ghusl (الغسل) : Bain rituel requis lors des grandes impuretés.",
          "Le Tayammum (التيمم) : Purification avec une terre propre en cas d’absence d’eau ou d'empêchement médical."
        ]
      },
      {
        themeNumber: 8,
        title: "8. Ramadan, Zakat & Aumône (Sadaqa)",
        subtitle: "Jeûne purificateur et solidarité sociale",
        arabicTitle: "رمضان والزكاة والصدقة",
        content: [
          "Ramadan : Jeûne de l’aube au coucher du soleil, avec intention sincère et abstention de manger, boire et des rapports charnels. Il fortifie la piété (Taqwa), la patience et la maîtrise de soi.",
          "Zakat (الزكاة) : Troisième pilier de l'Islam. Aumône obligatoire soumise à des conditions de seuil (Nissab) et de possession sur une année lunaire (Hawl). Le taux standard pour l'argent est de 2,5 %.",
          "Sadaqa (الصدقة) : Don volontaire recommandé à tout moment.",
          "Zakat al-Fitr (زكاة الفطر) : Aumône purificatrice de fin de Ramadan versée avant la prière de l'Aïd pour nourrir les nécessiteux."
        ]
      },
      {
        themeNumber: 9,
        title: "9. Les Cinq Catégories Juridiques (Al-Ahkâm)",
        subtitle: "Obligatoire, Recommandé, Permis, Déconseillé, Interdit",
        arabicTitle: "الأحكام الشرعية الخمسة",
        content: [
          "Tout acte dans la vie du croyant se qualifie selon l'un des cinq statuts suivants :"
        ],
        table: {
          headers: ['Catégorie', 'Nom Arabe', 'Définition Religieuse'],
          rows: [
            ['Obligatoire', 'واجب / فرض', 'Doit être accompli : récompensé si fait, puni si délaissé (ex: les 5 prières).'],
            ['Recommandé', 'مستحب / مندوب', 'Récompensé si accompli, pas de péché si omis (ex: prières Rawatib).'],
            ['Permis', 'مباح', 'Autorisé en principe sans mérite ni péché particulier (ex: choix des nourritures licites).'],
            ['Déconseillé', 'مكروه', 'Il est préférable de l’éviter sans constituer une faute grave.'],
            ['Interdit', 'حرام', 'Doit être évité impérativement : péché si commis, récompensé si évité pour Allah.']
          ]
        }
      },
      {
        themeNumber: 10,
        title: "10. Tawhid, Shirk & Repentir (Tawba)",
        subtitle: "L'unicité absolue d'Allah et le pardon divin",
        arabicTitle: "التوحيد والشرك والتوبة",
        content: [
          "Tawhid (التوحيد) : Adorer Allah seul sans associé. On distingue traditionnellement trois aspects :",
          "1. Tawhid ar-Rububiyyah (توحيد الربوبية) : Reconnaître Allah comme Créateur, Souverain et Pourvoyeur unique.",
          "2. Tawhid al-Uluhiyyah (توحيد الألوهية) : Lui vouer exclusivement toute adoration (prière, vœu, sacrifice, invocation).",
          "3. Tawhid al-Asma wa-s-Sifat (توحيد الأسماء والصفات) : Croire en Ses Noms et Attributs parfaits tels que décrits dans le Coran et la Sunna.",
          "Shirk (الشرك) : Le péché le plus grave consistant à associer quoi que ce soit à Allah.",
          "Le Repentir (التوبة) : Arrêter le péché, le regretter sincèrement, avoir la ferme intention de ne plus recommencer et restituer les droits d’autrui en cas de tort causé."
        ]
      },
      {
        themeNumber: 11,
        title: "11. Le Bon Comportement du Musulman (Akhlâq)",
        subtitle: "L'éthique et les relations humaines en Islam",
        arabicTitle: "أخلاق المسلم",
        content: [
          "Le Prophète ﷺ a résumé sa mission en disant : « Je n'ai été envoyé que pour parfaire les nobles caractères. »",
          "Vertus majeures à cultiver :",
          "• La véracité (الصدق) et l'honnêteté dans les transactions.",
          "• Le respect scrupuleux des engagements (الأمانة).",
          "• La justice (العدل) envers tous les êtres.",
          "• La miséricorde (الرحمة) et la patience (الصبر).",
          "• La bienfaisance absolue envers les parents (بر الوالدين).",
          "• Le respect du voisinage et le secours apporté aux personnes dans le besoin.",
          "Comportements à rejeter : L'insulte, la médisance (الغيبة), la calomnie (النميمة), la tromperie et l'injustice sous toutes ses formes."
        ]
      },
      {
        themeNumber: 12,
        title: "12. Le Jour Dernier (Al-Yawm al-Âkhir)",
        subtitle: "La mort, la résurrection et l'au-delà",
        arabicTitle: "اليوم الآخر والبعث والحساب",
        content: [
          "La foi en l’au-delà comprend les étapes suivantes :",
          "1. La mort (الموت) : Terme de la vie terrestre et passage vers l'inconnu.",
          "2. La vie intermédiaire ou Barzakh (البرزخ) : Séjour de l'âme dans la tombe jusqu'au Jour du Jugement.",
          "3. La résurrection (البعث) : Tous les êtres humains seront ressuscités de leurs tombes.",
          "4. Le rassemblement (الحشر) et le jugement (الحساب) : Chaque individu comparaîtra devant son Créateur.",
          "5. La balance des œuvres (الميزان) : Les bonnes et mauvaises actions seront pesées avec une justice absolue.",
          "6. La demeure éternelle : Le Paradis (الجنة) par la miséricorde d'Allah ou l'Enfer (النار) pour les transgresseurs obstinés."
        ]
      },
      {
        themeNumber: 13,
        title: "13. Invocations & Rappels Quotidiens (Dhikr)",
        subtitle: "Les paroles de lumière pour préserver le lien avec Allah",
        arabicTitle: "الأذكار والأدعية اليومية",
        content: [
          "Tableau des invocations fondamentales à réciter le matin, le soir et après chaque prière :"
        ],
        table: {
          headers: ['Formule Arabe', 'Prononciation', 'Sens en Français'],
          rows: [
            ['سُبْحَانَ الله', 'Subhan Allah', 'Gloire et pureté à Allah'],
            ['الْحَمْدُ لله', 'Al-hamdu lillah', 'Louange à Allah'],
            ['اللهُ أَكْبَر', 'Allahu akbar', 'Allah est le plus Grand'],
            ['لاَ إِلَهَ إِلاَّ الله', 'La ilaha illa Allah', 'Nulle divinité ne mérite l’adoration sauf Allah'],
            ['أَسْتَغْفِرُ الله', 'Astaghfirullah', 'Je demande pardon à Allah'],
            ['بِسْمِ الله', 'Bismillah', 'Au nom d’Allah'],
            ['إِنْ شَاءَ الله', 'Incha Allah', 'Si Allah le veut'],
            ['السَّلاَمُ عَلَيْكُمْ', 'As-salamu alaykum', 'Que la paix divine soit sur vous']
          ]
        }
      },
      {
        themeNumber: 14,
        title: "14. Vie du Prophète ﷺ & Fêtes Musulmanes",
        subtitle: "Les repères historiques de la Sîra et le calendrier hégirien",
        arabicTitle: "السيرة النبوية الشريفة وأعياد المسلمين",
        content: [
          "Chronologie essentielle de la vie du Messager d'Allah ﷺ :",
          "• 570 ap. J.-C. : Naissance à La Mecque (Année de l'Éléphant).",
          "• 610 ap. J.-C. : Début de la Révélation dans la grotte de Hira par l'ange Jibril.",
          "• 622 ap. J.-C. : L’Hégire (Hijra) — Émigration vers Médine, marquant le point de départ du calendrier hégirien.",
          "• 632 ap. J.-C. : Pèlerinage d'adieu et décès béni à Médine.",
          "Les deux fêtes sacrées annuelles :",
          "1. Aïd al-Fitr (عيد الفطر) : Fête de la rupture du jeûne célébrant l'achèvement béni du mois de Ramadan.",
          "2. Aïd al-Adha (عيد الأضحى) : Fête du sacrifice liée au pèlerinage du Hajj et au dévouement sublime du prophète Abraham (Ibrahim)."
        ]
      },
      {
        themeNumber: 15,
        title: "15. Les Quatre Écoles de Jurisprudence",
        subtitle: "Les grands imams sunnites et leur méthodologie",
        arabicTitle: "المذاهب الفقهية السنية الأربعة",
        content: [
          "Les quatre écoles sunnites de jurisprudence sont pleinement unies sur les fondements du dogme (Aqida) et s'accordent mutuellement un profond respect sur les avis juridiques dérivés (Fiqh) :",
          "1. L’école Hanafite (الإمام أبو حنيفة) : Fondée par l'Imam Abou Hanifa (699–767).",
          "2. L’école Malikite (الإمام مالك) : Fondée par l'Imam Malik ibn Anas (711–795), imam de Médine. Très répandue au Maghreb, en Afrique de l'Ouest et en France.",
          "3. L’école Chaféite (الإمام الشافعي) : Fondée par l'Imam Muhammad ibn Idris Ach-Chafi'i (767–820).",
          "4. L’école Hanbalite (الإمام أحمد بن حنبل) : Fondée par l'Imam Ahmad ibn Hanbal (780–855)."
        ]
      },
      {
        themeNumber: 16,
        title: "16. Ordre Conseillé pour Apprendre & Conclusion",
        subtitle: "Méthodologie progressive d'acquisition du savoir",
        arabicTitle: "ترتيب مقترح للتعلم والخاتمة",
        content: [
          "Ordre pédagogique recommandé pour l'adolescent :",
          "1. Les 5 piliers de l'Islam et les 6 piliers de la foi (ancrer le cœur dans la certitude).",
          "2. Les ablutions et les 5 prières quotidiennes (la pratique régulière).",
          "3. La sourate Al-Fatiha et les courtes sourates du Coran avec règles de Tajwîd.",
          "4. Lecture régulière du Coran avec une traduction et une explication fiable.",
          "5. La biographie du Prophète ﷺ (Sîra) pour trouver un modèle de vie et d'inspiration.",
          "6. Les règles du licite (Halal) et de l'illicite (Haram) ainsi que les droits d'autrui.",
          "7. Les invocations quotidiennes, la demande de pardon sincère et le perfectionnement moral.",
          "Conclusion : L’islam associe indissociablement l'adoration sincère envers Allah, la recherche du savoir et le comportement fraternel exemplaire envers tous les êtres humains."
        ]
      }
    ]
  }
];

interface PedagogicalResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFolder?: PedagogicalCategory | 'religion';
  initialDocId?: string;
}

export const PedagogicalResourcesModal: React.FC<PedagogicalResourcesModalProps> = ({
  isOpen,
  onClose,
  initialFolder = 'priere',
  initialDocId
}) => {
  const normalizeFolder = (f?: PedagogicalCategory | 'religion'): PedagogicalCategory => {
    if (!f || f === 'religion') return 'priere';
    return f;
  };

  const [activeFolder, setActiveFolder] = useState<PedagogicalCategory>(() => normalizeFolder(initialFolder));
  const [selectedDocId, setSelectedDocId] = useState<string | null>(initialDocId || null);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialDocId) {
        const found = PEDAGOGICAL_DOCUMENTS.find((d) => d.id === initialDocId);
        if (found) {
          setActiveFolder(found.folder);
          setSelectedDocId(found.id);
          setActiveSectionIdx(0);
          return;
        }
      }
      const folder = normalizeFolder(initialFolder);
      setActiveFolder(folder);
      const firstDoc = PEDAGOGICAL_DOCUMENTS.find((d) => d.folder === folder);
      setSelectedDocId(firstDoc ? firstDoc.id : null);
      setActiveSectionIdx(0);
    }
  }, [isOpen, initialFolder, initialDocId]);

  const selectedDoc =
    PEDAGOGICAL_DOCUMENTS.find((doc) => doc.id === selectedDocId) ||
    PEDAGOGICAL_DOCUMENTS.find((doc) => doc.folder === activeFolder) ||
    PEDAGOGICAL_DOCUMENTS[0];

  if (!isOpen) return null;

  const handleDownload = async (docId: string) => {
    setDownloadingDocId(docId);
    await downloadPedagogicalPdf(docId, (loading) => {
      setDownloadingDocId(loading ? docId : null);
    });
  };

  const categories: { id: PedagogicalCategory; label: string; docId: string }[] = [
    { id: 'priere', label: '1. Prière', docId: 'cours-religion-priere-ablutions' },
    { id: 'islam', label: '2. Islam (Résumé)', docId: 'cours-religion-islam-resume' },
    { id: 'arabe', label: '3. Cours Arabe A1', docId: 'cours-arabe-a1' },
    { id: 'alphabet', label: '4. Alphabet', docId: 'alphabet-arabe' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0">
      <div className="bg-[#FAF8F5] w-full max-w-5xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0F3524] via-emerald-950 to-[#0A2218] p-4 sm:p-6 text-white border-b border-emerald-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#FAF8F5] p-1 flex items-center justify-center shrink-0 border border-emerald-500/40 shadow-md">
              <img
                src={mosqueeLogo}
                alt="Logo Mosquée SALEM"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-900/90 px-2.5 py-0.5 rounded-full border border-emerald-700">
                  Fichiers Originaux Officiels
                </span>
                <span className="text-xs text-emerald-200 hidden sm:inline">
                  4 catégories séparées sans aucune fusion
                </span>
              </div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white mt-1">
                Supports de Cours & Téléchargements PDF
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors cursor-pointer"
            aria-label="Fermer la modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 4 Category Switcher Tabs: Prière | Islam | Cours Arabe A1 | Alphabet */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFolder(cat.id);
                  setSelectedDocId(cat.docId);
                  setActiveSectionIdx(0);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFolder === cat.id
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Folder className="w-4 h-4 text-amber-400" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {selectedDoc && (
            <div className="space-y-6">
              
              {/* Viewer Top Action Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {selectedDoc.badge}
                    </span>
                    {selectedDoc.pdfFileName && (
                      <span className="text-xs text-stone-500 font-mono">
                        {selectedDoc.pdfFileName}
                      </span>
                    )}
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-900 mt-1">
                    {selectedDoc.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {selectedDoc.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedDoc.pdfPath && (
                    <button
                      type="button"
                      disabled={downloadingDocId === selectedDoc.id}
                      onClick={() => handleDownload(selectedDoc.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 shadow-md transition-colors cursor-pointer"
                    >
                      {downloadingDocId === selectedDoc.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                          <span>Téléchargement en cours...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-emerald-950" />
                          <span>
                            {selectedDoc.folder === 'alphabet'
                              ? "Télécharger le fichier Alphabet"
                              : "Télécharger PDF"}
                          </span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => window.print()}
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
                    title="Imprimer cette fiche"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Clean Theme Jump Selector (No truncated horizontal pills) */}
              <div className="bg-stone-100 p-3 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                  <List className="w-4 h-4 text-emerald-800" />
                  <span>Aller au thème :</span>
                </div>

                <select
                  value={activeSectionIdx}
                  onChange={(e) => setActiveSectionIdx(Number(e.target.value))}
                  className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                  {selectedDoc.sections.map((sec, idx) => (
                    <option key={idx} value={idx}>
                      Thème {idx + 1} : {sec.title}
                    </option>
                  ))}
                </select>

                <div className="text-xs font-semibold text-emerald-900">
                  Thème {activeSectionIdx + 1} sur {selectedDoc.sections.length}
                </div>
              </div>

              {/* Active Theme Content Display */}
              {selectedDoc.sections[activeSectionIdx] && (
                <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
                  
                  {/* Title & Arabic Header */}
                  <div className="border-b border-stone-100 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-editorial text-2xl font-bold text-emerald-950">
                        {selectedDoc.sections[activeSectionIdx].title}
                      </h4>
                      {selectedDoc.sections[activeSectionIdx].arabicTitle && (
                        <span className="font-arabic font-bold text-xl text-emerald-800 select-all">
                          {selectedDoc.sections[activeSectionIdx].arabicTitle}
                        </span>
                      )}
                    </div>

                    {selectedDoc.sections[activeSectionIdx].subtitle && (
                      <p className="text-xs sm:text-sm text-stone-500 mt-1">
                        {selectedDoc.sections[activeSectionIdx].subtitle}
                      </p>
                    )}
                  </div>

                  {/* Intro text */}
                  {selectedDoc.sections[activeSectionIdx].intro && (
                    <p className="text-stone-800 text-sm sm:text-base font-medium italic bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
                      {selectedDoc.sections[activeSectionIdx].intro}
                    </p>
                  )}

                  {/* Paragraphs */}
                  <div className="space-y-3">
                    {selectedDoc.sections[activeSectionIdx].content.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-stone-700 text-sm sm:text-base leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Interactive Table if available */}
                  {selectedDoc.sections[activeSectionIdx].table && (
                    <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#0F3524] text-white">
                          <tr>
                            {selectedDoc.sections[activeSectionIdx].table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-semibold whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          {selectedDoc.sections[activeSectionIdx].table.rows.map((r, rIdx) => (
                            <tr
                              key={rIdx}
                              className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/80'}
                            >
                              {r.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3 ${
                                    /[\u0600-\u06FF]/.test(cell)
                                      ? 'font-arabic font-bold text-emerald-900 text-base'
                                      : 'text-stone-700'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Callout notice */}
                  {selectedDoc.sections[activeSectionIdx].callout && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>À retenir :</strong> {selectedDoc.sections[activeSectionIdx].callout}
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation with Partie précédente / Partie suivante */}
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <button
                      disabled={activeSectionIdx === 0}
                      onClick={() => setActiveSectionIdx((prev) => Math.max(0, prev - 1))}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                        activeSectionIdx === 0
                          ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Thème précédent</span>
                    </button>

                    <span className="text-xs font-semibold text-stone-500">
                      {activeSectionIdx + 1} / {selectedDoc.sections.length}
                    </span>

                    <button
                      disabled={activeSectionIdx === selectedDoc.sections.length - 1}
                      onClick={() =>
                        setActiveSectionIdx((prev) =>
                          Math.min(selectedDoc.sections.length - 1, prev + 1)
                        )
                      }
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                        activeSectionIdx === selectedDoc.sections.length - 1
                          ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400'
                          : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-xs'
                      }`}
                    >
                      <span>Thème suivant</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-3 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Mosquée SALEM de Saint-Sulpice-la-Pointe</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
