import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface AlertBannerProps {
  enabled: boolean;
  text: string;
  linkText?: string;
  linkHref?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  enabled,
  text,
  linkText,
  linkHref,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (!enabled || dismissed || !text) return null;

  return (
    <aside
      aria-label="Annonce officielle"
      className="bg-amber-500/15 border-b border-amber-500/30 text-amber-950 px-3 sm:px-4 py-2 transition-all text-xs sm:text-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400 text-emerald-950 shrink-0 font-bold text-[10px]">
            i
          </span>
          <div className="font-medium text-amber-950 text-xs sm:text-sm flex flex-wrap items-center gap-x-1.5">
            <span>{text}</span>
            {linkText && linkHref && (
              <a
                href={linkHref}
                className="inline-flex items-center gap-0.5 font-bold text-emerald-900 hover:text-emerald-700 underline underline-offset-2 shrink-0"
              >
                <span>{linkText}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-amber-900/70 hover:text-amber-950 rounded hover:bg-amber-500/20 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          aria-label="Fermer l'annonce"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
