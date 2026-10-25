import React from 'react';
import { Compass, BookOpen, Car, ArrowRight } from 'lucide-react';

export const AboutMosqueSection: React.FC = () => {
  const spaces = [
    {
      badge: 'Espaces cultuels',
      title: 'Salles de prière (Hommes & Femmes)',
      desc: 'Un lieu de recueillement propre et apaisant comprenant l’espace pour les hommes, une salle dédiée aux femmes, ainsi que des zones d’ablutions aménagées dans le respect des règles d’hygiène.',
      icon: Compass,
      tag: '5 prières & Joumou’a',
      linkText: 'Voir les horaires Mawaqit',
      linkHref: '#horaires',
    },
    {
      badge: 'Pédagogie & Transmission',
      title: 'Classes d’apprentissage & Bibliothèque',
      desc: 'Des locaux équipés pour l’enseignement de la langue arabe et du Coran pour les enfants (dès 7 ans) le week-end, la préparation des futures sessions pour adultes, et la tenue des cercles spirituels du vendredi.',
      icon: BookOpen,
      tag: 'Session 2026–2027',
      linkText: 'Consulter les activités',
      linkHref: '#activites',
    },
    {
      badge: 'Aménagement en cours',
      title: 'Grand Projet Parking & Voirie',
      desc: 'Projet d’aménagement complet du parking attenant de la mosquée (terrassement, enrobé et éclairage) afin de fluidifier les arrivées et préserver la tranquillité du quartier des Montamats.',
      icon: Car,
      tag: 'Collecte CotizUp en cours',
      linkText: 'Participer au financement',
      linkHref: '#projet-parking',
      highlight: true,
    },
  ];

  return (
    <section id="la-mosquee" className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Pure focus on spaces and facilities */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Infrastructures & Aménagements</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            Les Espaces de la Mosquée SALEM
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Au service des fidèles de Saint-Sulpice et les environs. Un lieu pensé pour la prière fraternelle, la transmission studieuse du savoir et l’accueil respectueux de tous les fidèles au 340 Rue des Montamats (pas loin d'ALDI).
          </p>
        </div>

        {/* 3 Spaces Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {spaces.map((space, index) => {
            const Icon = space.icon;
            return (
              <div
                key={index}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md ${
                  space.highlight
                    ? 'bg-gradient-to-b from-[#0F3223] to-[#0A261A] text-white border border-emerald-700/80 shadow-emerald-950/20'
                    : 'bg-white text-stone-800 border border-stone-200/90 hover:border-emerald-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        space.highlight
                          ? 'bg-amber-400 text-emerald-950'
                          : 'bg-emerald-50 text-emerald-900 border border-emerald-200/60'
                      }`}
                    >
                      {space.badge}
                    </span>

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                        space.highlight
                          ? 'bg-emerald-900/80 text-amber-300 border border-emerald-700/60'
                          : 'bg-stone-50 text-emerald-800 border border-stone-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className={`font-editorial text-2xl font-bold leading-snug ${
                      space.highlight ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {space.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed ${
                      space.highlight ? 'text-emerald-100/85' : 'text-stone-600'
                    }`}
                  >
                    {space.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      space.highlight ? 'text-amber-300' : 'text-stone-500'
                    }`}
                  >
                    {space.tag}
                  </span>

                  <a
                    href={space.linkHref}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                      space.highlight
                        ? 'text-white hover:text-amber-300'
                        : 'text-emerald-800 hover:text-emerald-600'
                    }`}
                  >
                    <span>{space.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
