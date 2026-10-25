import React, { useState } from 'react';
import { Calendar, Tag, ArrowRight, ExternalLink, Mail, CheckCircle2, AlertTriangle } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsSectionProps {
  news: NewsItem[];
  cotizupUrl: string;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news, cotizupUrl }) => {
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les actualités' },
    { id: 'cours', label: 'Cours d’arabe' },
    { id: 'projet', label: 'Projet Parking' },
    { id: 'vie-spirituelle', label: 'Vie spirituelle' },
    { id: 'communaute', label: 'Communauté' },
  ];

  const filteredNews = filter === 'all' ? news : news.filter(n => n.category === filter);

  return (
    <section id="actualites" className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Informations & Vie de l’Association</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Dernières actualités de la mosquée
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Consultez les dernières annonces officielles, les évolutions du projet de parking et la vie de notre communauté à Saint-Sulpice-la-Pointe.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                  filter === cat.id
                    ? 'bg-emerald-900 text-white shadow-xs font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredNews.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <article
                key={item.id}
                className={`bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border transition-all ${
                  item.isUrgent
                    ? 'border-amber-400/90 shadow-sm'
                    : 'border-stone-200/90 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs text-stone-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-emerald-800 uppercase tracking-wider text-[11px]">
                      {item.badge || item.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {item.date}
                    </span>
                  </div>

                  {item.isUrgent && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-bold text-[10px] uppercase tracking-wide">
                      En cours
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>

                {isExpanded && (
                  <div className="pt-4 border-t border-stone-200/80 text-sm text-stone-700 space-y-3 animate-in fade-in duration-200">
                    <p className="leading-relaxed bg-white p-4 rounded-xl border border-stone-200/70">
                      {item.content}
                    </p>

                    {item.category === 'projet' && (
                      <div className="pt-2">
                        <a
                          href={cotizupUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                        >
                          <span>Accéder à la cagnotte CotizUp</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                    {item.contactEmail && (
                      <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
                        <Mail className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Pour toute question :</span>
                        <a
                          href={`mailto:${item.contactEmail}`}
                          className="font-medium text-emerald-800 underline hover:text-emerald-950"
                        >
                          {item.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    <span>{isExpanded ? 'Réduire l’article' : 'Lire la suite'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {item.category === 'projet' && (
                    <a
                      href="#projet-parking"
                      className="text-xs font-semibold text-amber-800 hover:text-amber-950 underline"
                    >
                      Détails projet
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
