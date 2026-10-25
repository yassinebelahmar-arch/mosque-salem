import React, { useState } from 'react';
import { MapPin, Mail, ExternalLink, Send, CheckCircle2, Car, Train } from 'lucide-react';

export const ContactAndAccessSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Général',
    message: '',
  });

  const address = "340 Rue des Montamats (pas loin d'ALDI), 81370 Saint-Sulpice-la-Pointe";
  const mosqueEmail = 'Contact@mosquee-stsulpice81.org';
  const teacherEmail = 'prof.noursalem.Stsulpice@gmail.com';
  // Reliable Google Maps search & navigation URL
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=340+Rue+des+Montamats+81370+Saint-Sulpice-la-Pointe';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://formbold.com/s/3O7xR', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'Visiteur du site',
          Email: formData.email,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        // Fallback to native form post if JSON submission is refused
        e.currentTarget.submit();
      }
    } catch {
      // In case of network / CORS restriction in preview, fallback to native submit
      e.currentTarget.submit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Localisation, Itinéraire & Contact</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            Venir à la mosquée & nous contacter
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Située au 340 Rue des Montamats (pas loin d'ALDI) à Saint-Sulpice-la-Pointe, la Mosquée SALEM est accessible rapidement depuis Toulouse et Albi par l’A68 ou en train par la gare SNCF.
          </p>
        </div>

        {/* 2-Column Grid: Coordinates & Map on Left + Contact Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Coordinates & Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Practical Coordinates Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Adresse</span>
                </div>
                <div className="text-sm font-bold text-stone-900 leading-snug">
                  Mosquée SALEM
                </div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  340 Rue des Montamats <strong className="text-emerald-800 font-semibold">(pas loin d'ALDI)</strong><br />
                  81370 Saint-Sulpice-la-Pointe
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>Courriel officiel</span>
                </div>
                <div className="text-sm font-bold text-stone-900 leading-snug">
                  Contact Mosquée
                </div>
                <a
                  href={`mailto:${mosqueEmail}`}
                  className="text-xs text-emerald-800 hover:text-emerald-950 underline break-all font-mono font-bold block"
                >
                  {mosqueEmail}
                </a>
                <span className="text-[11px] text-stone-500 block">
                  Cours d'arabe : <span className="font-mono text-stone-700">{teacherEmail}</span>
                </span>
              </div>
            </div>

            {/* Access & Transports guide */}
            <div className="p-5 rounded-2xl bg-[#0F3223] text-white border border-emerald-800 space-y-3">
              <h4 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                <span>Accès & Consignes de stationnement</span>
              </h4>
              <div className="text-xs text-emerald-100/85 space-y-2 leading-relaxed">
                <p>
                  • <strong>En voiture :</strong> Accès direct depuis l’autoroute A68 (sortie Saint-Sulpice-la-Pointe). La mosquée se trouve Rue des Montamats, <strong>pas loin d'ALDI</strong>.
                </p>
                <p>
                  • <strong>En train :</strong> Gare SNCF de Saint-Sulpice-la-Pointe à quelques minutes (lignes TER Toulouse - Rodez / Mazamet).
                </p>
                <p className="bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-700/60 text-amber-200">
                  • <strong>Consignes civiques :</strong> Pour le respect de tous, veuillez stationner correctement sur les emplacements autorisés sans bloquer les voies de circulation ni les sorties des riverains dans l’attente de l’aménagement complet du parking.
                </p>
              </div>
            </div>

            {/* Working Google Maps Embed & Direct Route Link */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 relative">
              <div className="p-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs text-stone-700">
                <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mosquée SALEM · 340 Rue des Montamats</span>
                </span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Ouvrir dans Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Responsive Google Maps Iframe */}
              <iframe
                title="Localisation Google Maps Mosquée SALEM Saint-Sulpice-la-Pointe"
                src="https://maps.google.com/maps?q=340+Rue+des+Montamats,+81370+Saint-Sulpice-la-Pointe,+France&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-6 bg-[#FAF8F5] p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-md">
            <h3 className="font-editorial text-2xl font-bold text-stone-900 mb-2">
              Envoyer un message à l'association
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              Une question sur les horaires, les cours d'arabe ou le projet de parking ? Écrivez-nous directement via ce formulaire.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-base text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Votre message a été transmis avec succès</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  Barak Allahu fik. Les responsables de la mosquée ou l’équipe pédagogique prendront connaissance de votre demande et vous répondront à l'adresse <strong>{formData.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Général', message: '' });
                  }}
                  className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-950 pt-2"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                action="https://formbold.com/s/3O7xR"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nom & Prénom *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Votre e-mail *
                  </label>
                  <input
                    id="email"
                    name="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Objet de votre demande *
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  >
                    <option value="Général">Renseignement général sur la mosquée</option>
                    <option value="Cours d'arabe">Cours d'arabe (prof.noursalem.Stsulpice@gmail.com)</option>
                    <option value="Projet Parking">Grand Projet Parking (CotizUp)</option>
                    <option value="Vendredi & Culte">Horaires de prière & Joumou'a (13h41)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Votre message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Écrivez votre message ici..."
                    className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-colors resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                    {submitError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 disabled:opacity-75 disabled:cursor-not-allowed rounded-xl transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Envoi en cours via FormBold...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer mon message</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-stone-500 text-center">
                  Formulaire sécurisé via FormBold · Vos informations ne sont jamais transmises à des tiers.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
