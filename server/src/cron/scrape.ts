import './bootstrap.js';

import { getDirectory, getDetailedManga, getFrames } from 'scraper-read-manga';
import pLimit from 'p-limit';
import { Worker } from 'worker_threads';
import * as url from 'url';
import path from 'path';

let total = 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let limitPool: Promise<any>[] = [];

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i).toUpperCase());
const limit = pLimit(10);

for (const letter of alphabet) {
  const directory = await getDirectory(letter);

  total += directory.length;

  for (const manga of directory) {
    const limitedPromise = limit(async () => {
      const worker = new Worker(path.join(__dirname, 'worker.js'), {
        workerData: { manga, sourceName: 'readmanga.app' },
      });

      return new Promise((resolve, reject) => {
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', resolve);
      });
    });

    limitPool.push(limitedPromise);
  }

  console.log('await for all');
  await Promise.all(limitPool);
  limitPool = [];

  console.log(`Found ${directory.length} manga in ${letter}`);
}

console.log(`Found ${total} total manga`);
