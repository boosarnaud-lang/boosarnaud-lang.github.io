import { jsPDF } from 'jspdf';
import { personal, experience, skills, domainExpertise, projects, education } from '../data/portfolio.js';

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
  const diff = Date.now() - personal.careerStart.getTime();
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
  doc.text(personal.name, margin, y);

  // Subtitle
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.accent);
  doc.text(personal.title, margin, y);

  // Meta
  y += 7;
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.textDim);
  doc.text(`${getYearsExp()}+ years at ${personal.company} · ${personal.location} · ${personal.email} · ${personal.linkedin.replace('https://www.', '')}`, margin, y);

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

  const exp0 = experience[0];
  jobEntry(exp0.title, `${exp0.company} since ${personal.companyGroupSince}`, `July 2012 — Present (${getYearsExp()}+ years)`, exp0.details);

  const exp1 = experience[1];
  jobEntry(exp1.title, exp1.company, 'June 2017 — April 2022 (5 years)', exp1.details);

  const exp2 = experience[2];
  jobEntry(exp2.title, exp2.company, 'April — June 2012', exp2.details);

  // === SKILLS ===
  sectionTitle('Skills');

  const skillGroups = [
    ['Languages', skills.languages.items.join(' · ')],
    ['Frameworks & Tools', skills.frameworks_tools.items.join(' · ')],
    ['Domain', skills.domain_expertise.items.join(' · ')],
    ['Other', skills.other_skills.items.join(' · ')],
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

  const domains = domainExpertise.map((d) => [d.title, d.desc]);

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

  const proj = projects[0];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.text);
  doc.text(proj.name, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.textDim);
  doc.text(` — ${proj.description.split(' with ')[0].replace('Personal project manager', 'Personal Project Manager')}`, margin + doc.getTextWidth(`${proj.name} `), y);
  y += 4.5;
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.text);
  doc.text(`•  Kanban boards, task tracking, git integration (${proj.tech.join(', ')})`, margin + 3, y);
  y += 6;

  // === EDUCATION ===
  sectionTitle('Education');

  const edu0 = education[0];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text);
  doc.text(edu0.degree, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textDim);
  doc.text(`${edu0.school} · ${edu0.period}`, margin, y + 4.2);
  y += 12;

  const edu1 = education[1];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text);
  doc.text(edu1.degree, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textDim);
  doc.text(`${edu1.school} · ${edu1.period}`, margin, y + 4.2);

  // Footer accent line
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, H - 3, W, 3, 'F');

  // Save
  doc.save(`${personal.name.replace(' ', '_')}_CV.pdf`);
}
