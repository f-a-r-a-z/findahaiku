
module.exports = {
    
};


// cmu-pronouncing-dictionary uses ARPABET phonetic transcription
// Read more: https://en.wikipedia.org/wiki/ARPABET
const pronounciations = require('cmu-pronouncing-dictionary');


function syllables(word) {
    const phoneticTranscription = pronounciations[word] || "";
    const stresses = phoneticTranscription.match(/[0-9]/g) || [];
    return stresses.length;
}