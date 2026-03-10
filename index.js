let dictionary = null;

async function loadDictionary() {
  if (!dictionary) {
    const module = await import('./dictionary.js');
    dictionary = module.dictionary;
  }
}

const arpabetVowels = new Set([
  'AO', 'AA', 'IY', 'UW', 'EH', 'IH', 'UH', 'AH', 'AE', 'EY', 'AY', 'OW', 'AW', 'OY', 'ER'
]);

function textToWords(text) {
  const regex = /\w+(?:[\w'\-.][\w.]+)?/g;
  const words = text.match(regex);
  return words || [text];
}

function cmuDictionaryLookup(word) {
  return dictionary[word.toLowerCase()];
}

async function syllableCountForWord(word) {
  const arpabet = cmuDictionaryLookup(word);
  if (arpabet) {
    const phonemes = arpabet.split(" ");
    let count = 0;
    for (let phoneme of phonemes) {
      if (phoneme.length < 2) continue;
      const basePhoneme = phoneme.substring(0, 2);
      if (arpabetVowels.has(basePhoneme)) count++;
    }
    return count;
  } else {
    if (word.length > 1 && word.endsWith(".")) {
      return await syllableCountForWord(word.substring(0, word.length - 2));
    }
    if (word.endsWith("s")) {
      return await syllableCountForWord(word.substring(0, word.length - 1));
    }
  }
  return syllable(word);
}

export async function syllableCount(text) {
  await loadDictionary();
  const words = textToWords(text);
  let syllables = 0;
  for (const w of words) {
    syllables += await syllableCountForWord(w);
  }
  return syllables;
}
