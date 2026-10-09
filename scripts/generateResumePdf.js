import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import { resumeData } from '../frontend/src/data/resume.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target output path in frontend public directory
const OUTPUT_PATH = path.resolve(__dirname, '../frontend/public/resume.pdf');

/**
 * Generate a pristine, professional TWO-PAGE technical resume PDF for Palleti Vamshi.
 * Typography & Layout:
 * - Prominent Name: 24 pt bold
 * - Section Headings: 13 pt bold with clean divider lines and consistent spacing
 * - Project Titles: 11 pt bold with clean right-aligned [GitHub ->] links
 * - Body & Bullets: 10.5 pt regular with comfortable 2.2 line gap
 * - Clear margins and generous whitespace
 * - Project headings and bullets strictly kept together
 * - Exactly TWO pages, text-based and ATS-friendly
 */
function buildResumePdf() {
  console.log('Generating polished two-page technical resume PDF...');

  const topMargin = 36;
  const bottomMargin = 30;
  const leftMargin = 42;
  const rightMargin = 42;
  const pageWidth = 612;
  const pageHeight = 792;
  const contentWidth = pageWidth - leftMargin - rightMargin; // 528 pt

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: topMargin, bottom: bottomMargin, left: leftMargin, right: rightMargin },
    autoFirstPage: true,
    info: {
      Title: `${resumeData.personal.name} — Technical Resume`,
      Author: resumeData.personal.name,
      Subject: 'Software Engineering & AI/ML Undergraduate Resume',
      Keywords: 'Palleti Vamshi, Software Engineer, AI/ML, Python, Java, Data Structures, Spring Boot, MySQL, MongoDB'
    }
  });

  const writeStream = fs.createWriteStream(OUTPUT_PATH);
  doc.pipe(writeStream);

  // Professional, high-contrast typography colors
  const colors = {
    primary: '#0F172A',      // Slate 900
    sectionHead: '#1E3A8A',  // Deep navy / royal blue
    body: '#1E293B',         // Slate 800 for high readability
    secondary: '#334155',    // Slate 700
    meta: '#475569',         // Slate 600
    accentBlue: '#2563EB',   // Royal blue
    divider: '#CBD5E1',      // Slate 300
    subtleBorder: '#E2E8F0'  // Slate 200
  };

  /**
   * Helper to draw clean section header with thin horizontal rule
   */
  function drawSectionHeader(title, customY = null) {
    if (customY !== null) {
      doc.y = customY;
    } else {
      doc.y += 12;
    }

    const currentY = doc.y;
    doc.font('Helvetica-Bold').fontSize(13).fillColor(colors.sectionHead);
    doc.text(title.toUpperCase(), leftMargin, currentY, {
      characterSpacing: 0.6,
      width: contentWidth
    });

    const lineY = doc.y + 3;
    doc.strokeColor(colors.divider)
      .lineWidth(0.75)
      .moveTo(leftMargin, lineY)
      .lineTo(leftMargin + contentWidth, lineY)
      .stroke();

    doc.y = lineY + 6;
  }

  /**
   * Helper to render indented bullet points with comfortable line gap
   */
  function renderBullet(text) {
    const bulletY = doc.y + 1;
    doc.font('Helvetica').fontSize(10.5).fillColor(colors.accentBlue);
    doc.text('•', leftMargin + 6, bulletY, { width: 10 });

    doc.font('Helvetica').fontSize(10.5).fillColor(colors.body);
    doc.text(text, leftMargin + 18, bulletY, {
      width: contentWidth - 18,
      lineGap: 2.2
    });
    doc.y += 2.5;
  }

  /**
   * Helper to render a project block with title, link, tech stack, and bullets
   */
  function renderProject(project) {
    const startY = doc.y;
    const titleWidth = contentWidth - 110;

    // Project Title
    doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.primary);
    doc.text(project.title, leftMargin, startY, { width: titleWidth });
    const titleH = doc.heightOfString(project.title, { width: titleWidth });

    // Clickable GitHub Link on the right
    if (project.githubUrl) {
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor(colors.accentBlue);
      const linkLabel = '[GitHub ->]';
      const linkW = doc.widthOfString(linkLabel);
      const linkX = leftMargin + contentWidth - linkW;
      doc.text(linkLabel, linkX, startY + 1);
      doc.link(linkX, startY + 1, linkW, 12, project.githubUrl);
    }

    // Advance Y cleanly past the title
    doc.y = startY + Math.max(titleH, 14) + 3;

    // Technologies Subtitle
    doc.font('Helvetica-Oblique').fontSize(9.6).fillColor(colors.meta);
    doc.text(`Technologies: ${project.tech}`, leftMargin, doc.y, {
      width: contentWidth,
      lineGap: 1.5
    });
    doc.y += 4;

    // Bullets
    project.bullets.forEach((bullet) => {
      renderBullet(bullet);
    });

    doc.y += 10;
  }

  /**
   * Print footer on current page without triggering auto page-break
   */
  function printFooter(pageText) {
    const oldBottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 10;
    doc.font('Helvetica').fontSize(8.5).fillColor(colors.meta);
    doc.text(pageText, leftMargin, pageHeight - 22, {
      align: 'center',
      width: contentWidth
    });
    doc.page.margins.bottom = oldBottom;
  }

  // =========================================================================
  // =========================================================================
  // PAGE 1: HEADER, SUMMARY, EDUCATION, SKILLS, LIGHTX-IDS, SMART CAMPUS
  // =========================================================================

  // 1. HEADER (NAME & CONTACT)
  doc.font('Helvetica-Bold').fontSize(24).fillColor(colors.primary);
  doc.text(resumeData.personal.name, leftMargin, topMargin, {
    align: 'center',
    width: contentWidth,
    characterSpacing: 0.5
  });

  // Contact line 1: Location, Email
  doc.font('Helvetica').fontSize(10).fillColor(colors.secondary);
  const contactY = doc.y + 4;
  const emailStr = resumeData.personal.email;
  const locStr = resumeData.personal.location;
  const contactLine = `${locStr}   •   ${emailStr}`;
  doc.text(contactLine, leftMargin, contactY, { align: 'center', width: contentWidth });

  // Add clickable email link
  const emailW = doc.widthOfString(emailStr);
  const totalContactW = doc.widthOfString(contactLine);
  const emailStartX = (pageWidth - totalContactW) / 2 + doc.widthOfString(`${locStr}   •   `);
  doc.link(emailStartX, contactY, emailW, 12, `mailto:${emailStr}`);

  // Contact line 2: Clickable Profile Links
  const linksY = doc.y + 3;
  doc.font('Helvetica-Bold').fontSize(9.6).fillColor(colors.accentBlue);

  const links = [
    { text: 'LinkedIn', url: resumeData.personal.links.linkedin.url },
    { text: 'GitHub', url: resumeData.personal.links.github.url },
    { text: 'LeetCode', url: resumeData.personal.links.leetcode.url },
    { text: 'CodeChef', url: resumeData.personal.links.codechef.url },
    { text: 'Codeforces', url: resumeData.personal.links.codeforces.url }
  ];

  const linkParts = links.map(l => l.text).join('   •   ');
  doc.text(linkParts, leftMargin, linksY, { align: 'center', width: contentWidth });

  // Add link annotations
  const totalLinksW = doc.widthOfString(linkParts);
  let curLinkX = (pageWidth - totalLinksW) / 2;
  const dotWidth = doc.widthOfString('   •   ');

  links.forEach(l => {
    const textW = doc.widthOfString(l.text);
    doc.link(curLinkX, linksY, textW, 12, l.url);
    curLinkX += textW + dotWidth;
  });

  doc.y += 2;

  // 2. PROFESSIONAL SUMMARY
  drawSectionHeader('Professional Summary');
  doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
  doc.text(resumeData.summary, leftMargin, doc.y, {
    width: contentWidth,
    align: 'justify',
    lineGap: 2.2
  });

  // 3. EDUCATION
  drawSectionHeader('Education');

  // Primary University
  const eduRow1Y = doc.y;
  const instWidth = contentWidth - 110;
  doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.primary);
  doc.text(resumeData.education.institution, leftMargin, eduRow1Y, { width: instWidth });
  const instH = doc.heightOfString(resumeData.education.institution, { width: instWidth });

  doc.font('Helvetica').fontSize(10).fillColor(colors.meta);
  doc.text('Hyderabad, India', leftMargin + contentWidth - 100, eduRow1Y, { align: 'right', width: 100 });

  doc.y = eduRow1Y + Math.max(instH, 14) + 1.5;

  // Degree, Expected Graduation, CGPA
  doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
  doc.text('B.Tech in Artificial Intelligence & Machine Learning', leftMargin, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(9.8).fillColor(colors.meta);
  doc.text('   •   Expected Graduation: 2029', { continued: true });
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(colors.sectionHead);
  doc.text('   •   Current CGPA: 9.9/10');

  // Intermediate Education
  const eduSecY = doc.y + 4.5;
  doc.font('Helvetica-Bold').fontSize(10.2).fillColor(colors.primary);
  doc.text('Narayana Junior College', leftMargin, eduSecY, { continued: true });
  doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
  doc.text('   —   Intermediate', { continued: true });
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(colors.sectionHead);
  doc.text('   •   987 marks');

  // Secondary School
  const eduSchoolY = doc.y + 3.5;
  doc.font('Helvetica-Bold').fontSize(10.2).fillColor(colors.primary);
  doc.text('Pratibha Model High School', leftMargin, eduSchoolY, { continued: true });
  doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
  doc.text('   —   Secondary School', { continued: true });
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(colors.sectionHead);
  doc.text('   •   score 9.7');

  // 4. TECHNICAL SKILLS
  drawSectionHeader('Technical Skills');
  const skillsList = [
    { label: 'Programming Languages', items: resumeData.skills.programming.join(', ') },
    { label: 'AI & Machine Learning', items: resumeData.skills.aiMl.join(', ') },
    { label: 'Backend Development', items: resumeData.skills.backend.join(', ') },
    { label: 'Databases & Systems', items: resumeData.skills.databases.join(', ') },
    { label: 'Tools & Protocols', items: resumeData.skills.toolsProtocols.join(', ') }
  ];

  skillsList.forEach((s) => {
    const rowY = doc.y + 2.5;
    doc.font('Helvetica-Bold').fontSize(10.2).fillColor(colors.primary);
    doc.text(`${s.label}: `, leftMargin, rowY, { continued: true });
    doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
    doc.text(s.items, { lineGap: 2.0 });
  });

  // 5. FEATURED TECHNICAL PROJECTS (PROJECTS 1 & 2)
  drawSectionHeader('Featured Technical Projects');

  renderProject(resumeData.projects[0]); // LightX-IDS
  renderProject(resumeData.projects[1]); // Smart Campus Management System

  console.log('Page 1 content ends at Y:', doc.y.toFixed(1));
  printFooter('Palleti Vamshi — Technical Resume  •  Page 1 of 2');

  // =========================================================================
  // PAGE 2: RUNNING HEADER, PROJECTS 3 & 4, ACHIEVEMENTS, INVOLVEMENT, PROFILES
  // =========================================================================
  doc.addPage();

  // Running Header on Page 2
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.primary);
  doc.text('PALLETI VAMSHI', leftMargin, topMargin, { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor(colors.meta);
  doc.text('   |   Technical Resume (Page 2 of 2)', { width: contentWidth - 100 });

  doc.strokeColor(colors.subtleBorder)
    .lineWidth(0.5)
    .moveTo(leftMargin, topMargin + 15)
    .lineTo(leftMargin + contentWidth, topMargin + 15)
    .stroke();

  doc.y = topMargin + 20;

  // Technical Projects Continued
  drawSectionHeader('Technical Projects (Continued)', doc.y);

  renderProject(resumeData.projects[2]); // Mentor-Student Management
  renderProject(resumeData.projects[3]); // Attendance Management System

  // 6. HONORS & ACHIEVEMENTS
  drawSectionHeader('Honors & Competitive Achievements');

  const achieveY = doc.y + 1.5;
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(colors.primary);
  doc.text('Code Frenzy', leftMargin + 6, achieveY, { continued: true });
  doc.font('Helvetica').fontSize(10.5).fillColor(colors.body);
  doc.text('   —   ', { continued: true });
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(colors.sectionHead);
  doc.text('22nd rank');
  doc.font('Helvetica-Oblique').fontSize(9.5).fillColor(colors.meta);
  doc.text('Competitive programming contest ranking.', leftMargin + 6, doc.y + 1);
  doc.y += 3;

  // 7. LEADERSHIP & INVOLVEMENT
  drawSectionHeader('Leadership & Involvement');

  resumeData.leadership.forEach((act) => {
    const actY = doc.y + 1.5;
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(colors.primary);
    doc.text(act.organization, leftMargin, actY, { continued: true });
    doc.font('Helvetica').fontSize(9.5).fillColor(colors.meta);
    doc.text(`   —   ${act.role}`, { width: contentWidth });

    const detailY = doc.y + 1.5;
    doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
    doc.text(act.detail, leftMargin + 8, detailY, {
      width: contentWidth - 8,
      lineGap: 2.2
    });
    doc.y += 3;
  });

  // 8. PROBLEM SOLVING PROFILES & PLATFORMS
  drawSectionHeader('Competitive Programming & Coding Profiles');

  const platforms = [
    { name: 'LeetCode', handle: '@vamsh_i2007', note: 'Active problem solving covering binary search, dynamic programming, trees, and graphs.' },
    { name: 'CodeChef', handle: '@vamsh_i2007', note: 'Regular participant in timed competitive programming rounds and algorithmic contests.' },
    { name: 'Codeforces', handle: '@vamsh_i2007', note: 'Contest participation with rigorous asymptotic runtime and memory constraints.' },
    { name: 'GitHub', handle: '@palleti-vamshi', note: 'Public codebases, industrial IoT simulation prototypes, and academic project implementations.' }
  ];

  platforms.forEach((p) => {
    const platY = doc.y + 2;
    doc.font('Helvetica-Bold').fontSize(10.2).fillColor(colors.primary);
    doc.text(`${p.name} (${p.handle}): `, leftMargin, platY, { continued: true });
    doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
    doc.text(p.note, { lineGap: 2.0 });
    doc.y += 2.5;
  });

  // 9. CORE ENGINEERING STRENGTHS
  drawSectionHeader('Core Engineering Strengths');

  const strengthsY = doc.y + 3;
  doc.font('Helvetica').fontSize(10.2).fillColor(colors.body);
  doc.text(
    resumeData.strengths.join('   •   '),
    leftMargin,
    strengthsY,
    {
      align: 'center',
      width: contentWidth
    }
  );

  console.log('Page 2 content ends at Y:', doc.y.toFixed(1));
  printFooter('Palleti Vamshi — Technical Resume  •  Page 2 of 2');

  // Finalize document
  doc.end();

  writeStream.on('finish', () => {
    const stats = fs.statSync(OUTPUT_PATH);
    const buf = fs.readFileSync(OUTPUT_PATH);
    const count = (buf.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length;
    console.log(`✓ Resume PDF generated successfully!`);
    console.log(`  File: ${OUTPUT_PATH}`);
    console.log(`  Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`  VERIFIED PAGE COUNT: ${count}`);
  });
}

buildResumePdf();
