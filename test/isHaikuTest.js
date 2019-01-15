const assert = require('assert');
const haiku = require('.././index.js');

describe('findahaiku', function() {
  describe('isHaiku(sentence)', function() {
    it('should detect a basic haiku (lowercase)', function() {
      assert.equal(true, haiku.analyzeText('an old silent pond a frog jumps into the pond splash silence again').isHaiku);
    });

    it('should detect a basic haiku (uppercase)', function() {
      assert.equal(true, haiku.analyzeText('WIZARD AFTERNOON WHY A PRIVATE CRAZED CAR HOPS WATCHING THE VAMPIRE').isHaiku);
    });

    it('should detect a basic haiku (mixed case)', function() {
      assert.equal(true, haiku.analyzeText('Pungent break of dAY A largE wEIrd AnTEATEr slEepS BeTrAYEd By tHE BirD').isHaiku);
    });

    it('should reject a basic haiku with words not in dictionary (lowercase)', function() {
      assert.equal(false, haiku.analyzeText('yab yab yab yab yab yab yab yab yab yab yab yab yab yab yab yab yab').isHaiku);
    });

    it('should reject a non-haiku with less than 17 syllables (lowercase)', function() {
      assert.equal(false, haiku.analyzeText('this is not a haiku').isHaiku);
    });

    it('should reject a non-haiku with more than 17 syllables (lowercase)', function() {
      assert.equal(false, haiku.analyzeText('i am not a haiku but one day i could become one if i really tried hard and gave it my all').isHaiku);
    });

    it('should reject a non-haiku with exactly 17 syllables (lowercase)', function() {
      assert.equal(false, haiku.analyzeText('what if this is inappropriate extravaganza werewolf meat').isHaiku);
    });

    it('should ignore punctuation next to words', function() {
      assert.equal(true, haiku.analyzeText('Hello, good morning?..... How are you today? Me too. See you later then!').isHaiku);
    });

    it('should not ignore punctuation in the middle of words', function() {
      assert.equal(true, haiku.analyzeText("I didn't do it, I swear! Please don't let this be! I won't forgive this...").isHaiku);
    });

    it('should ignore newlines in the sentence', function() {
      assert.equal(true, haiku.analyzeText("\nan old silent pond\n\na frog jumps into the pond\nsplash silence again").isHaiku);
    });

    it('should ignore tabs, newlines and carriage returns in the sentence', function() {
      assert.equal(true, haiku.analyzeText("\t\tan old silent\r\npond\n\t\ta frog jumps into the pond\n\t\tsplash silence again").isHaiku);
    });

    it('should ignore multiple spaces in the sentence', function() {
      assert.equal(true, haiku.analyzeText(" an       old silent   pond  a frog  jumps into the pond   splash silence   again").isHaiku);
    });

    it('should ignore punctuation by itself in the sentence', function() {
      assert.equal(true, haiku.analyzeText("an old silent pond . a frog jumps into the pond . splash ! silence again ...").isHaiku);
    });

    it('should reject an empty string', function() {
      assert.equal(false, haiku.analyzeText('').isHaiku);
    });

    it('should throw error when given no input', function() {
      assert.throws(function() {
        haiku.analyzeText();
      }, TypeError);
    });

    it('should throw error when given numerical input', function() {
      assert.throws(function() {
        haiku.analyzeText(91891);
      }, TypeError);
    });

    it('should throw error when given boolean input', function() {
      assert.throws(function() {
        haiku.analyzeText(false);
      }, TypeError);
    });

    it('should throw error when given object input', function() {
      assert.throws(function() {
        haiku.analyzeText({"abc": 123});
      }, TypeError);
    });
  });
});
