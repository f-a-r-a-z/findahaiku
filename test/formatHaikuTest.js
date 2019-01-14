const assert = require('assert');
const haiku = require('.././index.js');

describe('findahaiku', function() {
  describe('formatHaiku(sentence)', function() {
    it('should format a basic haiku (lowercase)', function() {
      assert.equal(
        haiku.formatHaiku('an old silent pond a frog jumps into the pond splash silence again'),
        'an old silent pond\na frog jumps into the pond\nsplash silence again'
      );
    });

    it('should format a basic haiku and retain case (uppercase)', function() {
      assert.equal(
        haiku.formatHaiku('WIZARD AFTERNOON WHY A PRIVATE CRAZED CAR HOPS WATCHING THE VAMPIRE'),
          'WIZARD AFTERNOON\nWHY A PRIVATE CRAZED CAR HOPS\nWATCHING THE VAMPIRE'
        );
    });

    it('should format a basic haiku and retain case (mixed case)', function() {
      assert.equal(
        haiku.formatHaiku('Pungent break of dAY A largE wEIrd AnTEATEr slEepS BeTrAYEd By tHE BirD'),
        'Pungent break of dAY\nA largE wEIrd AnTEATEr slEepS\nBeTrAYEd By tHE BirD'
      );
    });

    it('should retain punctuation next to words', function() {
      assert.equal(
        haiku.formatHaiku('Hello, good morning?..... How are you today? Me too. See you later then!'),
        'Hello, good morning?.....\nHow are you today? Me too.\nSee you later then!'
      );
    });

    it('should retain punctuation in the middle of words', function() {
      assert.equal(
        haiku.formatHaiku("I didn't do it, I swear! Please don't let this be! I won't forgive this..."),
        "I didn't do it,\nI swear! Please don't let this be!\nI won't forgive this..."
      );
    });

    it('should remove newlines in the sentence', function() {
      assert.equal(
        haiku.formatHaiku("\nan old silent pond\n\na frog jumps\ninto the pond\nsplash silence again"),
        "an old silent pond\na frog jumps into the pond\nsplash silence again"
      );
    });

    it('should remove tabs and newlines in the sentence', function() {
      assert.equal(
        haiku.formatHaiku("\t\tan old silent pond\n\t\ta frog jumps into the pond\n\t\tsplash silence again"),
        "an old silent pond\na frog jumps into the pond\nsplash silence again"
      );
    });

    it('should remove multiple spaces in the sentence', function() {
      assert.equal(
        haiku.formatHaiku(" an       old silent   pond  a frog  jumps into the pond   splash silence   again"),
        "an old silent pond\na frog jumps into the pond\nsplash silence again"
      );
    });

    it('should retain punctuation by itself in the sentence', function() {
      assert.equal(
        haiku.formatHaiku("an old silent pond . a frog jumps into the pond . splash ! silence again ..."),
        "an old silent pond .\na frog jumps into the pond .\nsplash ! silence again ..."
      );
    });
  });
});