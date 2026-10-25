import React from 'react';
import { ArrowRight, BookOpen, Users, HeartHandshake, ShieldCheck, Accessibility, Car } from 'lucide-react';
import mosqueeStandardHero from '../assets/images/mosquee-standard-hero.jpg';

export const MissionSection: React.FC = () => {
  const stats = [
    { value: '+250', label: 'Fidèles & familles', desc: 'Saint-Sulpice & environs' },
    { value: '5', label: 'Prières quotidiennes', desc: 'Aux horaires Mawaqit' },
    { value: 'Parking', label: 'Projet d’aménagement', desc: 'Stationnement & Sécurité' },
    { value: '100%', label: 'Engagement bénévole', desc: 'Association SALEM' },
  ];

  const spaces = [
    {
      title: 'Salle de prière & Espace Femmes',
      desc: 'Un espace chaleureux avec moquette confortable, mihrab et minbar, ainsi qu’une salle réservée pour accueillir les sœurs dans la dignité.',
    },
    {
      title: 'Espaces d’ablutions & Propreté',
      desc: 'Installations dédiées aux ablutions (Woudhou) pour les hommes et les femmes avant chaque prière.',
    },
    {
      title: 'Accessibilité Handicapés (PMR)',
      desc: 'Accès adapté pour les personnes à mobilité réduite et les personnes âgées.',
    },
    {
      title: 'Salles de cours pour les enfants & adultes',
      desc: 'Locaux aménagés pour l’enseignement de la langue arabe, de la lecture et de la récitation coranique.',
    },
  ];

  return (
    <section id="la-mosquee" className="py-16 sm:py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            <span>Les Espaces & Services de la Mosquée</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight text-balance">
            Un lieu de prière, d'accueil et d'apprentissage au service de tous
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Située au 340 Rue des Montamats, la Mosquée SALEM accueille la communauté pour les 5 prières quotidiennes, le grand rassemblement du vendredi et l'enseignement studieux.
          </p>
        </div>

        {/* 2-Column Split: Mosque Real Photo on Left + Green Card with Stats on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Clean Mosque Architecture Image */}
          <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-stone-200/80 bg-stone-100 min-h-[340px] lg:min-h-full relative group">
            <img
              src={mosqueeStandardHero}
              alt="Espace et architecture de sérénité"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-lg">
              Cadre de recueillement & de fraternité
            </div>
          </div>

          {/* Right: Deep Green Feature Card */}
          <div className="lg:col-span-7 bg-[#0F3223] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-xl border border-emerald-800/60">
            <div className="space-y-4">
              <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                Au service des fidèles de Saint-Sulpice
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-snug">
                Prier dans la sérénité et transmettre aux générations futures
              </h3>
              <p className="text-emerald-100/85 text-sm sm:text-base leading-relaxed">
                Notre association veille au bon fonctionnement du lieu de culte, à l’accueil des fidèles pour les cinq prières quotidiennes et le Joumou’a, ainsi qu’à l’enseignement de la langue arabe dans un cadre fraternel et ordonné.
              </p>

              <div className="pt-2">
                <a
                  href="#projet-parking"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm"
                >
                  <span>Soutenir le grand projet du parking</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Stats strip at the bottom of the card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-emerald-800/80">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-editorial text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-emerald-200/70">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4 Practical Spaces & Infrastructure Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {spaces.map((sp, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs">
                0{idx + 1}
              </div>
              <h4 className="font-editorial text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {sp.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {sp.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
