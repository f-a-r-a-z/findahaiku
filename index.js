module.exports = {
  analyzeText,
};

const syllables = require('syllables');
const extractwords = require('extractwords');

function analyzeText(sentence) {
  const result = { isHaiku: false, formattedHaiku: '' };
  if (cannotBeHaiku(sentence)) return result;

  const wordsWithPunctuation = extractwords(sentence, { punctuation: true });
  let currentLineSyllables = 0;
  let currentLine = 0;
  const lineSyllables = [5, 7, 5];
  let i;

  for (i = 0; i < wordsWithPunctuation.length; i += 1) {
    const haikuTooManySyllables = currentLine >= lineSyllables.length;
    const lineTooManySyllables = currentLineSyllables >= lineSyllables[currentLine];
    if (haikuTooManySyllables || lineTooManySyllables) {
      result.formattedHaiku = '';
      return result;
    }

    const word = wordsWithPunctuation[i];
    const currentSyllables = syllables(word);

    currentLineSyllables += currentSyllables;
    result.formattedHaiku += word;

    const lastWord = i === wordsWithPunctuation.length - 1;
    if ((currentSyllables > 0 || lastWord) && currentLineSyllables === lineSyllables[currentLine]) {
      // Reached end of the haiku's line
      currentLine += 1;
      currentLineSyllables = 0;
      if (currentLine < lineSyllables.length) result.formattedHaiku += '\n';
    } else {
      result.formattedHaiku += ' ';
    }
  }

  const lastLineOfHaiku = currentLine === lineSyllables.length;
  const noLeftoverSyllables = currentLineSyllables === 0;
  const allWordsAddedToHaiku = i === wordsWithPunctuation.length;

  if (lastLineOfHaiku && noLeftoverSyllables && allWordsAddedToHaiku) {
    result.isHaiku = true;
  } else {
    result.formattedHaiku = '';
  }

  return result;
}

function cannotBeHaiku(sentence) {
  if (/\d/.test(sentence)) return true; // No support for digits

  const words = extractwords(sentence);
  if (words.length < 3 || words.length > 17) return true;

  const wordSyllables = words.map(syllables);
  if (wordSyllables.includes(0)) return true; // Non-dictionary word

  return false;
}
