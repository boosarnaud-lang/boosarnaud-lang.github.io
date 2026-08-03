export const personal = {
  name: 'Arnaud Boos',
  location: 'Schwindratzheim, France',
  email: 'boosarnaud@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arnaud-boos-28a3a67b/',
  github: 'https://github.com/boosarnaud-lang',
  birthYear: 1992,
  birthMonth: 1,
  careerStart: new Date(2012, 6), // July 2012
  company: 'Catdata',
  companyGroup: 'TecAlliance',
  companyGroupSince: 2023,
};

export function getExperience(lang = 'en') {
  const translations = {
    en: [
      {
        title: 'Full Stack Engineer & Data Manager',
        company: 'Catdata (TecAlliance group)',
        period: 'Jul 2012–Present',
        startDate: new Date(2012, 6),
        current: true,
        highlight: true,
        details: [
          'Full Stack Development (TypeScript, Go, PHP, React, Node.js)',
          'Automotive Data: VIN/Plate identification, OEM & IAM catalogs, TecAlliance ecosystem',
          'Data pipeline architecture, ETL processes, and quality assurance',
          'Project Management & Technical Consulting',
          'Reverse Engineering of proprietary data formats and protocols',
          'AI Agents development (Kiro, LLM tooling)',
        ],
        achievements: [
          'Built vehicle identification systems decoding VINs and plate numbers across multiple countries',
          'Designed and maintained ETL pipelines processing OEM & aftermarket catalog data at scale',
          'Integrated TecAlliance ecosystem (TecDoc, TecRMI) as core data standardization layer',
          'Developed internal tooling with AI agents to accelerate data workflows',
        ],
        skills: ['Full Stack Dev', 'Automotive Data', 'VIN/Plate', 'OEM & IAM', 'TecAlliance', 'Project Management', 'Reverse Engineering', 'AI Agents'],
      },
      {
        title: 'Director',
        company: 'Catdata',
        period: 'Jun 2017–Apr 2022',
        startDate: new Date(2017, 5),
        endDate: new Date(2022, 3),
        current: false,
        highlight: false,
        details: ['Company operations, strategy, and client relationships'],
        achievements: [
          'Led company strategy and client acquisition while maintaining hands-on technical involvement',
          'Managed delivery of automotive data solutions for B2B clients',
        ],
        skills: ['Leadership', 'Strategy', 'Client Relations', 'Delivery'],
      },
      {
        title: 'IT Technician — Intern',
        company: 'Catdata',
        period: 'Apr–Jun 2012',
        startDate: new Date(2012, 3),
        endDate: new Date(2012, 5),
        current: false,
        highlight: false,
        details: ['Requirements documentation and web programming'],
        achievements: [],
        skills: [],
      },
    ],
    fr: [
      {
        title: 'Ingénieur Full Stack & Responsable Données',
        company: 'Catdata (groupe TecAlliance)',
        period: 'Juil. 2012–Aujourd\'hui',
        startDate: new Date(2012, 6),
        current: true,
        highlight: true,
        details: [
          'Développement Full Stack (TypeScript, Go, PHP, React, Node.js)',
          'Données Automobiles : identification VIN/Plaque, catalogues OEM & IAM, écosystème TecAlliance',
          'Architecture de pipelines de données, processus ETL et assurance qualité',
          'Gestion de projet & Conseil technique',
          'Rétro-ingénierie de formats et protocoles propriétaires',
          'Développement d\'agents IA (Kiro, outillage LLM)',
        ],
        achievements: [
          'Conception de systèmes d\'identification véhicule décodant VIN et plaques dans plusieurs pays',
          'Conception et maintenance de pipelines ETL traitant les données catalogues OEM & après-vente à grande échelle',
          'Intégration de l\'écosystème TecAlliance (TecDoc, TecRMI) comme couche de standardisation',
          'Développement d\'outillage interne avec agents IA pour accélérer les workflows',
        ],
        skills: ['Dév Full Stack', 'Données Auto', 'VIN/Plaque', 'OEM & IAM', 'TecAlliance', 'Gestion de projet', 'Rétro-ingénierie', 'Agents IA'],
      },
      {
        title: 'Directeur',
        company: 'Catdata',
        period: 'Juin 2017–Avr. 2022',
        startDate: new Date(2017, 5),
        endDate: new Date(2022, 3),
        current: false,
        highlight: false,
        details: ['Opérations, stratégie et relations clients'],
        achievements: [
          'Pilotage de la stratégie et acquisition clients tout en restant impliqué techniquement',
          'Gestion de la livraison de solutions data automobiles pour clients B2B',
        ],
        skills: ['Leadership', 'Stratégie', 'Relations clients', 'Livraison'],
      },
      {
        title: 'Technicien informatique — Stagiaire',
        company: 'Catdata',
        period: 'Avr.–Juin 2012',
        startDate: new Date(2012, 3),
        endDate: new Date(2012, 5),
        current: false,
        highlight: false,
        details: ['Rédaction de cahiers des charges et programmation web'],
        achievements: [],
        skills: [],
      },
    ],
  };
  return translations[lang] || translations.en;
}

export function getSkills(lang = 'en') {
  const translations = {
    en: {
      spoken_languages: {
        query: 'SELECT language, level, details FROM spoken_languages ORDER BY level DESC;',
        columns: ['language', 'level', 'details'],
        rows: [
          ['French', 'native', 'mother tongue'],
          ['English', 'fluent', 'professional working'],
          ['German', 'learning', 'basic conversation'],
        ],
      },
      languages: {
        query: 'SELECT name, level, years_exp FROM languages ORDER BY years_exp DESC;',
        columns: ['name', 'level', 'years_exp'],
        rows: [
          ['PHP', 'expert', '14'],
          ['SQL', 'expert', '14'],
          ['TypeScript', 'advanced', '2'],
          ['Go', 'newbie', '1'],
          ['Python', 'advanced', '2'],
        ],
      },
      frameworks_tools: {
        query: 'SELECT name, category, daily_use FROM frameworks_tools ORDER BY category;',
        columns: ['name', 'category', 'daily_use'],
        rows: [
          ['REST APIs', 'architecture', 'true'],
          ['Docker', 'devops', 'true'],
          ['React', 'framework', 'true'],
          ['Node.js', 'runtime', 'true'],
          ['Git', 'vcs', 'true'],
          ['Symfony', 'framework', 'false'],
          ['DBeaver', 'tool', 'true'],
        ],
      },
      domain_expertise: {
        query: 'SELECT domain, specialization, depth FROM domain_expertise;',
        columns: ['domain', 'specialization', 'depth'],
        rows: [
          ['Automotive Data', 'vehicle ecosystems', 'expert'],
          ['VIN/Plate ID', 'decoding & resolution', 'expert'],
          ['TecAlliance', 'TecDoc, TecRMI', 'expert'],
          ['OEM & IAM Catalogs', 'cross-referencing', 'expert'],
        ],
      },
      other_skills: {
        query: 'SELECT skill, tools, experience FROM other_skills ORDER BY experience DESC;',
        columns: ['skill', 'tools', 'experience'],
        rows: [
          ['AI Agents', 'Kiro, Claude', 'active'],
          ['Data Management', 'ETL, pipelines', '14 years'],
          ['Reverse Engineering', 'protocols, formats', '10 years'],
          ['Project Management', 'consulting', '8 years'],
        ],
      },
    },
    fr: {
      spoken_languages: {
        query: 'SELECT langue, niveau, details FROM langues_parlees ORDER BY niveau DESC;',
        columns: ['langue', 'niveau', 'détails'],
        rows: [
          ['Français', 'natif', 'langue maternelle'],
          ['Anglais', 'courant', 'professionnel'],
          ['Allemand', 'en apprentissage', 'conversation basique'],
        ],
      },
      languages: {
        query: 'SELECT nom, niveau, annees_exp FROM langages ORDER BY annees_exp DESC;',
        columns: ['nom', 'niveau', 'années_exp'],
        rows: [
          ['PHP', 'expert', '14'],
          ['SQL', 'expert', '14'],
          ['TypeScript', 'avancé', '2'],
          ['Go', 'newbie', '1'],
          ['Python', 'avancé', '2'],
        ],
      },
      frameworks_tools: {
        query: 'SELECT nom, categorie, usage_quotidien FROM frameworks_outils ORDER BY categorie;',
        columns: ['nom', 'catégorie', 'usage_quotidien'],
        rows: [
          ['APIs REST', 'architecture', 'oui'],
          ['Docker', 'devops', 'oui'],
          ['React', 'framework', 'oui'],
          ['Node.js', 'runtime', 'oui'],
          ['Git', 'vcs', 'oui'],
          ['Symfony', 'framework', 'non'],
          ['DBeaver', 'tool', 'oui'],
        ],
      },
      domain_expertise: {
        query: 'SELECT domaine, specialisation, profondeur FROM expertise_metier;',
        columns: ['domaine', 'spécialisation', 'profondeur'],
        rows: [
          ['Données Automobiles', 'écosystèmes véhicules', 'expert'],
          ['ID VIN/Plaque', 'décodage & résolution', 'expert'],
          ['TecAlliance', 'TecDoc, TecRMI', 'expert'],
          ['Catalogues OEM & IAM', 'référencement croisé', 'expert'],
        ],
      },
      other_skills: {
        query: 'SELECT competence, outils, experience FROM autres_competences ORDER BY experience DESC;',
        columns: ['compétence', 'outils', 'expérience'],
        rows: [
          ['Agents IA', 'Kiro, Claude', 'actif'],
          ['Gestion de Données', 'ETL, pipelines', '14 ans'],
          ['Rétro-ingénierie', 'protocoles, formats', '10 ans'],
          ['Gestion de Projet', 'consulting', '8 ans'],
        ],
      },
    },
  };
  return translations[lang] || translations.en;
}

export function getDomainExpertise(lang = 'en') {
  const translations = {
    en: [
      { title: 'Vehicle Identification', desc: 'VIN decoding, plate resolution, WMI/VDS/VIS' },
      { title: 'OEM & IAM Catalogs', desc: 'Parts cross-referencing, data mapping' },
      { title: 'TecAlliance Ecosystem', desc: 'TecDoc, TecRMI, data standardization' },
      { title: 'Data Management', desc: 'ETL pipelines, reverse engineering, QA' },
    ],
    fr: [
      { title: 'Identification Véhicule', desc: 'Décodage VIN, résolution plaque, WMI/VDS/VIS' },
      { title: 'Catalogues OEM & IAM', desc: 'Référencement croisé, cartographie de données' },
      { title: 'Écosystème TecAlliance', desc: 'TecDoc, TecRMI, standardisation des données' },
      { title: 'Gestion de Données', desc: 'Pipelines ETL, rétro-ingénierie, QA' },
    ],
  };
  return translations[lang] || translations.en;
}

export function getProjects(lang = 'en') {
  const translations = {
    en: [
      {
        name: 'Krate',
        description: 'Personal project manager with Kanban boards, task tracking, and git integration for developer workflows.',
        tech: ['React', 'TypeScript', 'Express', 'Docker'],
      },
    ],
    fr: [
      {
        name: 'Krate',
        description: 'Gestionnaire de projets personnel avec tableaux Kanban, suivi de tâches et intégration git pour les workflows développeur.',
        tech: ['React', 'TypeScript', 'Express', 'Docker'],
      },
    ],
  };
  return translations[lang] || translations.en;
}

export function getEducation(lang = 'en') {
  // Education content is the same in both languages (French degrees)
  return [
    { degree: 'DUT Informatique (Computer Science)', school: 'IUT Robert Schuman', period: '2010 — 2012' },
    { degree: 'Baccalauréat Scientifique', school: 'Lycée Leclerc', period: '2007 — 2010' },
  ];
}

// Legacy exports for backward compatibility
export const experience = getExperience('en');
export const skills = getSkills('en');
export const domainExpertise = getDomainExpertise('en');
export const projects = getProjects('en');
export const education = getEducation('en');
