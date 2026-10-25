export interface PrayerTimeItem {
  id: string;
  name: string;
  arabicName: string;
  time: string; // HH:mm
  iqamaTime?: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'cours' | 'projet' | 'communaute' | 'vie-spirituelle';
  date: string;
  excerpt: string;
  content: string;
  contactEmail?: string;
  badge?: string;
  isUrgent?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  targetAudience: string;
  schedule: string;
  contact: string;
  status: 'en_cours' | 'cloture' | 'a_venir';
  statusLabel: string;
  description: string;
  iconName: 'book' | 'users' | 'heart' | 'calendar';
}

export interface ProjectCampaign {
  title: string;
  subtitle: string;
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  cotizupUrl: string;
  cotizupGeneralUrl: string;
  phases: {
    number: string;
    title: string;
    description: string;
    status: 'termine' | 'en_cours' | 'a_venir';
  }[];
}

export interface SiteConfig {
  alertBannerEnabled: boolean;
  alertBannerText: string;
  alertBannerLinkText?: string;
  alertBannerLinkHref?: string;
  prayerTimesOverride?: Record<string, string>;
}
