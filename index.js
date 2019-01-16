module.exports = {
  analyzeText,
};

// cmu-pronouncing-dictionary uses ARPABET phonetic transcription
// Read more: https://en.wikipedia.org/wiki/ARPABET
const pronounciations = require('cmu-pronouncing-dictionary');

function analyzeText(sentence) {
  if (!isString(sentence)) throw new TypeError('isHaiku expects string input, recieved', typeof sentence);

  let result = { isHaiku: false, formattedHaiku: '' };

  const wordArray = sentence.split(' ') || [];
  if (wordArray.length < 3 || wordArray.length > 17) return result; // Cannot be a haiku

  const cleanedWords = wordArray.map(word => removePunctuation(word).toLowerCase());
  const cleanedWordsSyllables = cleanedWords.map(word => getSyllables(word));

  // If a word is unrecognized, a haiku cannot be made
  if (cleanedWordsSyllables.includes(0)) return result;

  let currentLineSyllables = 0;
  let currentSentence = 0;
  const lineSyllables = [5, 7, 5];

  for (let i = 0; i < cleanedWordsSyllables.length; i += 1) {
    currentLineSyllables += cleanedWordsSyllables[i];
    result.formattedHaiku += wordArray[i];

    if (currentLineSyllables === lineSyllables[currentSentence]) {
      currentSentence += 1;
      currentLineSyllables = 0;
      if (currentSentence < lineSyllables.length) result.formattedHaiku += '\n';
    } else if (currentLineSyllables >= lineSyllables[currentSentence]) {
      result.formattedHaiku = '';
      return result; // Cannot be a haiku
    } else {
      result.formattedHaiku += ' ';
    }
  }

  if (currentSentence === lineSyllables.length && currentLineSyllables === 0) {
    result.isHaiku = true;
  } else {
    result.formattedHaiku = '';
  }

  return result;
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

function getSyllables(word = '') {
  const phoneticTranscription = pronounciations[word] || '';
  const stresses = phoneticTranscription.match(/[0-2]/g) || [];
  return stresses.length;
}
