# Find and Format Haikus
This is the source code for the findahaiku Node.js package which can be used to detect and format haikus.

# Installation
To install use the command:

    npm install findahaiku --save

# Usage
````
const findahaiku = require('findahaiku');
const haiku = "I didn't do it, I swear! Please don't let this be! I won't forgive this...";
const {isHaiku, formattedHaiku} = findahaiku.analyzeText(haiku);

console.log(isHaiku); // true
console.log(formattedHaiku); // "I didn't do it,\nI swear! Please don't let this be!\nI won't forgive this..."
````

## Input Requirements
The input is expected to be a properly formatted sentence, otherwise `isHaiku` will be `false`. A properly formatted sentence follows the following rules:
- No extra spaces (e.g. "Hello&nbsp;&nbsp;&nbsp;&nbsp;world" is invalid)
- No lone punctuation (e.g. "Hi , how are you" is invalid)
- Spaces after punctuation (e.g. "Hello, I'm good. How are you?" is valid)
- Valid spelling (e.g. "Gud mornin" is invalid)

# Setting Up for Development/Testing
These are instructions for setting up the development environment.

First clone the git repository and `cd` into its folder:

    git clone https://github.com/f-a-r-a-z/findahaiku.git foldername
    cd foldername

Then install dependencies:

    npm install

Finally, call the testing script to make sure everything's fine:

    npm test
