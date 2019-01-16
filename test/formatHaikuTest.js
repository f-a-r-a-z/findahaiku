const assert = require('assert');
const haiku = require('.././index.js');

const testCases = [
  { title: 'should format a basic haiku (lowercase)',
    input: 'an old silent pond a frog jumps into the pond splash silence again',
    returns: 'an old silent pond\na frog jumps into the pond\nsplash silence again' },

  { title: 'should format a basic haiku and retain case (uppercase)',
    input: 'WIZARD AFTERNOON WHY A PRIVATE CRAZED CAR HOPS WATCHING THE VAMPIRE',
    returns: 'WIZARD AFTERNOON\nWHY A PRIVATE CRAZED CAR HOPS\nWATCHING THE VAMPIRE' },

  { title: 'should format a basic haiku and retain case (mixed case)',
    input: 'Pungent break of dAY A largE wEIrd AnTEATEr slEepS BeTrAYEd By tHE BirD',
    returns: 'Pungent break of dAY\nA largE wEIrd AnTEATEr slEepS\nBeTrAYEd By tHE BirD' },

  { title: 'should retain punctuation next to words',
    input: 'Hello, good morning?..... How are you today? Me too. See you later then!',
    returns: 'Hello, good morning?.....\nHow are you today? Me too.\nSee you later then!' },

  { title: 'should retain punctuation in the middle of words',
    input: "I didn't do it, I swear! Please don't let this be! I won't forgive this...",
    returns: "I didn't do it,\nI swear! Please don't let this be!\nI won't forgive this..." },

  { title: 'should remove newlines in the sentence',
    input: '\nan old silent pond\n\na frog jumps into the pond\nsplash silence again',
    returns: 'an old silent pond\na frog jumps into the pond\nsplash silence again' },

  { title: 'should ignore tabs, newlines and carriage returns in the sentence',
    input: '\t\tan old silent\r\npond\n\t\ta frog jumps into the pond\n\t\tsplash silence again',
    returns: 'an old silent pond\na frog jumps into the pond\nsplash silence again' },

  { title: 'should remove multiple spaces in the sentence',
    input: ' an       old silent   pond  a frog  jumps into the pond   splash silence   again',
    returns: 'an old silent pond\na frog jumps into the pond\nsplash silence again' },

  { title: 'should retain punctuation by itself in the sentence',
    input: 'an old silent pond . a frog jumps into the pond . splash ! silence again ...',
    returns: 'an old silent pond .\na frog jumps into the pond .\nsplash ! silence again ...' },
];

describe('findahaiku', function() {
  describe('formatHaiku(sentence)', function() {
    testCases.forEach(function(testCase) {
      it(testCase.title, function() {
        assert.equal(haiku.analyzeText(testCase.input).formattedHaiku, testCase.returns);
      });
    });
  });
});
