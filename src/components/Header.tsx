import React, { useState } from 'react';
import { Menu, X, Heart, ExternalLink } from 'lucide-react';
import mosqueeLogo from '../assets/images/mosquee-salem-logo.png';

interface HeaderProps {
  cotizupUrl: string;
}

export const Header: React.FC<HeaderProps> = ({ cotizupUrl }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', shortLabel: 'Accueil', href: '#accueil' },
    { label: 'Horaires Mawaqit', shortLabel: 'Horaires', href: '#horaires' },
    { label: 'Coran & Dhikr', shortLabel: 'Coran & Dhikr', href: '#coran-dhikr' },
    { label: 'La Mosquée & Espaces', shortLabel: 'Mosquée', href: '#la-mosquee' },
    { label: 'Activités & Cours', shortLabel: 'Activités', href: '#activites' },
    { label: 'Actualités', shortLabel: 'Actualités', href: '#actualites' },
    { label: 'Projet Parking', shortLabel: 'Parking', href: '#projet-parking' },
    { label: 'Contact & Accès', shortLabel: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F3223]/95 backdrop-blur-md border-b border-emerald-900/60 text-white shadow-sm transition-all w-full">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-1.5 sm:gap-3">
          
          {/* Zone 1: Brand Wordmark & Official Clear Logo */}
          <a
            href="#accueil"
            className="flex items-center gap-1.5 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-0.5 shrink-0 min-w-0"
            aria-label="Accueil Mosquée SALEM Saint-Sulpice-la-Pointe"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-[#FAF8F5] border border-emerald-700/40 flex items-center justify-center shadow-xs group-hover:border-amber-400/80 transition-colors p-1 shrink-0">
              <img
                src={mosqueeLogo}
                alt="Logo Mosquée SALEM"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-editorial text-sm sm:text-base md:text-lg 2xl:text-xl font-bold tracking-wide text-white leading-tight flex items-center gap-1 whitespace-nowrap">
                MOSQUÉE SALEM
              </span>
              <span className="hidden xs:inline text-[8px] sm:text-[10px] md:text-[11px] text-emerald-200/80 font-medium tracking-wider uppercase whitespace-nowrap">
                Saint-Sulpice-la-Pointe
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop - Compact & Responsive) */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-5 text-xs 2xl:text-sm font-medium text-emerald-100/90 mx-auto px-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 px-1.5 rounded hover:bg-emerald-900/40 border-b border-transparent hover:border-amber-400/60"
              >
                <span className="hidden 2xl:inline">{link.label}</span>
                <span className="2xl:hidden">{link.shortLabel}</span>
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary CTA (Faire un don) - ALWAYS 100% VISIBLE ON MOBILE, TABLET & PC */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0 z-10">
            {/* Primary Action Button: Faire un don - firmly fits inside viewport on any device */}
            <a
              href="#projet-parking"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg sm:rounded-xl shadow-md transition-all transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-950 shrink-0" />
              <span>Faire un don</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/60 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A2419] border-b border-emerald-900 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-emerald-100 hover:text-amber-300 hover:bg-emerald-900/50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-emerald-900/80 flex flex-col gap-2.5">
            <a
              href={cotizupUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg text-center"
            >
              <Heart className="w-4 h-4 fill-emerald-950" />
              <span>Soutenir le parking sur CotizUp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
