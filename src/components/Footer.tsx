import React from 'react';
import { Heart, ExternalLink, MapPin, Mail, Clock } from 'lucide-react';

interface FooterProps {
  cotizupParkingUrl: string;
  cotizupGeneralUrl: string;
  mawaqitUrl: string;
}

export const Footer: React.FC<FooterProps> = ({
  cotizupParkingUrl,
  cotizupGeneralUrl,
  mawaqitUrl,
}) => {
  return (
    <footer className="bg-[#0A2218] text-white border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#0F3524] border border-emerald-800 flex items-center justify-center p-1">
                <img
                  src="/assets/mosquee-salem-logo.png"
                  alt="Logo Mosquée SALEM"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-editorial text-xl font-bold tracking-wide text-white block">
                  MOSQUÉE SALEM
                </span>
                <span className="text-xs text-emerald-300 font-medium tracking-wider uppercase">
                  Saint-Sulpice-la-Pointe
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Au service des fidèles de Saint-Sulpice et les environs. Lieu de prière, de fraternité et de transmission. Association cultuelle et culturelle régie par la loi 1901.
            </p>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="font-editorial text-lg font-bold text-amber-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <a href="#accueil" className="hover:text-amber-300 transition-colors">
                  Accueil & Présentation
                </a>
              </li>
              <li>
                <a href="#horaires" className="hover:text-amber-300 transition-colors">
                  Horaires officiels Mawaqit
                </a>
              </li>
              <li>
                <a href="#la-mosquee" className="hover:text-amber-300 transition-colors">
                  La Mosquée & L'Association
                </a>
              </li>
              <li>
                <a href="#activites" className="hover:text-amber-300 transition-colors">
                  Cours d'arabe & Activités
                </a>
              </li>
              <li>
                <a href="#actualites" className="hover:text-amber-300 transition-colors">
                  Actualités récentes
                </a>
              </li>
              <li>
                <a href="#projet-parking" className="hover:text-amber-300 transition-colors font-semibold text-amber-200">
                  Projet de Financement du Parking
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Contact, Accès & Itinéraire
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordonnées & Accès */}
          <div className="space-y-3">
            <h4 className="font-editorial text-lg font-bold text-amber-300">
              Coordonnées
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  340 Rue des Montamats (pas loin d'ALDI)<br />
                  81370 Saint-Sulpice-la-Pointe
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:Contact@mosquee-stsulpice81.org"
                  className="hover:text-white underline break-all font-semibold"
                >
                  Contact@mosquee-stsulpice81.org
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  Ouvert pour les 5 prières quotidiennes et le sermon du vendredi (Joumou’a : Sermon en français puis en arabe · Adhan pour Khotba 13h · Salat Après khotba).
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Dons & Liens Officiels */}
          <div className="space-y-4">
            <h4 className="font-editorial text-lg font-bold text-amber-300">
              Soutien & Liens
            </h4>

            <div className="space-y-2.5">
              <a
                href={cotizupParkingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-semibold text-xs transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-emerald-950" />
                  <span>Projet Parking CotizUp</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={mawaqitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800 text-white font-medium text-xs transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Page officielle Mawaqit</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-[11px] text-emerald-200/60 leading-relaxed">
              Chaque don est une aumône continue (Sadaqa Jariya) qui profite directement au développement de la communauté musulmane de Saint-Sulpice.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <div>
            © {new Date().getFullYear()} Mosquée SALEM de Saint-Sulpice-la-Pointe. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span>Association loi 1901</span>
            <span aria-hidden="true">·</span>
            <a href="#horaires" className="hover:text-white transition-colors">
              Mawaqit
            </a>
            <span aria-hidden="true">·</span>
            <a href="#projet-parking" className="hover:text-white transition-colors">
              CotizUp Parking
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
