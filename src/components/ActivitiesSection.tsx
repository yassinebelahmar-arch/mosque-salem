import React, { useState } from 'react';
import { Mail, BookOpen, Users, Calendar, Check, Copy, AlertCircle, Sparkles } from 'lucide-react';
import { ActivityItem } from '../types';
import arabicCoursesImg from '../assets/images/arabic_learning_books_1792446068387.jpg';

interface ActivitiesSectionProps {
  activities: ActivityItem[];
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const teacherEmail = 'prof.noursalem.Stsulpice@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(teacherEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
            Enseignement de la langue arabe pour les enfants (7 à 17 ans), futures sessions adultes, et cercles de rappel spirituels chaque vendredi après le Maghrib.
          </p>
        </div>

        {/* Featured Card: Arabic Courses for 7-17 years old */}
        <div className="mb-10 bg-white rounded-3xl border border-stone-200/90 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Real Photo or Learning books */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-stone-100">
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
                  Enfants de 7 à 17 ans
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                Cours de langue arabe & mémorisation (7 à 17 ans)
              </h3>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Les cours ont démarré début septembre. Le programme permet aux enfants d'acquérir les bases de l'alphabet, une lecture fluide du Coran, les règles de tajwîd ainsi que les vertus morales.
              </p>

              {/* Inscription notice */}
              <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong className="font-semibold">Inscriptions 2026-2027 :</strong> Les effectifs pour les enfants (7-17 ans) sont complets et les inscriptions sont actuellement clôturées.
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
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
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

        {/* 3 Active Activities Grid (Adults coming soon, Jumuaa, Friday spiritual circle) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Adult sessions coming soon (requested by user) */}
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

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Des sessions d'apprentissage pour adultes (groupes séparés femmes et hommes) vont être lancées très prochainement pour apprendre à lire et perfectionner la récitation.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
              <strong className="text-stone-700">Renseignements :</strong> {teacherEmail}
            </div>
          </div>

          {/* Daily Prayers & Jumuaa */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5 text-emerald-700" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Tous les jours
                </span>
              </div>

              <h4 className="font-editorial text-xl font-bold text-stone-900 leading-snug">
                5 Prières quotidiennes & Joumou’a
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Ouvert pour chaque salat aux horaires Mawaqit (Fajr 06:57). Grande prière du vendredi avec sermon bilingue : Khotba à 13h15, Salat à 13h40.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
              <strong className="text-stone-700">Lieu :</strong> 340 Rue des Montamats
            </div>
          </div>

          {/* Friday Circles after Maghrib (explicitly specified by user) */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Tous les vendredis
                </span>
              </div>

              <h4 className="font-editorial text-xl font-bold text-stone-900 leading-snug">
                Cercles de rappel & Méditation
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Chaque vendredi après la prière du Maghrib, un moment de rappel fraternel, d’explication de hadiths et de méditation pour nourrir sa spiritualité.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
              <strong className="text-stone-700">Horaire :</strong> Tous les vendredis après Maghrib
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
