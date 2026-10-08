import { GoogleGenerativeAI } from '@google/generative-ai';

const DEFAULT_EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'gemini-embedding-001';
const LOCAL_VECTOR_DIM = 256;

/**
 * Generate a local normalized semantic vector (hash-based TF-IDF with n-grams)
 * Used when an external API key is not configured or in offline test environments.
 */
function generateLocalVector(text, dimensions = LOCAL_VECTOR_DIM) {
  const vec = new Float32Array(dimensions);
  if (!text || typeof text !== 'string') return Array.from(vec);

  const clean = text.toLowerCase().replace(/[^a-z0-9_\s]/g, ' ');
  const words = clean.split(/\s+/).filter(Boolean);

  // Unigrams and bigrams
  const tokens = [...words];
  for (let i = 0; i < words.length - 1; i++) {
    tokens.push(`${words[i]}_${words[i + 1]}`);
  }

  // Hash tokens into vector buckets
  for (const token of tokens) {
    let hash = 2166136261;
    for (let i = 0; i < token.length; i++) {
      hash ^= token.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const idx = Math.abs(hash) % dimensions;
    const sign = (hash & 1) === 0 ? 1 : -1;
    vec[idx] += sign;
  }

  // L2 normalize
  let norm = 0;
  for (let i = 0; i < dimensions; i++) {
    norm += vec[i] * vec[i];
  }
  norm = Math.sqrt(norm);

  if (norm > 0) {
    for (let i = 0; i < dimensions; i++) {
      vec[i] /= norm;
    }
  }

  return Array.from(vec);
}

/**
 * Compute cosine similarity between two numeric vectors
 */
export function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

/**
 * Get active embedding provider config
 */
export function getEmbeddingConfig() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;
  const provider = process.env.EMBEDDING_PROVIDER || (apiKey ? 'gemini' : 'local-semantic');
  const model = process.env.EMBEDDING_MODEL || (apiKey ? 'gemini-embedding-001' : 'local-ngram-256');

  return { provider, model, hasApiKey: Boolean(apiKey) };
}

/**
 * Embed an array of document chunks
 */
export async function embedDocuments(chunks) {
  const { provider, model, hasApiKey } = getEmbeddingConfig();

  if (hasApiKey && provider === 'gemini') {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const embeddingModel = genAI.getGenerativeModel({ model });

      const embeddings = [];
      for (const chunk of chunks) {
        const text = typeof chunk === 'string' ? chunk : chunk.content;
        const res = await embeddingModel.embedContent(text);
        embeddings.push(res.embedding.values);
      }

      return embeddings;
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        const sanitized = (err.message || '').replace(/([a-zA-Z0-9_-]{8})[a-zA-Z0-9_-]{12,}([a-zA-Z0-9_-]{4})/g, '$1...$2');
        console.warn(`[EmbeddingService Dev] Gemini embedding call failed, falling back to local semantic vectors:`, sanitized);
      }
    }
  }

  // Fallback to local deterministic normalized vectors
  return chunks.map((chunk) => {
    const text = typeof chunk === 'string' ? chunk : chunk.content;
    return generateLocalVector(text);
  });
}

/**
 * Embed a single query string
 */
export async function embedQuery(queryText) {
  const { provider, model, hasApiKey } = getEmbeddingConfig();

  if (hasApiKey && provider === 'gemini') {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const embeddingModel = genAI.getGenerativeModel({ model });

      const res = await embeddingModel.embedContent(queryText);
      return res.embedding.values;
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        const sanitized = (err.message || '').replace(/([a-zA-Z0-9_-]{8})[a-zA-Z0-9_-]{12,}([a-zA-Z0-9_-]{4})/g, '$1...$2');
        console.warn(`[EmbeddingService Dev] Gemini query embedding failed, falling back to local semantic vector:`, sanitized);
      }
    }
  }

  return generateLocalVector(queryText);
}
