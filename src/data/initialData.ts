import { NewsItem, ActivityItem, ProjectCampaign, SiteConfig } from '../types';

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Cours d’arabe : rentrée effectuée en septembre, inscriptions clôturées (7-17 ans)',
    category: 'cours',
    date: '10 Septembre 2026',
    excerpt: 'Les cours d’arabe pour enfants (7 à 17 ans) ont débuté. Les inscriptions pour cette session 2026-2027 sont complètes.',
    content: 'Nous souhaitons une excellente année studieuse à tous les élèves et professeurs de la Mosquée SALEM. Les inscriptions pour les 7-17 ans sont clôturées pour l’année 2026-2027. Prochainement, des sessions dédiées aux adultes (femmes et hommes) seront lancées. Pour toute question : prof.noursalem.Stsulpice@gmail.com.',
    contactEmail: 'prof.noursalem.Stsulpice@gmail.com',
    badge: 'Enseignement',
    isUrgent: false,
  },
  {
    id: 'news-2',
    title: 'Grand Projet Parking : la collecte CotizUp est ouverte',
    category: 'projet',
    date: '15 Octobre 2026',
    excerpt: 'Objectif 50 000 € pour aménager un parking sécurisé et préserver notre voisinage.',
    content: 'L’Association SALEM a lancé le projet majeur d’aménagement du parking attenant à la mosquée au 340 Rue des Montamats. Ce projet permettra d’accueillir les véhicules en toute sécurité, notamment lors de la grande prière du vendredi (Joumou’a). Chaque euro compte pour notre communauté !',
    contactEmail: 'prof.noursalem.Stsulpice@gmail.com',
    badge: 'Projet Parking',
    isUrgent: true,
  },
  {
    id: 'news-3',
    title: 'Organisation de la Prière du Vendredi (Joumou’a)',
    category: 'vie-spirituelle',
    date: '24 Octobre 2026',
    excerpt: 'Sermon en français puis en arabe · Adhan pour Khotba 13h · Salat Après khotba (13h20/13h30). Consignes de civisme.',
    content: 'Vendredi (Joumou’a) : Sermon en français puis en arabe. L’Adhan pour la Khotba débute à 13h, suivie de la prière (Salat Après khotba à 13h20/13h30). Nous rappelons à l’ensemble des fidèles de veiller scrupuleusement au respect du voisinage, de ne pas bloquer les voies de circulation ni les sorties des riverains.',
    badge: 'Vie spirituelle',
    isUrgent: false,
  },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Cours d’arabe & mémorisation coranique (7 à 17 ans)',
    targetAudience: 'Enfants de 7 à 17 ans',
    schedule: 'Samedis et Dimanches matin',
    contact: 'prof.noursalem.Stsulpice@gmail.com',
    status: 'cloture',
    statusLabel: 'Session 2026-2027 en cours (Inscriptions closes)',
    description: 'Apprentissage de la lecture, de l’écriture arabe et mémorisation dans un cadre bienveillant. Inscriptions closes pour la session en cours.',
    iconName: 'book',
  },
  {
    id: 'act-2',
    title: 'Cours pour adultes (Femmes & Hommes)',
    targetAudience: 'Adultes (groupes séparés femmes / hommes)',
    schedule: 'Lancement prochain (horaires en cours de finalisation)',
    contact: 'prof.noursalem.Stsulpice@gmail.com',
    status: 'a_venir',
    statusLabel: 'Ouverture prochaine',
    description: 'Sessions d’initiation et de perfectionnement à la langue arabe et à la lecture du Coran pour adultes.',
    iconName: 'book',
  },
  {
    id: 'act-3',
    title: 'Prières quotidiennes & Grande Prière du Vendredi (Joumou’a)',
    targetAudience: 'Tous les fidèles (hommes, femmes, enfants)',
    schedule: '5 prières quotidiennes aux horaires Mawaqit + Vendredi (Sermon fr/ar · Khotba 13h · Salat 13h20/13h30)',
    contact: 'Sur place à la Mosquée SALEM',
    status: 'en_cours',
    statusLabel: 'Ouvert tous les jours',
    description: 'La mosquée ouvre ses portes pour chaque prière canonique. La grande prière du vendredi réunit la communauté : sermon en français puis en arabe, Adhan pour Khotba 13h, suivie de la prière après la khotba (13h20/13h30).',
    iconName: 'users',
  },
  {
    id: 'act-4',
    title: 'Cercles de rappel & Conférences spirituelles',
    targetAudience: 'Tous les fidèles',
    schedule: 'Chaque vendredi après la prière du Maghrib',
    contact: 'Sur place à la Mosquée SALEM',
    status: 'en_cours',
    statusLabel: 'Tous les vendredis après Maghrib',
    description: 'Rappels spirituels, méditation et enseignements fraternels après la prière du Maghrib.',
    iconName: 'heart',
  },
];

export const INITIAL_PROJECT: ProjectCampaign = {
  title: 'Grand Projet : Financement du Parking de la Mosquée SALEM',
  subtitle: 'Aménagement d’un stationnement sécurisé pour les familles et respect de notre voisinage.',
  targetAmount: 50000,
  currentAmount: 1442,
  donorsCount: 30,
  cotizupUrl: 'https://www.cotizup.com/@association-salem-1/grand-projet-financement-du-parking-de-la-mosquee-salem',
  cotizupGeneralUrl: 'https://www.cotizup.com/@association-salem-1/grand-projet-financement-du-parking-de-la-mosquee-salem',
  phases: [
    {
      number: '01',
      title: 'Acquisition & démarches d’urbanisme',
      description: 'Validation du projet d’aménagement et études techniques préalables.',
      status: 'termine',
    },
    {
      number: '02',
      title: 'Terrassement & gestion des eaux pluviales',
      description: 'Nivellement et préparation du sol pour supporter les véhicules.',
      status: 'en_cours',
    },
    {
      number: '03',
      title: 'Revêtement enrobé & marquage au sol',
      description: 'Pose du revêtement durable, marquage au sol dont emplacements PMR.',
      status: 'a_venir',
    },
    {
      number: '04',
      title: 'Éclairage & sécurisation des accès',
      description: 'Sécurisation piétonne, éclairage et finitions des abords.',
      status: 'a_venir',
    },
  ],
};

export const INITIAL_SITE_CONFIG: SiteConfig = {
  alertBannerEnabled: true,
  alertBannerText: '📢 Rentrée 2026-2027 : cours d’arabe débutés début septembre (7-17 ans complets). Soutenez le projet du parking !',
  alertBannerLinkText: 'Voir le projet parking',
  alertBannerLinkHref: '#projet-parking',
};
