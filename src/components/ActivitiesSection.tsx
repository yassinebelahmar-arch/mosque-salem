import React, { useState } from 'react';
import {
  Mail,
  BookOpen,
  Users,
  Check,
  Copy,
  AlertCircle,
  Sparkles,
  Folder,
  Download,
  Eye,
  Loader2
} from 'lucide-react';
import { ActivityItem } from '../types';
import arabicCoursesImg from '../assets/images/arabic_learning_books_1792446068387.jpg';
import { PedagogicalResourcesModal, PedagogicalCategory } from './PedagogicalResourcesModal';
import { downloadPedagogicalPdf } from '../utils/generatePedagogicalPdf';

interface ActivitiesSectionProps {
  activities: ActivityItem[];
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isPedagogicalModalOpen, setIsPedagogicalModalOpen] = useState(false);
  const [modalInitialFolder, setModalInitialFolder] = useState<PedagogicalCategory>('priere');
  const [modalInitialDocId, setModalInitialDocId] = useState<string | undefined>(undefined);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const teacherEmail = 'prof.noursalem.Stsulpice@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(teacherEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const openPedagogicalFolder = (folder: PedagogicalCategory, docId?: string) => {
    setModalInitialFolder(folder);
    setModalInitialDocId(docId);
    setIsPedagogicalModalOpen(true);
  };

  const handleDirectDownload = async (docId: string) => {
    setDownloadingId(docId);
    await downloadPedagogicalPdf(docId, (loading) => {
      setDownloadingId(loading ? docId : null);
    });
  };

  return (
    <section id="activites" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Apprentissage, Éveil & Spiritualité</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            Les activités de la Mosquée SALEM
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Enseignement de la langue arabe et de la religion pour les enfants et adolescents (7 à 17 ans), futures sessions adultes et cercles spirituels du vendredi.
          </p>
        </div>

        {/* Featured Card: Arabic Courses for 7-17 years old with distinction of groups */}
        <div className="mb-10 bg-white rounded-3xl border border-stone-200/90 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Real Photo of Learning books */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-stone-100">
            <img
              src={arabicCoursesImg}
              alt="Manuels d'apprentissage de l'arabe et calligraphie"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/arabic-courses-books.jpg';
              }}
            />
            <div className="absolute top-4 left-4 bg-emerald-900/90 backdrop-blur-xs text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-700">
              Rentrée Septembre 2026-2027
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold">
                  Session 2026–2027 en cours
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  Deux groupes pédagogiques : 7-13 ans & 13-17 ans
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                Cours de langue arabe & mémorisation (7 à 17 ans)
              </h3>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Les cours s'organisent selon deux tranches d'âges pour adapter la pédagogie au rythme et à la maturité de chaque élève :
              </p>

              {/* Two Groups Presentation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Group 1: 7 to 13 years */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      Groupe 7 à 13 ans
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                      Éveil & Mémorisation
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Fondations & Éveil Spirituel
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Découverte de l'alphabet arabe, calligraphie progressive, apprentissage des petites sourates du Coran et initiation aux ablutions et à la prière.
                  </p>
                </div>

                {/* Group 2: 13 to 17 years */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white bg-emerald-900 px-2.5 py-0.5 rounded-full">
                      Groupe 13 à 17 ans
                    </span>
                    <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                      Approfondissement
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Étude Structurée & Documents Dédiés
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Perfectionnement de la lecture coranique, vocabulaire complet A1, grammaire pratique, et étude des repères essentiels de la religion (Salat, dogme, fiqh).
                  </p>
                </div>
              </div>

              {/* Inscription notice */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong className="font-semibold">Inscriptions 2026-2027 :</strong> Les effectifs pour les enfants et adolescents (7-17 ans) sont complets et les inscriptions sont actuellement clôturées.
                </div>
              </div>
            </div>

            {/* Direct Teacher Contact Block */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Contact pédagogique pour toute question :
                </div>
                <div className="text-sm sm:text-base font-bold text-stone-900 select-all font-mono">
                  {teacherEmail}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                  title="Copier l'e-mail du professeur"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Copié !' : 'Copier'}</span>
                </button>

                <a
                  href={`mailto:${teacherEmail}?subject=Question%20cours%20d'arabe%20Mosqu%C3%A9e%20SALEM`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Écrire un e-mail</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 4 SEPARATE CATEGORIES SECTION (PRIÈRE, ISLAM, COURS ARABE, ALPHABET) */}
        <div className="mb-12 bg-linear-to-br from-[#0F3524] to-[#0A2218] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-emerald-800 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/80 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-950 bg-amber-400">
                  4 Catégories Officielles
                </span>
                <span className="text-xs text-emerald-200">
                  Fichiers PDF & Alphabet originaux intacts (sans fusion)
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                Espace Ressources & Téléchargement des Fichiers PDF
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
                Téléchargez directement les 4 fichiers originaux dans leurs catégories respectives : <strong>Prière</strong>, <strong>Islam</strong>, <strong>Cours Arabe A1</strong> et <strong>Alphabet</strong>.
              </p>
            </div>

            <button
              onClick={() => openPedagogicalFolder('priere', 'cours-religion-priere-ablutions')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all self-start md:self-auto shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Ouvrir la liseuse des 4 catégories</span>
            </button>
          </div>

          {/* 4 DISTINCT CATEGORY CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* CATÉGORIE 1 : PRIÈRE */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-6 text-stone-900 border border-white/20 shadow-lg flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg">
                    <Folder className="w-4 h-4 text-emerald-800" />
                    <span>Catégorie : Prière</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Consultation en ligne · 7 thèmes
                  </span>
                </div>

                <h4 className="font-editorial text-xl font-bold text-stone-900">
                  J'apprends la Prière et les Ablutions
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Cours complet sur la prière et les ablutions : sens de la prière, rituel du Woudou, règles de la Awra, déroulement geste par geste et invocations.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openPedagogicalFolder('priere', 'cours-religion-priere-ablutions')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-amber-300" />
                  <span>Consulter le cours (Prière & Ablutions)</span>
                </button>
              </div>
            </div>

            {/* CATÉGORIE 2 : ISLAM */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-6 text-stone-900 border border-white/20 shadow-lg flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg">
                    <Folder className="w-4 h-4 text-emerald-800" />
                    <span>Catégorie : Islam</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    3 pages · 16 thèmes (PDF)
                  </span>
                </div>

                <h4 className="font-editorial text-xl font-bold text-stone-900">
                  Résumé Islam (Français - Arabe)
                </h4>

                <p className="text-xs text-stone-500 font-mono">
                  Fichier : Resume_islam_francais_arabe.pdf
                </p>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Guide de révision bilingue : croyances, les 5 piliers de l'islam, les 6 piliers de la foi, les 25 prophètes, sourates à apprendre, règles juridiques et bon comportement.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openPedagogicalFolder('islam', 'cours-religion-islam-resume')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lire</span>
                </button>

                <button
                  type="button"
                  disabled={downloadingId === 'cours-religion-islam-resume'}
                  onClick={() => handleDirectDownload('cours-religion-islam-resume')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 disabled:opacity-60 transition-colors shadow-xs cursor-pointer"
                >
                  {downloadingId === 'cours-religion-islam-resume' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Téléchargement...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>Télécharger PDF (Résumé Islam)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CATÉGORIE 3 : COURS ARABE */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-6 text-stone-900 border border-white/20 shadow-lg flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg">
                    <Folder className="w-4 h-4 text-emerald-800" />
                    <span>Catégorie : Cours Arabe</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    12 pages (PDF)
                  </span>
                </div>

                <h4 className="font-editorial text-xl font-bold text-stone-900">
                  Cours Arabe A1 Basique
                </h4>

                <p className="text-xs text-stone-500 font-mono">
                  Fichier : 916218149-Cours-Arabe-A1-Basique.pdf
                </p>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Manuel officiel Niveau A1 (non modifié) : lettres isolées avec exemples, voyelles courtes et longues, pronoms personnels et possessifs, phrases verbales et nominales, vocabulaire et 3 dialogues.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openPedagogicalFolder('arabe', 'cours-arabe-a1')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lire</span>
                </button>

                <button
                  type="button"
                  disabled={downloadingId === 'cours-arabe-a1'}
                  onClick={() => handleDirectDownload('cours-arabe-a1')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 disabled:opacity-60 transition-colors shadow-xs cursor-pointer"
                >
                  {downloadingId === 'cours-arabe-a1' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Téléchargement...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>Télécharger PDF (Cours Arabe A1)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CATÉGORIE 4 : ALPHABET */}
            <div className="bg-white/95 rounded-2xl p-5 sm:p-6 text-stone-900 border border-white/20 shadow-lg flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg">
                    <Folder className="w-4 h-4 text-emerald-800" />
                    <span>Catégorie : Alphabet</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Planche Officielle (JPG)
                  </span>
                </div>

                <h4 className="font-editorial text-xl font-bold text-stone-900">
                  Tableau de l'Alphabet Arabe
                </h4>

                <p className="text-xs text-stone-500 font-mono">
                  Fichier : Alphabet.jpg
                </p>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Planche de référence des 28 lettres de l'alphabet arabe avec leurs 4 positions (Fin, Milieu, Début, Isolée), transcription phonétique et règle des 6 lettres non-liantes.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openPedagogicalFolder('alphabet', 'alphabet-arabe')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Consulter</span>
                </button>

                <button
                  type="button"
                  disabled={downloadingId === 'alphabet-arabe'}
                  onClick={() => handleDirectDownload('alphabet-arabe')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 disabled:opacity-60 transition-colors shadow-xs cursor-pointer"
                >
                  {downloadingId === 'alphabet-arabe' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Téléchargement...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>Télécharger le fichier Alphabet</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Active Activities Grid (Adults coming soon, Jumuaa, Friday spiritual circle) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Adult sessions coming soon */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                </div>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Lancement prochain
                </span>
              </div>

              <h4 className="font-editorial text-xl font-bold text-stone-900 leading-snug">
                Cours pour adultes (Femmes & Hommes)
              </h4>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Apprentissage de la langue arabe, lecture coranique et tajwîd adapté aux débutants et initiés. Les créneaux et modalités d'inscription seront annoncés prochainement.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Section Femmes & Hommes</span>
              <span className="text-amber-800 font-semibold">Bientôt disponible</span>
            </div>
          </div>

          {/* Activity 2: Friday Spiritual Circle */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-emerald-800" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Chaque semaine
                </span>
              </div>

              <h4 className="font-editorial text-xl font-bold text-stone-900 leading-snug">
                Cercle de rappel & spiritualité
              </h4>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Chaque vendredi après la prière du Maghrib, un moment de partage, d'enseignement religieux et de méditation ouvert à toute la communauté.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Vendredi après Maghrib</span>
              <span className="text-emerald-800 font-semibold">Ouvert à tous</span>
            </div>
          </div>

          {/* Activity 3: Joumou'a Prayers */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5 text-emerald-800" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Grand rassemblement
                </span>
              </div>

              <h4 className="font-editorial text-xl font-bold text-stone-900 leading-snug">
                Grande prière du Vendredi (Joumou'a)
              </h4>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Sermon en français puis en arabe. Khotba à 13h00, suivie de la prière en assemblée. Accueil des fidèles hommes et femmes dans les espaces dédiés.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Khotba 13h00</span>
              <span className="text-emerald-800 font-semibold">Vendredi</span>
            </div>
          </div>

        </div>

      </div>

      {/* Pedagogical Interactive Viewer Modal */}
      <PedagogicalResourcesModal
        isOpen={isPedagogicalModalOpen}
        onClose={() => setIsPedagogicalModalOpen(false)}
        initialFolder={modalInitialFolder}
        initialDocId={modalInitialDocId}
      />

    </section>
  );
};
