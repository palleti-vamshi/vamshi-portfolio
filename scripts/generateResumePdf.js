import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import { resumeData } from '../frontend/src/data/resume.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target output path
const OUTPUT_PATH = path.resolve(__dirname, '../frontend/public/resume.pdf');

/**
 * Generate a professional, 1-page ATS-friendly technical resume PDF
 */
function buildResumePdf() {
  console.log('Generating ATS-friendly one-page PDF resume...');

  // Standard US Letter: 612 x 792 pt
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 32, bottom: 32, left: 36, right: 36 },
    info: {
      Title: `${resumeData.personal.name} — Technical Resume`,
      Author: resumeData.personal.name,
      Subject: 'Software Engineering & AI/ML Undergraduate Resume',
      Keywords: 'Palleti Vamshi, Software Engineer, AI/ML, Python, Java, DSA, Spring Boot, MySQL, MongoDB'
    }
  });

  const writeStream = fs.createWriteStream(OUTPUT_PATH);
  doc.pipe(writeStream);

  const primaryColor = '#111827'; // Dark charcoal / near-black
  const secondaryColor = '#374151'; // Charcoal
  const mutedColor = '#4B5563'; // Slate gray
  const accentColor = '#0F766E'; // Teal / dark emerald
  const lineColor = '#D1D5DB'; // Subtle divider

  const pageWidth = 612;
  const leftMargin = 36;
  const rightMargin = 36;
  const contentWidth = pageWidth - leftMargin - rightMargin; // 540 pt

  // ==========================================
  // 1. HEADER (NAME & CONTACT)
  // ==========================================
  doc.font('Helvetica-Bold').fontSize(19).fillColor(primaryColor);
  doc.text(resumeData.personal.name, leftMargin, 32, { align: 'center', width: contentWidth });

  // Contact line 1 (Location & Email)
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor);
  const contactY = doc.y + 3;
  const contactLine = `${resumeData.personal.location}   •   ${resumeData.personal.email}`;
  doc.text(contactLine, leftMargin, contactY, { align: 'center', width: contentWidth });

  // Make email clickable in contact line
  const emailWidth = doc.widthOfString(resumeData.personal.email);
  const totalContactWidth = doc.widthOfString(contactLine);
  const emailStartX = (pageWidth - totalContactWidth) / 2 + doc.widthOfString(`${resumeData.personal.location}   •   `);
  doc.link(emailStartX, contactY, emailWidth, 10, `mailto:${resumeData.personal.email}`);

  // Contact line 2 (Verified Portfolio Links)
  const linksY = doc.y + 2;
  doc.font('Helvetica-Bold').fontSize(8).fillColor(accentColor);
  
  const links = [
    { text: 'LinkedIn', url: resumeData.personal.links.linkedin.url },
    { text: 'GitHub', url: resumeData.personal.links.github.url },
    { text: 'LeetCode', url: resumeData.personal.links.leetcode.url },
    { text: 'CodeChef', url: resumeData.personal.links.codechef.url },
    { text: 'Codeforces', url: resumeData.personal.links.codeforces.url }
  ];

  const linkParts = links.map(l => l.text).join('   |   ');
  doc.text(linkParts, leftMargin, linksY, { align: 'center', width: contentWidth });

  // Add click annotations for each link
  const linkPartsTotalWidth = doc.widthOfString(linkParts);
  let currentLinkX = (pageWidth - linkPartsTotalWidth) / 2;
  const sepWidth = doc.widthOfString('   |   ');

  links.forEach(l => {
    const textW = doc.widthOfString(l.text);
    doc.link(currentLinkX, linksY, textW, 9, l.url);
    currentLinkX += textW + sepWidth;
  });

  doc.moveDown(0.4);

  // Helper function to render clean section dividers
  function drawSectionHeader(title) {
    const currentY = doc.y + 4;
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor);
    doc.text(title.toUpperCase(), leftMargin, currentY, { width: contentWidth });
    
    const lineY = doc.y + 1;
    doc.strokeColor(lineColor).lineWidth(0.65).moveTo(leftMargin, lineY).lineTo(leftMargin + contentWidth, lineY).stroke();
    doc.y = lineY + 3;
  }

  // ==========================================
  // 2. EDUCATION
  // ==========================================
  drawSectionHeader('Education');

  const eduY = doc.y;
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(primaryColor);
  doc.text(resumeData.education.institution, leftMargin, eduY, { width: contentWidth - 110 });

  doc.font('Helvetica').fontSize(8).fillColor(mutedColor);
  doc.text(resumeData.education.location, leftMargin + contentWidth - 100, eduY, { align: 'right', width: 100 });

  const degY = doc.y + 1;
  doc.font('Helvetica').fontSize(8.2).fillColor(secondaryColor);
  doc.text(`${resumeData.education.degree}  (Current: 2nd Year)`, leftMargin, degY, { width: contentWidth - 120 });

  doc.font('Helvetica').fontSize(8).fillColor(mutedColor);
  doc.text('Graduation: 2029', leftMargin + contentWidth - 100, degY, { align: 'right', width: 100 });

  const cgpaY = doc.y + 1;
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor(accentColor);
  doc.text(`Cumulative GPA: ${resumeData.education.cgpa}`, leftMargin, cgpaY);

  doc.moveDown(0.2);

  // ==========================================
  // 3. TECHNICAL SKILLS
  // ==========================================
  drawSectionHeader('Technical Skills');

  const skillsList = [
    { label: 'Programming', items: resumeData.skills.programming.join(', ') },
    { label: 'AI & Machine Learning', items: resumeData.skills.aiMl.join(', ') },
    { label: 'Backend Development', items: resumeData.skills.backend.join(', ') },
    { label: 'Databases & Persistence', items: resumeData.skills.databases.join(', ') },
    { label: 'Tools, Systems & Protocols', items: resumeData.skills.toolsProtocols.join(', ') }
  ];

  skillsList.forEach(s => {
    const rowY = doc.y + 1;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(primaryColor);
    doc.text(`${s.label}: `, leftMargin, rowY, { continued: true });
    doc.font('Helvetica').fontSize(8).fillColor(secondaryColor);
    doc.text(s.items);
  });

  doc.moveDown(0.2);

  // ==========================================
  // 4. PROJECTS (EXACTLY FOUR PROJECTS)
  // ==========================================
  drawSectionHeader('Technical Projects');

  resumeData.projects.forEach(proj => {
    const projHeaderY = doc.y + 2;
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(primaryColor);
    doc.text(proj.title, leftMargin, projHeaderY, { continued: true });

    if (proj.githubUrl) {
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(accentColor);
      doc.text('   [GitHub ↗]', { continued: true });
      const tagW = doc.widthOfString('   [GitHub ↗]');
      doc.link(doc.x - tagW, projHeaderY, tagW, 9, proj.githubUrl);
    }

    doc.font('Helvetica-Oblique').fontSize(7.8).fillColor(mutedColor);
    doc.text(`  |  ${proj.tech}`, { width: contentWidth });

    // Project bullets
    proj.bullets.forEach(bullet => {
      const bulletY = doc.y + 1;
      doc.font('Helvetica').fontSize(7.8).fillColor(secondaryColor);
      doc.text('•', leftMargin + 6, bulletY, { width: 10 });
      doc.text(bullet, leftMargin + 16, bulletY, {
        width: contentWidth - 16,
        lineGap: 0.8
      });
    });

    doc.moveDown(0.15);
  });

  // ==========================================
  // 5. LEADERSHIP & ACTIVITIES
  // ==========================================
  drawSectionHeader('Leadership & Extracurricular Activities');

  resumeData.leadership.forEach(act => {
    const actY = doc.y + 1;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(primaryColor);
    doc.text(`${act.organization} — `, leftMargin, actY, { continued: true });
    doc.font('Helvetica-Bold').fontSize(8).fillColor(accentColor);
    doc.text(act.role, { continued: true });
    doc.font('Helvetica').fontSize(7.8).fillColor(secondaryColor);
    doc.text(`: ${act.detail}`, { lineGap: 0.8 });
  });

  doc.moveDown(0.2);

  // ==========================================
  // 6. CORE STRENGTHS
  // ==========================================
  drawSectionHeader('Core Strengths');

  const strengthY = doc.y + 1;
  doc.font('Helvetica').fontSize(8).fillColor(secondaryColor);
  doc.text(resumeData.strengths.join('   •   '), leftMargin, strengthY, {
    align: 'center',
    width: contentWidth
  });

  // Finalize PDF
  doc.end();

  writeStream.on('finish', () => {
    const stats = fs.statSync(OUTPUT_PATH);
    console.log(`✓ Resume PDF generated successfully!`);
    console.log(`  File: ${OUTPUT_PATH}`);
    console.log(`  Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`  Pages: ${doc.bufferedPageRange().count}`);
  });
}

buildResumePdf();
