import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve knowledge directory path from workspace root
const KNOWLEDGE_DIR = path.resolve(__dirname, '../../../knowledge');

/**
 * Parse frontmatter and markdown body from file content
 */
function parseMarkdownWithFrontmatter(rawContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  const metadata = {};
  let body = rawContent;

  if (match) {
    const rawYaml = match[1];
    body = match[2];

    rawYaml.split('\n').forEach((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        const key = line.slice(0, colonIdx).trim();
        const value = line.slice(colonIdx + 1).trim();
        metadata[key] = value;
      }
    });
  }

  return { metadata, body };
}

/**
 * Clean and normalize source tag from document ID or title
 */
function getSourceTag(docId, docTitle) {
  const map = {
    'profile': 'Profile',
    'education': 'Education',
    'skills': 'Skills',
    'coding': 'Coding Profiles',
    'journey': 'Engineering Journey',
    'interests': 'Interests',
    'lightx-ids': 'LightX-IDS',
    'smart-campus': 'Smart Campus',
    'mentor-student': 'Mentor-Student',
    'attendance-management': 'Attendance Management'
  };

  return map[docId] || docTitle || 'Portfolio';
}

/**
 * Split markdown body into meaningful section chunks by ## headings
 */
function chunkMarkdownBody(docId, docTitle, body, sourceTag) {
  const chunks = [];
  const lines = body.split('\n');

  let currentHeading = 'Overview';
  let currentLines = [];
  let chunkIndex = 0;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      // Flush previous chunk if non-empty
      if (currentLines.length > 0) {
        const text = currentLines.join('\n').trim();
        if (text.length > 30) {
          chunks.push({
            chunkId: `${docId}_${chunkIndex++}`,
            docId,
            docTitle,
            section: currentHeading,
            sourceTag,
            content: `Document: ${docTitle}\nSection: ${currentHeading}\n\n${text}`
          });
        }
      }
      currentHeading = line.replace('## ', '').trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  // Flush remaining lines
  if (currentLines.length > 0) {
    const text = currentLines.join('\n').trim();
    if (text.length > 30) {
      chunks.push({
        chunkId: `${docId}_${chunkIndex++}`,
        docId,
        docTitle,
        section: currentHeading,
        sourceTag,
        content: `Document: ${docTitle}\nSection: ${currentHeading}\n\n${text}`
      });
    }
  }

  return chunks;
}

/**
 * Load all markdown files from the knowledge directory and chunk them
 */
export async function loadAndChunkKnowledge(knowledgeDirPath = KNOWLEDGE_DIR) {
  if (!fs.existsSync(knowledgeDirPath)) {
    throw new Error(`Knowledge directory not found at: ${knowledgeDirPath}`);
  }

  const allChunks = [];
  const processedFiles = [];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const rawContent = fs.readFileSync(fullPath, 'utf8');
        const { metadata, body } = parseMarkdownWithFrontmatter(rawContent);

        const relPath = path.relative(knowledgeDirPath, fullPath);
        const docId = metadata.id || path.basename(entry.name, '.md');
        const docTitle = metadata.title || docId;
        const sourceTag = getSourceTag(docId, docTitle);

        const fileChunks = chunkMarkdownBody(docId, docTitle, body, sourceTag);
        allChunks.push(...fileChunks);
        processedFiles.push({
          path: relPath,
          docId,
          docTitle,
          chunkCount: fileChunks.length
        });
      }
    }
  }

  scanDir(knowledgeDirPath);

  return {
    chunks: allChunks,
    files: processedFiles,
    totalChunks: allChunks.length
  };
}
