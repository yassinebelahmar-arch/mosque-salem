import React from 'react';
import {
  Check,
  Heart,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  Accessibility,
  Car,
  BookOpen,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import mosqueeInterior from '../assets/images/mosquee-salem-interior.jpg';
import mosqueeLogo from '../assets/images/mosquee-salem-logo.png';

interface HeroProps {
  cotizupParkingUrl: string;
  onOpenCalendar?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ cotizupParkingUrl, onOpenCalendar }) => {
  // 10 key features and services explicitly requested by the user:
  // Foi et spiritualité, Fraternité, Partage, Prière quotidienne, Espace pour femmes,
  // Salle d'ablution, Cours pour adultes, Cours pour enfants, Accès handicapés, Parking
  const mosqueFeatures = [
    { label: 'Foi et spiritualité', icon: Sparkles },
    { label: 'Fraternité', icon: Users },
    { label: 'Partage', icon: Heart },
    { label: 'Prière quotidienne', icon: Clock },
    { label: 'Espace pour femmes', icon: Check },
    { label: 'Salle d’ablution', icon: Check },
    { label: 'Cours pour adultes', icon: BookOpen },
    { label: 'Cours pour enfants', icon: BookOpen },
    { label: 'Accès handicapés (PMR)', icon: Accessibility },
    { label: 'Parking', icon: Car },
  ];

  return (
    <section id="accueil" className="relative bg-[#0A261A] text-white overflow-hidden pb-12 sm:pb-16 lg:pb-20">
      {/* Ambient background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-14 relative z-10">
        
        {/* Top Section: Title, Introduction & 10 Core Services Grid */}
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
          
          {/* Location & Organization Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-700/60 text-xs font-semibold text-emerald-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Saint-Sulpice-la-Pointe (81370 · 340 Rue des Montamats, pas loin d'ALDI) · Association SALEM</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-3">
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Bienvenue à la <br className="sm:hidden" />
              <span className="text-amber-300">Mosquée SALEM</span>
            </h1>

            <p className="font-editorial text-xl sm:text-2xl text-emerald-100/90 italic font-medium leading-relaxed max-w-2xl mx-auto">
              Au service des fidèles de Saint-Sulpice et les environs.
            </p>
          </div>

          {/* Welcoming Text */}
          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-2xl mx-auto">
            Bienvenue sur le site officiel de la Mosquée SALEM. Retrouvez ici les horaires de prière officiels synchronisés, le calendrier complet, les informations pratiques et les projets de la communauté.
          </p>

          {/* 10 Services & Values Badges */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 text-xs text-emerald-100 font-medium">
              {mosqueFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.label}
                    className="flex items-center gap-2 bg-emerald-950/60 hover:bg-emerald-900/70 px-2.5 py-2 rounded-xl border border-emerald-700/40 transition-colors justify-center sm:justify-start"
                  >
                    <div className="w-5 h-5 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 border border-emerald-600/50">
                      <Icon className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="truncate text-left text-[11px] sm:text-xs font-medium">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#projet-parking"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all transform active:scale-98 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-emerald-950" />
              <span>Soutenir le projet du parking</span>
            </a>

            <a
              href="#horaires"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white hover:text-amber-300 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Consulter les horaires & calendrier</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#coran-dhikr"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-emerald-200 hover:text-white bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-700/50 rounded-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Coran & Dhikr</span>
            </a>
          </div>

        </div>
      </div>

      {/* 
        FULL-BLEED AUTHENTIC MOSQUE PHOTO
        Breaks out of the page margins and spans 100% of the screen width!
        "Quand on grandit la page, faire en sorte que ça sorte de la page."
      */}
      <div className="mt-8 sm:mt-12 w-full relative z-10">
        <div className="relative w-full overflow-hidden border-y-2 border-emerald-500/40 shadow-2xl bg-emerald-950 group h-[420px] sm:h-[560px] lg:h-[700px] 2xl:h-[820px]">
          
          {/* The Authentic 1920x1080 Photograph of Mosquée Salem */}
          <img
            src={mosqueeInterior}
            alt="Photo authentique de la salle de prière de la Mosquée SALEM de Saint-Sulpice-la-Pointe"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-1000 ease-out"
            loading="eager"
          />
          
          {/* Elegant vignette and subtle gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

          {/* Top badges bar constrained to container */}
          <div className="absolute top-4 sm:top-6 left-0 right-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
              <div className="bg-emerald-950/90 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-emerald-500/60 text-xs sm:text-sm font-bold text-white flex items-center gap-2.5 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Photo authentique · Salle de prière de la Mosquée SALEM</span>
              </div>

              <div className="hidden sm:flex bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs text-white/90 items-center gap-2 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>340 Rue des Montamats · 81370 Saint-Sulpice</span>
              </div>
            </div>
          </div>

          {/* Bottom floating glass bar with logo, details and schedule */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
              <div className="bg-stone-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/20 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Logo and Mosquée Presentation */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center shrink-0 border border-emerald-400 p-1 shadow-md">
                      <img
                        src={mosqueeLogo}
                        alt="Logo Mosquée SALEM"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-editorial text-lg sm:text-xl font-bold text-white leading-tight">
                        Mosquée SALEM de Saint-Sulpice-la-Pointe
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-200/90 flex items-center gap-1.5 mt-0.5">
                        <span>Lieu de culte musulman</span>
                        <span>·</span>
                        <span>5 prières quotidiennes & Joumou'a</span>
                        <span>·</span>
                        <span className="text-amber-300 font-semibold">Tarn (81)</span>
                      </p>
                    </div>
                  </div>

                  {/* Friday / Jumua highlight */}
                  <div className="flex items-center gap-3 bg-emerald-950/80 px-4 py-2.5 rounded-xl border border-emerald-700/60 shrink-0 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-stone-300 block text-[11px] uppercase font-semibold">Vendredi · Joumou'a</span>
                      <strong className="text-amber-300 font-bold">Khotba 13h · Salat après khotba</strong>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
