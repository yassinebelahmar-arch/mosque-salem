import React, { useState } from 'react';
import { Header } from './components/Header';
import { AlertBanner } from './components/AlertBanner';
import { Hero } from './components/Hero';
import { PrayerTimesStrip } from './components/PrayerTimesStrip';
import { MissionSection } from './components/MissionSection';
import { MawaqitSection } from './components/MawaqitSection';
import { ParkingDonationSection } from './components/ParkingDonationSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { NewsSection } from './components/NewsSection';
import { AboutMosqueSection } from './components/AboutMosqueSection';
import { ContactAndAccessSection } from './components/ContactAndAccessSection';
import { QuranDhikrSection } from './components/QuranDhikrSection';
import { PrayerCalendarModal } from './components/PrayerCalendarModal';
import { Footer } from './components/Footer';

import {
  INITIAL_NEWS,
  INITIAL_ACTIVITIES,
  INITIAL_PROJECT,
  INITIAL_SITE_CONFIG,
} from './data/initialData';
import { NewsItem, ActivityItem, ProjectCampaign, SiteConfig } from './types';

export default function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const config: SiteConfig = INITIAL_SITE_CONFIG;
  const news: NewsItem[] = INITIAL_NEWS;
  const [project, setProject] = useState<ProjectCampaign>(INITIAL_PROJECT);

  const cotizupUrl = project.cotizupUrl;
  const mawaqitUrl = 'https://mawaqit.net/fr/m/mosquee-salem-de-st-sulpice-la-pointe-saint-sulpice-la-pointe-81370-france-1';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans">
      {/* 1. Alert Banner for Important Announcements */}
      <AlertBanner
        enabled={config.alertBannerEnabled}
        text={config.alertBannerText}
        linkText={config.alertBannerLinkText}
        linkHref={config.alertBannerLinkHref}
      />

      {/* 2. Top Navigation Bar */}
      <Header cotizupUrl={cotizupUrl} />

      <main className="flex-1">
        {/* 3. Operational Today's Prayer Times Strip (Strictly fixed 5 prayers, no scrolling/dropdown) */}
        <PrayerTimesStrip
          mawaqitUrl={mawaqitUrl}
          overrideTimes={config.prayerTimesOverride}
          onOpenCalendar={() => setIsCalendarOpen(true)}
        />

        {/* 4. Full-Width Hero Section with Grand Mosque Photo and CTAs */}
        <Hero
          cotizupParkingUrl={cotizupUrl}
          onOpenCalendar={() => setIsCalendarOpen(true)}
        />

        {/* 5. Mission & Values Section */}
        <MissionSection />

        {/* 6. Official Mawaqit Integration Section & Full Monthly Calendar */}
        <MawaqitSection mawaqitUrl={mawaqitUrl} />

        {/* 7. Saint Coran & Dhikr Section */}
        <QuranDhikrSection />

        {/* 8. Grand Projet Parking Donation Section (CotizUp Conversion Block) */}
        <ParkingDonationSection
          project={project}
          onUpdateProject={setProject}
        />

        {/* 9. Activities & Arabic Lessons Section */}
        <ActivitiesSection activities={INITIAL_ACTIVITIES} />

        {/* 10. News & Latest Announcements Section */}
        <NewsSection news={news} cotizupUrl={cotizupUrl} />

        {/* 11. About the Mosque & Association Section */}
        <AboutMosqueSection />

        {/* 12. Location, Access & Contact Form Section */}
        <ContactAndAccessSection />
      </main>

      {/* 13. Footer */}
      <Footer
        cotizupParkingUrl={cotizupUrl}
        cotizupGeneralUrl={project.cotizupGeneralUrl}
        mawaqitUrl={mawaqitUrl}
      />

      {/* Full Monthly Prayer Calendar Modal */}
      <PrayerCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        mawaqitUrl={mawaqitUrl}
      />
    </div>
  );
}
