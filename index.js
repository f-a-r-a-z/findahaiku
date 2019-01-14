module.exports = {
  isHaiku,
};

// cmu-pronouncing-dictionary uses ARPABET phonetic transcription
// Read more: https://en.wikipedia.org/wiki/ARPABET
const pronounciations = require('cmu-pronouncing-dictionary');

function isHaiku(sentence) {
  if (!isString(sentence)) throw new TypeError('isHaiku expects string input, recieved', typeof sentence);
  const wordArray = sentence.split(' ') || [];
  if (wordArray.length < 3 || wordArray.length > 17) return false;

  const cleanedWords = wordArray.map(word => removePunctuation(word).toLowerCase());
  const cleanedWordsSyllables = cleanedWords.map(word => syllables(word));

  // If a word is unrecognized, a haiku cannot be made
  if (cleanedWordsSyllables.includes(0)) return false;

  let currentLineSyllables = 0;
  let currentSentence = 0;
  const lineSyllables = [5, 7, 5];

  for (let i = 0; i < cleanedWordsSyllables.length; i += 1) {
    currentLineSyllables += cleanedWordsSyllables[i];

    if (currentLineSyllables === lineSyllables[currentSentence]) {
      currentSentence += 1;
      currentLineSyllables = 0;
    } else if (currentLineSyllables >= lineSyllables[currentSentence]) {
      return false;
    }
  }

  if (currentSentence === lineSyllables.length && currentLineSyllables === 0) return true;
  return false;
}

function formatHaiku(sentence) {
  // Error checks
  if (!isString(sentence)) throw new TypeError('formatHaiku expects string input, recieved', typeof sentence);
  if (!isHaiku(sentence)) throw new Error('formatHaiku expects a valid haiku input, did you mean to use isHaiku?');

  const wordArray = sentence.split(' ') || [];

  const cleanedWords = wordArray.map(word => removePunctuation(word).toLowerCase());
  const cleanedWordsSyllables = cleanedWords.map(word => syllables(word));

  let currentLineSyllables = 0;
  let currentSentence = 0;
  const lineSyllables = [5, 7, 5];
  let haiku = '';

  for (let i = 0; i < cleanedWordsSyllables.length; i += 1) {
    currentLineSyllables += cleanedWordsSyllables[i];
    haiku += wordArray[i];

    if (currentLineSyllables === lineSyllables[currentSentence]) {
      currentSentence += 1;
      currentLineSyllables = 0;
      haiku += '\n';
    } else {
      haiku += ' ';
    }
  }

  return haiku;
}

//
//      Helper Functions
//
function isString(string) {
  return typeof string === 'string';
}

// Removes punctuation at the end and start of a word
// Punctuation in the middle of word may be neccessary to recognise the word e.g. isn't vs isnt
function removePunctuation(word) {
  return word.replace(/^([^A-Za-z]+)|([^A-Za-z]+)$/g, '');
}

function syllables(word = '') {
  const phoneticTranscription = pronounciations[word] || '';
  const stresses = phoneticTranscription.match(/[0-9]/g) || [];
  return stresses.length;
}
