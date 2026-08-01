import { jsPDF } from 'jspdf';

// Dark green modern theme colors
const COLORS = {
  bg: [18, 35, 28],          // #12231c
  headerBg: [12, 25, 20],    // #0c1914
  accent: [34, 197, 94],     // #22c55e
  text: [230, 240, 235],     // #e6f0eb
  textDim: [150, 180, 165],  // #96b4a5
  divider: [40, 70, 55],     // #284637
};

function getYearsExp() {
  const start = new Date(2012, 6);
  const diff = Date.now() - start.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

export function generateCV() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const H = 297;
  const margin = 15;
  const contentW = W - margin * 2;
  let y = 0;

  // Background
  doc.setFillColor(...COLORS.bg);
  doc.rect(0, 0, W, H, 'F');

  // Header bar
  doc.setFillColor(...COLORS.headerBg);
  doc.rect(0, 0, W, 45, 'F');

  // Name
  y = 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.text);
  doc.text('Arnaud Boos', margin, y);

  // Subtitle
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.accent);
  doc.text('Full Stack Engineer & Data Manager', margin, y);

  // Meta
  y += 7;
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.textDim);
  doc.text(`${getYearsExp()}+ years at Catdata · Schiltigheim, France · boosarnaud@gmail.com · linkedin.com/in/arnaud-boos-28a3a67b`, margin, y);

  // Accent bar under header
  y = 45;
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, y, W, 1, 'F');

  // Section helper
  function sectionTitle(title) {
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.accent);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(...COLORS.divider);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + contentW, y);
    y += 5;
  }

  function jobEntry(title, company, period, details) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.text);
    doc.text(`${title}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.accent);
    doc.text(` — ${company}`, margin + doc.getTextWidth(`${title} `), y);
    y += 4.5;
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.textDim);
    doc.text(period, margin, y);
    y += 5;
    if (details) {
      doc.setTextColor(...COLORS.text);
      doc.setFontSize(8.5);
      details.forEach((d) => {
        doc.text(`•  ${d}`, margin + 3, y);
        y += 4.2;
      });
    }
    y += 2;
  }

  // === EXPERIENCE ===
  sectionTitle('Experience');

  jobEntry('Full Stack Engineer & Data Manager', 'Catdata', `July 2012 — Present (${getYearsExp()}+ years)`, [
    'Full Stack Development (TypeScript, Go, PHP, React, Node.js)',
    'Automotive Data: VIN/Plate identification, OEM & IAM catalogs, TecAlliance',
    'Data pipeline architecture, ETL processes, and quality assurance',
    'Project Management & Technical Consulting',
    'Reverse Engineering of proprietary data formats and protocols',
    'AI Agents development (Kiro, Cursor, LLM tooling)',
  ]);

  jobEntry('Director', 'Catdata', 'June 2017 — April 2022 (5 years)', [
    'Company operations, strategy, and client relationships',
  ]);

  jobEntry('IT Technician — Intern', 'Catdata', 'April — June 2012', [
    'Requirements documentation and web programming',
  ]);

  // === SKILLS ===
  sectionTitle('Skills');

  const skillGroups = [
    ['Languages', 'TypeScript · Go · PHP · SQL'],
    ['Frameworks & Tools', 'React · Node.js · Docker · Git · REST APIs'],
    ['Domain', 'Automotive Data · VIN/Plate · TecAlliance · OEM/IAM Catalogs'],
    ['Other', 'AI Agents · Data Management · Reverse Engineering · Project Management'],
  ];

  const colW = contentW / 2;
  const startY = y;

  skillGroups.forEach((group, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = margin + col * colW;
    const yPos = startY + row * 14;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.accent);
    doc.text(group[0], xPos, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.text);
    doc.text(group[1], xPos, yPos + 4.5);
  });

  y = startY + 28;

  // === DOMAIN EXPERTISE ===
  sectionTitle('Domain Expertise — Automotive Data');

  const domains = [
    ['Vehicle Identification', 'VIN decoding, plate resolution, WMI/VDS/VIS'],
    ['OEM & IAM Catalogs', 'Parts cross-referencing, data mapping'],
    ['TecAlliance Ecosystem', 'TecDoc, TecCom, data standardization'],
    ['Data Management', 'ETL pipelines, reverse engineering, QA'],
  ];

  const domStartY = y;
  domains.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = margin + col * colW;
    const yPos = domStartY + row * 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.text);
    doc.text(d[0], xPos, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.textDim);
    doc.text(d[1], xPos, yPos + 4.2);
  });

  y = domStartY + 24;

  // === PROJECTS ===
  sectionTitle('Projects');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.text);
  doc.text('Krate', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.textDim);
  doc.text(' — Personal Project Manager', margin + doc.getTextWidth('Krate '), y);
  y += 4.5;
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.text);
  doc.text('•  Kanban boards, task tracking, git integration (React, TypeScript, Express, Docker)', margin + 3, y);
  y += 6;

  // === EDUCATION ===
  sectionTitle('Education');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text);
  doc.text('DUT Informatique (Computer Science)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textDim);
  doc.text('IUT Robert Schuman · 2010 — 2012', margin, y + 4.2);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text);
  doc.text('Baccalauréat Scientifique', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textDim);
  doc.text('Lycée Leclerc · 2007 — 2010', margin, y + 4.2);

  // Footer accent line
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, H - 3, W, 3, 'F');

  // Save
  doc.save('Arnaud_Boos_CV.pdf');
}
