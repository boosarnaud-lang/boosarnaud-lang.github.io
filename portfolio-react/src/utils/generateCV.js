import { jsPDF } from 'jspdf';
import { personal, experience, skills, domainExpertise, projects, education } from '../data/portfolio.js';
import profilePhoto from '../assets/profile.jpg';

const TITLE = 'Full Stack Engineer · AI Agent Builder · Data Manager';

// Dark green modern theme colors
const COLORS = {
  sidebarBg: [18, 35, 28],       // dark green sidebar
  mainBg: [255, 255, 255],       // white main area
  accent: [34, 197, 94],         // green accent
  sidebarText: [230, 240, 235],  // light text on sidebar
  sidebarDim: [150, 180, 165],   // dimmed text on sidebar
  mainText: [30, 30, 30],        // dark text on white
  mainDim: [100, 100, 100],      // dimmed text on white
  sidebarDivider: [40, 70, 55],  // divider on sidebar
  mainDivider: [200, 200, 200],  // divider on main
  avatarBg: [34, 197, 94],       // avatar circle
};

function getYearsExp() {
  const diff = Date.now() - personal.careerStart.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

export function generateCV() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const H = 297;
  const SIDEBAR_W = 70;
  const MAIN_X = SIDEBAR_W;
  const MAIN_W = W - SIDEBAR_W;
  const sideMargin = 8;
  const mainMargin = 10;

  // === BACKGROUNDS ===
  // Sidebar
  doc.setFillColor(...COLORS.sidebarBg);
  doc.rect(0, 0, SIDEBAR_W, H, 'F');
  // Main area
  doc.setFillColor(...COLORS.mainBg);
  doc.rect(SIDEBAR_W, 0, MAIN_W, H, 'F');

  // ===========================
  // LEFT SIDEBAR
  // ===========================
  let sideY = 20;

  // Avatar with profile photo (circular appearance)
  const avatarR = 18;
  const avatarCx = SIDEBAR_W / 2;
  const avatarCy = sideY + avatarR;

  // Place the square image
  const imgSize = avatarR * 2;
  doc.addImage(profilePhoto, 'JPEG', avatarCx - avatarR, avatarCy - avatarR, imgSize, imgSize);

  // Draw a thick ring in sidebar color to mask corners into a circle
  doc.setDrawColor(...COLORS.sidebarBg);
  doc.setLineWidth(8);
  doc.rect(avatarCx - avatarR - 4, avatarCy - avatarR - 4, imgSize + 8, imgSize + 8, 'S');

  sideY = avatarCy + avatarR + 12;

  // Sidebar section helper
  function sidebarSection(title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.accent);
    doc.text(title.toUpperCase(), sideMargin, sideY);
    sideY += 2.5;
    doc.setDrawColor(...COLORS.sidebarDivider);
    doc.setLineWidth(0.3);
    doc.line(sideMargin, sideY, SIDEBAR_W - sideMargin, sideY);
    sideY += 5;
  }

  function sidebarItem(label, detail) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.sidebarText);
    doc.text(label, sideMargin, sideY);
    sideY += 3.8;
    if (detail) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...COLORS.sidebarDim);
      const lines = doc.splitTextToSize(detail, SIDEBAR_W - sideMargin * 2);
      doc.text(lines, sideMargin, sideY);
      sideY += lines.length * 3.5;
    }
    sideY += 1.5;
  }

  // --- COMPÉTENCES (Skills) ---
  sidebarSection('Skills');

  // Languages
  skills.languages.rows.forEach((row) => {
    sidebarItem(row[0], row[1]);
  });

  sideY += 3;

  // Frameworks & Tools
  sidebarSection('Tools & Frameworks');

  skills.frameworks_tools.rows.forEach((row) => {
    sidebarItem(row[0], row[1]);
  });

  sideY += 3;

  // --- LANGUES (Languages) ---
  sidebarSection('Languages');

  skills.spoken_languages.rows.forEach((row) => {
    sidebarItem(row[0], row[1]);
  });

  sideY += 3;

  // --- CENTRES D'INTÉRÊT (Domain Expertise) ---
  sidebarSection('Domain Expertise');

  domainExpertise.forEach((d) => {
    sidebarItem(d.title, d.desc);
  });

  // ===========================
  // RIGHT MAIN AREA
  // ===========================
  let mainY = 18;
  const mainTextX = MAIN_X + mainMargin;
  const mainContentW = MAIN_W - mainMargin * 2;

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.mainText);
  doc.text(personal.name.split(' ')[0], mainTextX, mainY);
  mainY += 8;
  doc.text(personal.name.split(' ')[1] || '', mainTextX, mainY);

  // Title
  mainY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.mainDim);
  doc.text(TITLE, mainTextX, mainY);

  // Contact info
  mainY += 8;
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.mainDim);
  doc.text(`✉  ${personal.email}`, mainTextX, mainY);
  mainY += 4;
  doc.text(`⌘  ${personal.linkedin.replace('https://www.', '')}`, mainTextX, mainY);
  mainY += 4;
  doc.text(`☁  ${personal.location}`, mainTextX, mainY);

  mainY += 10;

  // Main section helper
  function mainSection(title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.accent);
    doc.text(title.toUpperCase(), mainTextX, mainY);
    mainY += 2.5;
    doc.setDrawColor(...COLORS.mainDivider);
    doc.setLineWidth(0.3);
    doc.line(mainTextX, mainY, mainTextX + mainContentW, mainY);
    mainY += 6;
  }

  // --- PROFIL ---
  mainSection('Profile');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.mainText);
  const profileText = `Full Stack Engineer with ${getYearsExp()}+ years at ${personal.company} (${personal.companyGroup} group). Specialized in automotive data management, vehicle identification systems, and building data pipelines. Passionate about AI agents and developer tooling.`;
  const profileLines = doc.splitTextToSize(profileText, mainContentW);
  doc.text(profileLines, mainTextX, mainY);
  mainY += profileLines.length * 4 + 4;

  // --- EXPÉRIENCE ---
  mainSection('Experience');

  function mainJobEntry(title, company, period, details) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.mainText);
    doc.text(title, mainTextX, mainY);
    mainY += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.accent);
    doc.text(company, mainTextX, mainY);
    doc.setTextColor(...COLORS.mainDim);
    doc.text(` | ${period}`, mainTextX + doc.getTextWidth(company + ' '), mainY);
    mainY += 5;

    if (details && details.length > 0) {
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.mainText);
      details.forEach((d) => {
        const bulletLines = doc.splitTextToSize(`•  ${d}`, mainContentW - 5);
        doc.text(bulletLines, mainTextX + 3, mainY);
        mainY += bulletLines.length * 3.8;
      });
    }
    mainY += 3;
  }

  const exp0 = experience[0];
  mainJobEntry(
    exp0.title,
    `${exp0.company}`,
    `Jul 2012 — Present (${getYearsExp()}+ years)`,
    exp0.details,
  );

  const exp1 = experience[1];
  mainJobEntry(
    exp1.title,
    exp1.company,
    'Jun 2017 — Apr 2022 (5 years)',
    exp1.details,
  );

  const exp2 = experience[2];
  mainJobEntry(
    exp2.title,
    exp2.company,
    'Apr — Jun 2012',
    exp2.details,
  );

  // --- FORMATION (Education) ---
  mainSection('Education');

  education.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.mainText);
    doc.text(edu.degree, mainTextX, mainY);
    mainY += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.mainDim);
    doc.text(`${edu.school} · ${edu.period}`, mainTextX, mainY);
    mainY += 7;
  });

  // --- PROJECTS ---
  mainSection('Projects');

  projects.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.mainText);
    doc.text(proj.name, mainTextX, mainY);
    mainY += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.mainDim);
    const descLines = doc.splitTextToSize(proj.description, mainContentW);
    doc.text(descLines, mainTextX, mainY);
    mainY += descLines.length * 3.8;
    doc.setTextColor(...COLORS.accent);
    doc.setFontSize(7.5);
    doc.text(proj.tech.join(' · '), mainTextX, mainY);
    mainY += 6;
  });

  // Footer accent bar
  doc.setFillColor(...COLORS.accent);
  doc.rect(SIDEBAR_W, H - 2, MAIN_W, 2, 'F');
  doc.setFillColor(...COLORS.sidebarBg);
  doc.rect(0, H - 2, SIDEBAR_W, 2, 'F');

  // Save
  doc.save(`${personal.name.replace(' ', '_')}_CV.pdf`);
}
