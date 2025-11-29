
import { ProgramType } from '../types';

export interface StepData {
  title: string;
  duration: number; // minutes
  type: 'RITUAL' | 'MI' | 'TCC' | 'ADMIN' | 'EDU';
  content: string; // HTML/Markdown-like
  tools?: string[]; // IDs of tools to show button for
}

export interface SessionData {
  id: number;
  title: string;
  focus: string;
  steps: StepData[];
  homework: string;
  acupressure: {
    points: string[]; // e.g. ['LI4', 'P6']
    intention: string;
    warning?: string;
  };
}

export const PROTOCOL_DATA: Record<ProgramType, SessionData[]> = {
  [ProgramType.TABAC]: [
    {
      id: 1,
      title: "Cartographie & Objectif",
      focus: "Alliance, Bilan, Analyse fonctionnelle",
      acupressure: { points: ['Yintang', 'P6'], intention: "Apaisement, tolérance craving" },
      homework: "Journal '3 cigarettes' : contexte, émotion, craving (0-10).",
      steps: [
        { title: "Accueil & Météo", duration: 10, type: 'MI', content: "Alliance, vérifier l'état émotionnel actuel. Clarifier les attentes du patient." },
        { title: "Cohérence Cardiaque", duration: 5, type: 'RITUAL', content: "Guide respiration 5s/5s. Instaurer le calme avant le travail cognitif." },
        { title: "Bilan Tabac", duration: 20, type: 'MI', content: "Explorer l'histoire de la consommation. Identifier la dépendance physique vs psychologique." },
        { title: "Analyse Fonctionnelle", duration: 15, type: 'TCC', content: "Choisir une cigarette récente. Identifier : Déclencheur -> Pensée -> Émotion -> Comportement -> Conséquence." },
        { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Enseigner Yintang (entre sourcils) et P6 (poignet). Pratique guidée." },
        { title: "Synthèse & Devoirs", duration: 5, type: 'ADMIN', content: "Récapituler. Assigner le journal de consommation." }
      ]
    },
    {
      id: 2,
      title: "Ambivalence & Motivation",
      focus: "Balance décisionnelle, Valeurs",
      acupressure: { points: ['H7', 'Yintang'], intention: "Réduction anxiété" },
      homework: "Liste de 10 raisons personnelles et 10 bénéfices attendus.",
      steps: [
        { title: "Accueil", duration: 10, type: 'MI', content: "Retour sur la semaine. Météo émotionnelle." },
        { title: "Cohérence Cardiaque", duration: 5, type: 'RITUAL', content: "Pratique guidée 5 min." },
        { title: "Balance Décisionnelle", duration: 20, type: 'MI', content: "Explorer les avantages et inconvénients du tabac, puis du changement. Faire émerger le discours-changement." },
        { title: "Valeurs & Projet", duration: 15, type: 'MI', content: "Qu'est-ce qui est important pour vous ? Comment le tabac entre en conflit avec ces valeurs ?" },
        { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Points H7 (Shenmen) + Yintang." },
        { title: "Plan d'action", duration: 5, type: 'ADMIN', content: "Définir un petit objectif pour la semaine prochaine." }
      ]
    },
    {
      id: 3,
      title: "Stratégie & Coping",
      focus: "Fixer stratégie, préparer situations à risque",
      acupressure: { points: ['LI4', 'P6'], intention: "Tension, agitation", warning: "Éviter LI4 si grossesse" },
      homework: "Préparer kit anti-craving (eau, gum). Avertir une personne ressource.",
      steps: [
        { title: "Accueil", duration: 10, type: 'MI', content: "Revue des devoirs. Niveau de motivation (0-10)." },
        { title: "Cohérence Cardiaque", duration: 5, type: 'RITUAL', content: "Ancrage." },
        { title: "Choix Stratégie", duration: 20, type: 'TCC', content: "Arrêt franc (date) ou Réduction structurée ? Poser le cadre." },
        { title: "Situations à risque", duration: 15, type: 'TCC', content: "Identifier les 3 top triggers (ex: café, pause). Trouver une réponse alternative pour chacun." },
        { title: "Acupressure", duration: 5, type: 'RITUAL', content: "LI4 (Hegu) pour l'envie forte." },
        { title: "Synthèse", duration: 5, type: 'ADMIN', content: "Valider le plan pour la semaine." }
      ]
    },
    {
      id: 4,
      title: "Entourage & Pression",
      focus: "Soutien social, limites, scripts",
      acupressure: { points: ['H7', 'Yintang'], intention: "Apaisement social" },
      homework: "Conversation avec proche, demander soutien spécifique.",
      steps: [
        { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
        { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
        { title: "Cartographie", duration: 15, type: 'TCC', content: "Identifier alliés et saboteurs." },
        { title: "Communication", duration: 20, type: 'TCC', content: "Jeux de rôle : dire non, expliquer le besoin." },
        { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
        { title: "Plan", duration: 5, type: 'ADMIN', content: "Devoirs." }
      ]
    },
    {
        id: 5,
        title: "Jour J & Pics",
        focus: "Traverser les premiers jours, Urge Surfing",
        acupressure: { points: ['P6', 'LI4'], intention: "Agitation" },
        homework: "3 pratiques d'Urge Surfing. Noter l'intensité.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Célébrer l'arrêt ou l'effort." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Calme." },
            { title: "Analyse Pics", duration: 20, type: 'TCC', content: "Quand ? Combien de temps ? (Rappel: un pic dure < 10min)." },
            { title: "Urge Surfing", duration: 15, type: 'TCC', content: "Technique : observer la vague sans lutter, attendre qu'elle passe." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6 + LI4." },
            { title: "Plan 48h", duration: 5, type: 'ADMIN', content: "Survie immédiate." }
        ]
    },
    {
        id: 6,
        title: "Pensées Automatiques",
        focus: "Cognition, Distorsions",
        acupressure: { points: ['Yintang', 'H7'], intention: "Clarté mentale" },
        homework: "Fiche pensée automatique : Situation -> Pensée -> Alternative.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Revue de la semaine." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Identification", duration: 20, type: 'TCC', content: "Repérer les 'Je mérite', 'Juste une'." },
            { title: "Restructuration", duration: 15, type: 'TCC', content: "Trouver des preuves contraires et des pensées alternatives." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Fiches." }
        ]
    },
    {
        id: 7,
        title: "Habitudes & Routines",
        focus: "Boucles d'habitude, Récompense",
        acupressure: { points: ['P6', 'Yintang'], intention: "Stabilité" },
        homework: "2 routines de remplacement (ex: thé après repas).",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Boucle Habitude", duration: 20, type: 'TCC', content: "Indice -> Routine -> Récompense. Comment changer la routine ?" },
            { title: "Design", duration: 15, type: 'TCC', content: "Créer de nouvelles associations positives." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Mise en place." }
        ]
    },
    {
        id: 8,
        title: "Stress & Émotions",
        focus: "Régulation émotionnelle sans produit",
        acupressure: { points: ['H7', 'P6'], intention: "Anxiété" },
        homework: "Cohérence cardiaque 3x/jour + SOS.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Météo émotionnelle." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Émotion/Besoin", duration: 20, type: 'TCC', content: "Lier l'émotion au besoin sous-jacent (ex: Colère -> Besoin de limite)." },
            { title: "Boîte à outils", duration: 15, type: 'TCC', content: "Stratégies saines de gestion du stress." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7 + P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Pratique quotidienne." }
        ]
    },
    {
        id: 9,
        title: "Exposition (Imagination)",
        focus: "Entraînement aux situations à risque",
        acupressure: { points: ['LI4', 'Yintang'], intention: "Force et Calme" },
        homework: "2 expositions réelles planifiées.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Hiérarchie", duration: 20, type: 'TCC', content: "Classer les situations de 0 à 100." },
            { title: "Exposition", duration: 15, type: 'TCC', content: "Visualisation guidée d'une situation moyenne." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "LI4." },
            { title: "Synthèse", duration: 5, type: 'ADMIN', content: "Debrief." }
        ]
    },
    {
        id: 10,
        title: "Prévention 'Juste une'",
        focus: "Effet d'Abstinence Violée (AVE)",
        acupressure: { points: ['P6', 'H7'], intention: "Compassion" },
        homework: "Script post-incident en 5 étapes.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "AVE", duration: 20, type: 'EDU', content: "Expliquer l'effet de violation d'abstinence (culpabilité -> rechute)." },
            { title: "Protocole", duration: 15, type: 'TCC', content: "Que faire si je craque ? (Quitter le lieu, appeler, ne pas juger)." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Fiche d'urgence." }
        ]
    },
    {
        id: 11,
        title: "Identité & Ressources",
        focus: "Identité de non-fumeur, Récompenses",
        acupressure: { points: ['Yintang', 'H7'], intention: "Confiance" },
        homework: "Plan '30 jours', activités gratifiantes.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Valeurs", duration: 20, type: 'MI', content: "Qui je deviens sans le produit ?" },
            { title: "Maintien", duration: 15, type: 'TCC', content: "Renforcer les nouvelles habitudes." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Projection." }
        ]
    },
    {
        id: 12,
        title: "Bilan & Avenir",
        focus: "Prévention rechute 3 mois",
        acupressure: { points: ['P6', 'Yintang'], intention: "Sérénité" },
        homework: "Maintien journal hebdo, relecture plan d'urgence.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Bilan global." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Indicateurs", duration: 20, type: 'MI', content: "Revue des progrès (graphiques)." },
            { title: "Futur", duration: 15, type: 'TCC', content: "Plan de prévention à long terme." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6 + Yintang." },
            { title: "Clôture", duration: 5, type: 'ADMIN', content: "Félicitations." }
        ]
    }
  ],
  [ProgramType.ALCOOL]: [
    {
        id: 1,
        title: "Bilan & Projet",
        focus: "Alliance, Bilan conso, Sécurité",
        acupressure: { points: ['Yintang', 'P6'], intention: "Apaisement" },
        homework: "Journal 7 jours (unités, contexte, émotion).",
        steps: [
            { title: "Accueil & Sécurité", duration: 10, type: 'ADMIN', content: "Vérifier signes de sevrage physique. Orienter si besoin." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Bilan complet", duration: 20, type: 'MI', content: "Quantités, fréquences, conséquences (social, pro, santé)." },
            { title: "Projet de Vie", duration: 15, type: 'MI', content: "Si l'alcool n'était plus un problème, que feriez-vous ?" },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Expliquer le journal." }
        ]
    },
    {
        id: 2,
        title: "Fonctions & Coûts",
        focus: "Cycle renforcement, coûts/bénéfices",
        acupressure: { points: ['H7', 'Yintang'], intention: "Calme" },
        homework: "Repérer 3 déclencheurs principaux et alternatives.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Revue journal." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Fonctions", duration: 20, type: 'TCC', content: "À quoi sert l'alcool ? (Stress, Social, Sommeil)." },
            { title: "Coûts", duration: 15, type: 'MI', content: "Impacts court terme vs long terme." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Alternatives." }
        ]
    },
    {
        id: 3,
        title: "Engagement",
        focus: "Balance décisionnelle, Auto-efficacité",
        acupressure: { points: ['P6', 'LI4'], intention: "Détermination" },
        homework: "Lettre à soi-même (vision à 3 mois).",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Balance", duration: 20, type: 'MI', content: "Approfondir l'ambivalence. Faire pencher la balance." },
            { title: "Engagement", duration: 15, type: 'MI', content: "Formuler la décision de changement." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6 + LI4." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Lettre." }
        ]
    },
    {
        id: 4,
        title: "Entourage & Environnement",
        focus: "Pression sociale, Soutien",
        acupressure: { points: ['Yintang', 'H7'], intention: "Confiance sociale" },
        homework: "2 réponses de refus, 1 activité sans alcool.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Cartographie", duration: 15, type: 'TCC', content: "Identifier les situations sociales à risque." },
            { title: "Scripts", duration: 20, type: 'TCC', content: "S'entraîner à dire non (Assertivité)." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Mise en pratique." }
        ]
    },
    {
        id: 5,
        title: "Action & Cadre",
        focus: "Règles (Abstinence/Contrôle)",
        acupressure: { points: ['P6', 'H7'], intention: "Ancrage" },
        homework: "Plan 72h (lieux, personnes, boissons).",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Règles", duration: 20, type: 'TCC', content: "Définir le cadre strict (Abstinence ou Réduction contrôlée)." },
            { title: "Stratégies", duration: 15, type: 'TCC', content: "Boissons alternatives, changements de routine." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Plan 72h." }
        ]
    },
    {
        id: 6,
        title: "Craving & Inconfort",
        focus: "Urge Surfing, Distraction",
        acupressure: { points: ['Yintang', 'P6'], intention: "Tolérance" },
        homework: "3 pratiques Urge Surfing.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Cartographie Craving", duration: 20, type: 'TCC', content: "Quand survient l'envie ? (Heure, Lieu)." },
            { title: "Urge Surfing", duration: 15, type: 'TCC', content: "Surfer sur la vague." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Synthèse", duration: 5, type: 'ADMIN', content: "Outils." }
        ]
    },
    {
        id: 7,
        title: "Pensées & Distorsions",
        focus: "Cognition ('Je contrôle')",
        acupressure: { points: ['H7', 'Yintang'], intention: "Lucidité" },
        homework: "Fiche TCC quotidienne.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Pensées", duration: 20, type: 'TCC', content: "Identifier les permissions ('Juste un verre')." },
            { title: "Restructuration", duration: 15, type: 'TCC', content: "Réponse rationnelle." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Observation." }
        ]
    },
    {
        id: 8,
        title: "Stabilisation",
        focus: "Sommeil, Émotions, Routines",
        acupressure: { points: ['P6', 'H7'], intention: "Régulation" },
        homework: "Rituel fin de journée sans alcool.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Routines", duration: 20, type: 'TCC', content: "Reconstruire le soir sans produit." },
            { title: "Hygiène", duration: 15, type: 'EDU', content: "Plan sommeil et gestion émotions." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Rituel." }
        ]
    },
    {
        id: 9,
        title: "Haut Risque",
        focus: "Exposition planifiée",
        acupressure: { points: ['Yintang', 'LI4'], intention: "Contrôle" },
        homework: "1 exposition réelle.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Hiérarchie", duration: 20, type: 'TCC', content: "Lister situations (Fêtes, Repas)." },
            { title: "Répétition", duration: 15, type: 'TCC', content: "Scénarios et visualisation." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "LI4." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 10,
        title: "Glissement",
        focus: "Effet 'Tout ou Rien'",
        acupressure: { points: ['P6', 'Yintang'], intention: "Déculpabilisation" },
        homework: "Plan post-écart imprimé.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Modèle Rechute", duration: 20, type: 'EDU', content: "Comprendre le mécanisme de l'écart." },
            { title: "Protocole", duration: 15, type: 'TCC', content: "Plan d'urgence en cas de 'Faux pas'." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Fiche." }
        ]
    },
    {
        id: 11,
        title: "Ressources & Réseau",
        focus: "Identité, Maintien",
        acupressure: { points: ['H7', 'Yintang'], intention: "Connexion" },
        homework: "2 activités gratifiantes, 1 demande soutien.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Identité", duration: 20, type: 'MI', content: "Qui suis-je hors de l'alcool ?" },
            { title: "Réseau", duration: 15, type: 'TCC', content: "Planifier le soutien (groupes, amis)." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 12,
        title: "Bilan & Prévention",
        focus: "Plan 3 mois",
        acupressure: { points: ['P6', 'Yintang'], intention: "Futur" },
        homework: "Suivi hebdo, révision plan urgence.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Bilan." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Indicateurs", duration: 20, type: 'MI', content: "Revue." },
            { title: "Plan Urgence", duration: 15, type: 'TCC', content: "Finaliser le document." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Clôture", duration: 5, type: 'ADMIN', content: "Fin." }
        ]
    }
  ],
  [ProgramType.CANNABIS]: [
    {
        id: 1,
        title: "Bilan & Fonctions",
        focus: "Sommeil, Stress, Ennui",
        acupressure: { points: ['Yintang', 'H7'], intention: "Apaisement" },
        homework: "Journal 'soirée type' : déclencheurs et bénéfices.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Alliance." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Fonctions", duration: 20, type: 'MI', content: "À quoi sert le cannabis ? (Dormir, calmer, passer le temps)." },
            { title: "Analyse", duration: 15, type: 'TCC', content: "Décortiquer une prise récente." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang + H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Journal." }
        ]
    },
    {
        id: 2,
        title: "Ambivalence & Projet",
        focus: "Balance, Objectifs SMART",
        acupressure: { points: ['P6', 'Yintang'], intention: "Motivation" },
        homework: "Liste activités 'sans cannabis'.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Balance", duration: 20, type: 'MI', content: "Avantages/Inconvénients." },
            { title: "Projet", duration: 15, type: 'MI', content: "Définir objectifs clairs." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Liste." }
        ]
    },
    {
        id: 3,
        title: "Sommeil",
        focus: "Hygiène sommeil sans produit",
        acupressure: { points: ['H7', 'P6'], intention: "Détente nocturne" },
        homework: "Routine coucher 30 min, cohérence cardiaque.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Psychoéducation", duration: 20, type: 'EDU', content: "Le cannabis et le sommeil (impact paradoxal)." },
            { title: "Routine", duration: 15, type: 'TCC', content: "Préparer le sommeil sans fumer." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Routine." }
        ]
    },
    {
        id: 4,
        title: "Entourage & Isolement",
        focus: "Social, Limites",
        acupressure: { points: ['Yintang', 'H7'], intention: "Ouverture" },
        homework: "Contacter 1 personne ressource, 1 sortie.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Cartographie", duration: 15, type: 'TCC', content: "Identifier l'isolement." },
            { title: "Plan Social", duration: 20, type: 'TCC', content: "Réinvestir le lien social." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 5,
        title: "Action",
        focus: "Arrêt ou Réduction, Coping",
        acupressure: { points: ['P6', 'LI4'], intention: "Décision" },
        homework: "Kit anti-craving, supprimer matériel.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Stratégie", duration: 20, type: 'TCC', content: "Fixer la méthode." },
            { title: "Coping", duration: 15, type: 'TCC', content: "Que faire de mes mains/du temps ?" },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Nettoyage environnement." }
        ]
    },
    {
        id: 6,
        title: "Craving & Urge Surfing",
        focus: "Gestion de l'envie",
        acupressure: { points: ['Yintang', 'P6'], intention: "Calme" },
        homework: "3 pratiques Urge Surfing.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Cartographie", duration: 20, type: 'TCC', content: "Analyser les envies." },
            { title: "Urge Surfing", duration: 15, type: 'TCC', content: "Technique de la vague." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Synthèse", duration: 5, type: 'ADMIN', content: "Pratique." }
        ]
    },
    {
        id: 7,
        title: "Pensées & Anxiété",
        focus: "Auto-apaisement",
        acupressure: { points: ['H7', 'Yintang'], intention: "Sérénité" },
        homework: "Fiche pensée, action alternative.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Pensées", duration: 20, type: 'TCC', content: "Identifier les sources d'anxiété." },
            { title: "Restructuration", duration: 15, type: 'TCC', content: "Calmer le mental." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Fiche." }
        ]
    },
    {
        id: 8,
        title: "Ennui & Activation",
        focus: "Comblement du vide",
        acupressure: { points: ['P6', 'LI4'], intention: "Énergie" },
        homework: "2 activités planifiées.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Analyse Ennui", duration: 20, type: 'TCC', content: "L'ennui comme déclencheur." },
            { title: "Plan Activités", duration: 15, type: 'TCC', content: "Retrouver le plaisir ailleurs." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Agenda." }
        ]
    },
    {
        id: 9,
        title: "Risques & Exposition",
        focus: "Situations sociales",
        acupressure: { points: ['Yintang', 'LI4'], intention: "Force" },
        homework: "1 exposition réelle.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Hiérarchie", duration: 20, type: 'TCC', content: "Situations à risque." },
            { title: "Scénarios", duration: 15, type: 'TCC', content: "Comment réagir ?" },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Test." }
        ]
    },
    {
        id: 10,
        title: "Juste une taf",
        focus: "Prévention rechute",
        acupressure: { points: ['P6', 'H7'], intention: "Bienveillance" },
        homework: "Script post-écart.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Modèle", duration: 20, type: 'EDU', content: "L'effet de violation d'abstinence." },
            { title: "Protocole", duration: 15, type: 'TCC', content: "Réagir sainement." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Fiche." }
        ]
    },
    {
        id: 11,
        title: "Identité & Réseau",
        focus: "Ressources, Valeurs",
        acupressure: { points: ['H7', 'Yintang'], intention: "Ancrage" },
        homework: "Demander soutien précis.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Valeurs", duration: 20, type: 'MI', content: "Qui suis-je ?" },
            { title: "Réseau", duration: 15, type: 'TCC', content: "Consolider les liens." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 12,
        title: "Bilan & Futur",
        focus: "Plan 3 mois",
        acupressure: { points: ['P6', 'Yintang'], intention: "Avenir" },
        homework: "Maintien rituels.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Bilan." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Bilan", duration: 20, type: 'MI', content: "Progrès." },
            { title: "Plan Urgence", duration: 15, type: 'TCC', content: "Mise à jour." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Clôture", duration: 5, type: 'ADMIN', content: "Fin." }
        ]
    }
  ],
  [ProgramType.CRACK]: [
    {
        id: 1,
        title: "Sécurité & Urgence",
        focus: "Analyse épisodes, Plan de crise",
        acupressure: { points: ['P6', 'Yintang'], intention: "Ralentir impulsion" },
        homework: "Créer 'carte urgence' (contacts, lieux sûrs).",
        steps: [
            { title: "Accueil & Sécurité", duration: 10, type: 'ADMIN', content: "Évaluation risques immédiats." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Cartographie", duration: 20, type: 'TCC', content: "Analyse en chaîne du dernier épisode." },
            { title: "Plan d'Urgence", duration: 15, type: 'TCC', content: "Identifier 1 lieu sûr et 1 personne à appeler." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6 + Yintang." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Carte urgence." }
        ]
    },
    {
        id: 2,
        title: "Ambivalence",
        focus: "Valeurs, Pertes et Gains",
        acupressure: { points: ['H7', 'Yintang'], intention: "Calme" },
        homework: "3 raisons personnelles, 3 objectifs 7 jours.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Balance", duration: 20, type: 'MI', content: "Pertes et Gains." },
            { title: "Valeurs", duration: 15, type: 'MI', content: "Identité." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Objectifs." }
        ]
    },
    {
        id: 3,
        title: "Rupture Chaîne",
        focus: "Déclencheurs, Environnement",
        acupressure: { points: ['LI4', 'P6'], intention: "Coupure" },
        homework: "2 mesures d'évitement (lieux, numéros).",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Repérage", duration: 20, type: 'TCC', content: "Lieux, personnes, argent." },
            { title: "Rupture", duration: 15, type: 'TCC', content: "Bloquer l'accès." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "LI4." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 4,
        title: "Entourage & Sécurité",
        focus: "Alliés, Contrat",
        acupressure: { points: ['Yintang', 'H7'], intention: "Confiance" },
        homework: "Demander soutien précis, contrat oral.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Alliés", duration: 15, type: 'TCC', content: "Qui peut aider ?" },
            { title: "Contrat", duration: 20, type: 'TCC', content: "Si je t'appelle, voilà ce qu'on fait." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 5,
        title: "Coping Intensif",
        focus: "Fenêtre 10 min",
        acupressure: { points: ['P6', 'Yintang'], intention: "Tempo" },
        homework: "Appliquer fenêtre 10 min, tracer.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Technique", duration: 20, type: 'TCC', content: "Retarder, Déplacer, Décider." },
            { title: "Boîte Outils", duration: 15, type: 'TCC', content: "Douche, marche, glace." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Pratique." }
        ]
    },
    {
        id: 6,
        title: "Urge Surfing",
        focus: "Pics intenses",
        acupressure: { points: ['H7', 'P6'], intention: "Vague" },
        homework: "2 répétitions quotidiennes.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Apprentissage", duration: 20, type: 'TCC', content: "Observer sans agir." },
            { title: "Répétition", duration: 15, type: 'TCC', content: "Guidée." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Entraînement." }
        ]
    },
    {
        id: 7,
        title: "Pensées",
        focus: "Rationalisations, Fatalisme",
        acupressure: { points: ['Yintang', 'H7'], intention: "Clarté" },
        homework: "Fiche TCC, Plan post-écart.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Pensées", duration: 20, type: 'TCC', content: "Identifier 'Foutu pour foutu'." },
            { title: "Alternatives", duration: 15, type: 'TCC', content: "Pensées aidantes." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Fiches." }
        ]
    },
    {
        id: 8,
        title: "Routine & HALT",
        focus: "Vulnérabilité (Faim, Colère, Solitude, Fatigue)",
        acupressure: { points: ['P6', 'LI4'], intention: "Équilibre" },
        homework: "Routine fixe 3 points.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "HALT", duration: 20, type: 'EDU', content: "Hungry, Angry, Lonely, Tired." },
            { title: "Routine", duration: 15, type: 'TCC', content: "Stabiliser lever, repas." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Agenda." }
        ]
    },
    {
        id: 9,
        title: "Argent & Accès",
        focus: "Barrières concrètes",
        acupressure: { points: ['Yintang', 'P6'], intention: "Contrôle" },
        homework: "1 barrière d'accès.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Analyse", duration: 20, type: 'TCC', content: "L'argent comme déclencheur." },
            { title: "Barrières", duration: 15, type: 'TCC', content: "Carte, Plafond, Tiers." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 10,
        title: "Rechute & Intervention",
        focus: "Signaux précoces, 24h",
        acupressure: { points: ['H7', 'Yintang'], intention: "Sécurité" },
        homework: "Plan post-écart partagé.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Signaux", duration: 20, type: 'TCC', content: "Reconnaître l'avant-crise." },
            { title: "Protocole", duration: 15, type: 'TCC', content: "Plan d'action 24h." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Partage." }
        ]
    },
    {
        id: 11,
        title: "Réseau & Continuité",
        focus: "Maintien",
        acupressure: { points: ['P6', 'Yintang'], intention: "Lien" },
        homework: "2 contacts planifiés.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Réseau", duration: 20, type: 'TCC', content: "Cartographie." },
            { title: "Plan", duration: 15, type: 'TCC', content: "Rendez-vous, Groupes." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Appels." }
        ]
    },
    {
        id: 12,
        title: "Bilan & Prévention",
        focus: "Plan 3 mois",
        acupressure: { points: ['Yintang', 'H7'], intention: "Futur" },
        homework: "Revue hebdo, maintien barrières.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Bilan." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Bilan", duration: 20, type: 'MI', content: "Progrès et Indicateurs." },
            { title: "Plan Urgence", duration: 15, type: 'TCC', content: "Renforcé." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Clôture", duration: 5, type: 'ADMIN', content: "Fin." }
        ]
    }
  ],
  [ProgramType.POLY]: [
    {
        id: 1,
        title: "Cartographie & Priorité",
        focus: "Chaînes de consommation, Priorisation",
        acupressure: { points: ['Yintang', 'P6'], intention: "Centrage" },
        homework: "Journal 'chaînes' : produit A -> produit B.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Bilan global." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Cartographie", duration: 20, type: 'TCC', content: "Identifier les liens entre produits. Lequel entraîne l'autre ?" },
            { title: "Priorisation", duration: 15, type: 'MI', content: "Choisir la cible prioritaire (souvent alcool ou crack)." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Observation." }
        ]
    },
    {
        id: 2,
        title: "Ambivalence & Paliers",
        focus: "Engagement progressif",
        acupressure: { points: ['H7', 'Yintang'], intention: "Calme" },
        homework: "3 objectifs hebdo.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Balance", duration: 20, type: 'MI', content: "Par produit." },
            { title: "Engagement", duration: 15, type: 'MI', content: "Palier S2." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Objectifs." }
        ]
    },
    {
        id: 3,
        title: "Sécurité & Plan Multi",
        focus: "Urgence, Risques",
        acupressure: { points: ['P6', 'Yintang'], intention: "Sécurité" },
        homework: "Plan accessible, test simulation.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Signaux", duration: 20, type: 'TCC', content: "Précoces." },
            { title: "Plan", duration: 15, type: 'TCC', content: "Urgence combinée." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Test." }
        ]
    },
    {
        id: 4,
        title: "Entourage",
        focus: "Environnement",
        acupressure: { points: ['Yintang', 'H7'], intention: "Soutien" },
        homework: "Demander soutien, limiter exposition.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Cartographie", duration: 15, type: 'TCC', content: "Sociale." },
            { title: "Scripts", duration: 20, type: 'TCC', content: "Limites." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 5,
        title: "Action Prioritaire",
        focus: "Produit 1 (Alcool/Crack)",
        acupressure: { points: ['P6', 'LI4'], intention: "Action" },
        homework: "2 barrières, 1 alternative.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Stratégie", duration: 20, type: 'TCC', content: "Focus produit prioritaire." },
            { title: "Barrières", duration: 15, type: 'TCC', content: "Accès." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Plan 72h." }
        ]
    },
    {
        id: 6,
        title: "Craving en Cascade",
        focus: "Domino",
        acupressure: { points: ['Yintang', 'P6'], intention: "Interruption" },
        homework: "Stopper chaîne, tracer.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Premier Domino", duration: 20, type: 'TCC', content: "Identifier le déclencheur initial." },
            { title: "Alternatives", duration: 15, type: 'TCC', content: "Réponse immédiate." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "Yintang." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Pratique." }
        ]
    },
    {
        id: 7,
        title: "Pensées & Rationalisations",
        focus: "Cognition multi-produits",
        acupressure: { points: ['H7', 'Yintang'], intention: "Lucidité" },
        homework: "Fiche TCC.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Pensées", duration: 20, type: 'TCC', content: "Rationalisations croisées." },
            { title: "Restructuration", duration: 15, type: 'TCC', content: "Réponses." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Fiche." }
        ]
    },
    {
        id: 8,
        title: "Routines & Substitution",
        focus: "Prévention transfert",
        acupressure: { points: ['P6', 'H7'], intention: "Équilibre" },
        homework: "Routine 3 points.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Vulnérabilité", duration: 20, type: 'TCC', content: "Stress, Sommeil." },
            { title: "Routine", duration: 15, type: 'TCC', content: "Stabilisante." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Agenda." }
        ]
    },
    {
        id: 9,
        title: "Exposition",
        focus: "Risques mixtes",
        acupressure: { points: ['LI4', 'Yintang'], intention: "Force" },
        homework: "1 exposition, compte rendu.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Hiérarchie", duration: 20, type: 'TCC', content: "Situations complexes." },
            { title: "Scénarios", duration: 15, type: 'TCC', content: "Planification." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "LI4." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 10,
        title: "Gestion Écarts",
        focus: "Protocole 24h",
        acupressure: { points: ['P6', 'Yintang'], intention: "Récupération" },
        homework: "Plan post-écart partagé.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Modèle Rechute", duration: 20, type: 'EDU', content: "Mécanismes." },
            { title: "Protocole", duration: 15, type: 'TCC', content: "Multi-produits." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Plan", duration: 5, type: 'ADMIN', content: "Fiche." }
        ]
    },
    {
        id: 11,
        title: "Réseau & Identité",
        focus: "Continuité",
        acupressure: { points: ['H7', 'Yintang'], intention: "Lien" },
        homework: "2 actions réseau, 2 activités.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Check-in." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Ressources", duration: 20, type: 'MI', content: "Identité." },
            { title: "Réseau", duration: 15, type: 'TCC', content: "Plan." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "H7." },
            { title: "Devoirs", duration: 5, type: 'ADMIN', content: "Action." }
        ]
    },
    {
        id: 12,
        title: "Bilan & Prévention",
        focus: "Plan 3 mois",
        acupressure: { points: ['P6', 'Yintang'], intention: "Avenir" },
        homework: "Revue hebdo, maintien.",
        steps: [
            { title: "Accueil", duration: 10, type: 'MI', content: "Bilan." },
            { title: "Cohérence", duration: 5, type: 'RITUAL', content: "Respiration." },
            { title: "Indicateurs", duration: 20, type: 'MI', content: "Progrès." },
            { title: "Plan Final", duration: 15, type: 'TCC', content: "Urgence." },
            { title: "Acupressure", duration: 5, type: 'RITUAL', content: "P6." },
            { title: "Clôture", duration: 5, type: 'ADMIN', content: "Fin." }
        ]
    }
  ]
};
