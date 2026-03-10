import { syllable } from 'syllable';

let dictionary = null;

async function loadDictionary() {
  if (!dictionary) {
    const module = await import('./dictionary.js');
    dictionary = module.dictionary;
  }
}

function textToWords(text) {
  const regex = /\w+(?:[\w'\-.][\w.]+)?/g;
  const words = text.match(regex);
  return words || [text];
}

function cmuDictionaryLookup(word) {
  return dictionary[word.toLowerCase()];
}

async function syllableCountForWord(word) {
  const count = cmuDictionaryLookup(word);
  if (count !== undefined) {
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
