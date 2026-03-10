import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const arpabetVowels = new Set([
  'AO', 'AA', 'IY', 'UW', 'EH', 'IH', 'UH', 'AH', 'AE', 'EY', 'AY', 'OW', 'AW', 'OY', 'ER'
]);

function countArpabetSyllables(arpabet) {
  const phonemes = arpabet.split(" ");
  let count = 0;
  for (let phoneme of phonemes) {
    if (phoneme.length < 2) continue;
    const basePhoneme = phoneme.substring(0, 2);
    if (arpabetVowels.has(basePhoneme)) count++;
  }
  return count;
}

// In a real build, you'd fetch this or have it in a submodule
// For now, we'll assume it's in a known location relative to the package
const cmudictPath = join(__dirname, '../vendor/cmudict-0.7b');

if (!fs.existsSync(cmudictPath)) {
  console.error('CMU Dictionary not found at:', cmudictPath);
  process.exit(1);
}

const data = fs.readFileSync(cmudictPath, 'utf8');
const lines = data.split('\n');
const dictionary = {};

for (let line of lines) {
  if (line.startsWith(";;;") || !line.trim()) continue;
  const [word, arpabet] = line.trim().split("  ");
  if (word && arpabet) {
    dictionary[word.toLowerCase()] = countArpabetSyllables(arpabet);
  }
}

const output = `export const dictionary = ${JSON.stringify(dictionary)};`;
fs.writeFileSync(join(__dirname, '../dictionary.js'), output);
console.log('Optimized dictionary built successfully!');
