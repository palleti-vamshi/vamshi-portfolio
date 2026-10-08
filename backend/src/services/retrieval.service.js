import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { embedQuery, cosineSimilarity } from './embedding.service.js';
import { loadAndChunkKnowledge } from './documentLoader.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEX_FILE_PATH = path.resolve(__dirname, '../data/vectorIndex.json');
const DEFAULT_TOP_K = parseInt(process.env.CHAT_TOP_K, 10) || 4;

let cachedIndex = null;

/**
 * Load vector index from disk or dynamically build in memory if missing
 */
export async function getVectorIndex() {
  if (cachedIndex) return cachedIndex;

  if (fs.existsSync(INDEX_FILE_PATH)) {
    try {
      const raw = fs.readFileSync(INDEX_FILE_PATH, 'utf8');
      cachedIndex = JSON.parse(raw);
      return cachedIndex;
    } catch (err) {
      console.warn('[RetrievalService] Failed to parse vector index file, rebuilding:', err.message);
    }
  }

  // Fallback: build in-memory if index file not yet generated
  const { chunks } = await loadAndChunkKnowledge();
  cachedIndex = {
    metadata: {
      indexedAt: new Date().toISOString(),
      dynamic: true,
      totalChunks: chunks.length
    },
    chunks: chunks.map((c) => ({
      ...c,
      embedding: null // Will perform lexical/semantic scoring
    }))
  };

  return cachedIndex;
}

/**
 * Invalidate in-memory cached index (e.g. after re-indexing)
 */
export function invalidateIndexCache() {
  cachedIndex = null;
}

/**
 * Retrieve Top-K relevant knowledge chunks for a user query
 */
export async function retrieveRelevantChunks(query, options = {}) {
  const topK = options.topK || DEFAULT_TOP_K;
  if (!query || typeof query !== 'string' || !query.trim()) {
    return { chunks: [], sources: [] };
  }

  const index = await getVectorIndex();
  const chunks = index.chunks || [];
  if (chunks.length === 0) {
    return { chunks: [], sources: [] };
  }

  // Generate query embedding
  const queryEmbedding = await embedQuery(query.trim());

  // Score all chunks
  const scoredChunks = [];
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 2);

  for (const chunk of chunks) {
    let score = 0;

    // Vector cosine similarity
    if (chunk.embedding && Array.isArray(chunk.embedding)) {
      score = cosineSimilarity(queryEmbedding, chunk.embedding);
    } else {
      // Fallback term overlap if embeddings are absent
      const contentLower = chunk.content.toLowerCase();
      let matches = 0;
      for (const w of queryWords) {
        if (contentLower.includes(w)) matches++;
      }
      score = queryWords.length > 0 ? matches / queryWords.length : 0;
    }

    // Keyword boost for exact document/project title mentions
    const docTitleLower = (chunk.docTitle || '').toLowerCase();
    const sectionLower = (chunk.section || '').toLowerCase();
    if (queryLower.includes(docTitleLower) || docTitleLower.includes(queryLower)) {
      score += 0.15;
    }
    if (queryLower.includes(sectionLower) && sectionLower.length > 3) {
      score += 0.10;
    }

    scoredChunks.push({
      chunkId: chunk.chunkId,
      docId: chunk.docId,
      docTitle: chunk.docTitle,
      section: chunk.section,
      sourceTag: chunk.sourceTag,
      content: chunk.content,
      score: Math.min(1.0, Math.max(0.0, score))
    });
  }

  // Sort descending by relevance score
  scoredChunks.sort((a, b) => b.score - a.score);

  const topResults = scoredChunks.slice(0, topK);

  // Extract distinct friendly sources
  const sourceSet = new Set();
  topResults.forEach((c) => {
    if (c.sourceTag) sourceSet.add(c.sourceTag);
  });

  return {
    chunks: topResults,
    sources: Array.from(sourceSet)
  };
}
