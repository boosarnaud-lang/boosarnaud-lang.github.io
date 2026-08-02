export const personal = {
  name: 'Arnaud Boos',
  title: 'Full Stack Engineer & Data Manager',
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

export const experience = [
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
];

export const skills = {
  languages: { items: ['TypeScript', 'Go', 'PHP', 'SQL'], columns: ['name', 'level', 'years_exp'], rows: [['PHP', 'expert', '14'], ['SQL', 'advanced', '14'], ['TypeScript', 'expert', '8'], ['Go', 'advanced', '4']] },
  frameworks_tools: { items: ['React', 'Node.js', 'Docker', 'Git', 'REST APIs'], columns: ['name', 'category', 'daily_use'], rows: [['React', 'framework', 'true'], ['Node.js', 'runtime', 'true'], ['Docker', 'devops', 'true'], ['Git', 'vcs', 'true'], ['REST APIs', 'architecture', 'true']] },
  domain_expertise: { items: ['Automotive Data', 'VIN/Plate Identification', 'TecAlliance', 'OEM & IAM Catalogs'], columns: ['domain', 'specialization', 'depth'], rows: [['Automotive Data', 'vehicle ecosystems', 'expert'], ['VIN/Plate ID', 'decoding & resolution', 'expert'], ['TecAlliance', 'TecDoc, TecRMI', 'expert'], ['OEM & IAM Catalogs', 'cross-referencing', 'expert']] },
  other_skills: { items: ['AI Agents', 'Data Management', 'Reverse Engineering', 'Project Management'], columns: ['skill', 'tools', 'experience'], rows: [['AI Agents', 'Kiro, Claude', 'active'], ['Data Management', 'ETL, pipelines', '14 years'], ['Reverse Engineering', 'protocols, formats', '10 years'], ['Project Management', 'consulting', '8 years']] },
};

export const domainExpertise = [
  { title: 'Vehicle Identification', desc: 'VIN decoding, plate resolution, WMI/VDS/VIS' },
  { title: 'OEM & IAM Catalogs', desc: 'Parts cross-referencing, data mapping' },
  { title: 'TecAlliance Ecosystem', desc: 'TecDoc, TecRMI, data standardization' },
  { title: 'Data Management', desc: 'ETL pipelines, reverse engineering, QA' },
];

export const projects = [
  {
    name: 'Krate',
    description: 'Personal project manager with Kanban boards, task tracking, and git integration for developer workflows.',
    tech: ['React', 'TypeScript', 'Express', 'Docker'],
  },
];

export const education = [
  { degree: 'DUT Informatique (Computer Science)', school: 'IUT Robert Schuman', period: '2010 — 2012' },
  { degree: 'Baccalauréat Scientifique', school: 'Lycée Leclerc', period: '2007 — 2010' },
];
