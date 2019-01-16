# Find and Format Haikus
This is the source code for the findahaiku Node.js package which can be used to detect and format haikus in a wide variety of cases.

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

# Testing
First clone the git repository and `cd` into its folder:

    git clone https://github.com/f-a-r-a-z/findahaiku.git foldername
    cd foldername

Then install dependencies:

    npm install

Finally, call the testing script:

    npm test

# Known Issues
Punctuation on its own (e.g. "Hello , world") will cause the formatted haiku to be missing words on the end. It will still be able to detect the haiku correctly.
