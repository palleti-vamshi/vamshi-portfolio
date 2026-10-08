import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import '../src/config/env.js';
import { loadAndChunkKnowledge } from '../src/services/documentLoader.service.js';
import { embedDocuments, getEmbeddingConfig } from '../src/services/embedding.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.resolve(__dirname, '../src/data/vectorIndex.json');

async function main() {
  console.log('='.repeat(60));
  console.log('KNOWLEDGE BASE INDEXER');
  console.log('='.repeat(60));

  const startTime = Date.now();

  // 1. Load and chunk markdown files
  console.log('\n[1/4] Loading and chunking Markdown files from knowledge/...');
  const { chunks, files, totalChunks } = await loadAndChunkKnowledge();

  console.log(`✓ Processed ${files.length} knowledge files:`);
  files.forEach((f) => {
    console.log(`  - ${f.path} (${f.chunkCount} chunks)`);
  });
  console.log(`✓ Total chunks created: ${totalChunks}`);

  // 2. Configure embedding provider
  const config = getEmbeddingConfig();
  console.log(`\n[2/4] Embedding provider: ${config.provider} (Model: ${config.model})`);

  // 3. Generate embeddings
  console.log('[3/4] Generating embeddings for all chunks...');
  const embeddings = await embedDocuments(chunks);
  console.log(`✓ Generated ${embeddings.length} embeddings (${embeddings[0]?.length || 0} dimensions)`);

  // 4. Build index payload
  console.log('\n[4/4] Writing vector index...');
  const indexPayload = {
    metadata: {
      indexedAt: new Date().toISOString(),
      totalFiles: files.length,
      totalChunks,
      provider: config.provider,
      model: config.model,
      dimensions: embeddings[0]?.length || 0
    },
    chunks: chunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i]
    }))
  };

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(indexPayload, null, 2), 'utf8');
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`✓ Index written successfully to: ${OUTPUT_PATH}`);
  console.log(`\nSummary:`);
  console.log(`- Files processed: ${files.length}`);
  console.log(`- Chunks created: ${totalChunks}`);
  console.log(`- Embeddings generated: ${embeddings.length}`);
  console.log(`- Time elapsed: ${duration}s`);
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Fatal error during knowledge indexing:', err);
  process.exit(1);
});
