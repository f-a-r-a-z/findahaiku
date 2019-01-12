const assert = require('assert');
const haiku = require('./index.js');

describe('findahaiku', function() {
  describe('isHaiku()', function() {
    it('should detect a basic haiku (lowercase)', function() {
      assert.equal(true, haiku.isHaiku('an old silent pond a frog jumps into the pond splash silence again'));
    });

    it('should detect a basic haiku (uppercase)', function() {
      assert.equal(true, haiku.isHaiku('WIZARD AFTERNOON WHY A PRIVATE CRAZED CAR HOPS WATCHING THE VAMPIRE'));
    });

    it('should detect a basic haiku (mixed case)', function() {
      assert.equal(true, haiku.isHaiku('Pungent break of dAY A largE wEIrd AnTEATEr slEepS BeTrAYEd By tHE BirD'));
    });

    it('should reject a non-haiku with less than 17 syllables (lowercase)', function() {
      assert.equal(false, haiku.isHaiku('this is not a haiku'));
    });

    it('should reject a non-haiku with more than 17 syllables (lowercase)', function() {
      assert.equal(false, haiku.isHaiku('i am not a haiku but one day i could become one if i really tried hard and gave it my all'));
    });

    it('should reject a non-haiku with exactly 17 syllables (lowercase)', function() {
      assert.equal(false, haiku.isHaiku('what if this is inappropriate extravaganza werewolf meat'));
    });

    it('should ignore punctuation next to words', function() {
      assert.equal(true, haiku.isHaiku('Hello, good morning?..... How are you today? Me too. See you later then!'));
    });

    it('should not ignore punctuation in the middle of words', function() {
      assert.equal(true, haiku.isHaiku("I didn't do it, I swear! Please don't let this be! I won't forgive this..."));
    });

    it('should reject an empty string', function() {
      assert.equal(false, haiku.isHaiku(''));
    });

    it('should throw error when given no input', function() {
      assert.throws(function() {
        haiku.isHaiku();
      }, TypeError);
    });

    it('should throw error when given numerical input', function() {
      assert.throws(function() {
        haiku.isHaiku(91891);
      }, TypeError);
    });
  });
});
