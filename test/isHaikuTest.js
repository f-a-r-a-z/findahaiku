const assert = require('assert');
const haiku = require('.././index.js');

const testCases = [
  { title: 'should detect a basic haiku (lowercase)',
    input: 'an old silent pond a frog jumps into the pond splash silence again',
    returns: true },

  { title: 'should detect a basic haiku (uppercase)',
    input: 'WIZARD AFTERNOON WHY A PRIVATE CRAZED CAR HOPS WATCHING THE VAMPIRE',
    returns: true },

  { title: 'should detect a basic haiku (mixed case)',
    input: 'Pungent break of dAY A largE wEIrd AnTEATEr slEepS BeTrAYEd By tHE BirD',
    returns: true },

  { title: 'should reject a basic haiku with words not in dictionary (lowercase)',
    input: 'yab yab yab yab yab yab yab yab yab yab yab yab yab yab yab yab yab',
    returns: false },

  { title: 'should reject a non-haiku with less than 17 syllables (lowercase)',
    input: 'this is not a haiku',
    returns: false },

  { title: 'should reject a non-haiku with more than 17 syllables (lowercase)',
    input: 'i am not a haiku but one day i could become one if i really tried hard and gave it my all',
    returns: false },

  { title: 'should reject a non-haiku with exactly 17 syllables (lowercase)',
    input: 'what if this is inappropriate extravaganza werewolf meat',
    returns: false },

  { title: 'should ignore punctuation next to words',
    input: 'Hello, good morning?..... How are you today? Me too. See you later then!',
    returns: true },

  { title: 'should not ignore punctuation in the middle of words',
    input: "I didn't do it, I swear! Please don't let this be! I won't forgive this...",
    returns: true },

  { title: 'should reject an empty string',
    input: '',
    returns: false },
];

describe('findahaiku', function() {
  describe('isHaiku(sentence)', function() {
    testCases.forEach(function(testCase) {
      it(testCase.title, function() {
        assert.equal(haiku.analyzeText(testCase.input).isHaiku, testCase.returns);
      });
    });
  });
});
