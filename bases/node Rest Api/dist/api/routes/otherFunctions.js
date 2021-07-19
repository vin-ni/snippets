const fs = require('fs');

class OtherFunctions {
  constructor() {
    this.params = {
      // counterPath: './api/counter.txt',
    };

    // this.newFilename = (sentence) => {
    //   // shorten if too long
    //   if (sentence.length > 75) {
    //     sentence = sentence.slice(0, 50) + '-shortened';
    //   }

    //   let cleaned = this.generateURL(sentence);
    //   // link: https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    //   cleaned = cleaned.replace(
    //     /['!"#$%&\\'()\*+,\.\/:;<=>?@\[\\\]\^_`{|}~']/gi,
    //     ''
    //   ); // remove Sonderzeichen
    //   cleaned = cleaned.replace(/\s{2,}/g, ' '); // remove extra spaces
    //   cleaned = cleaned.replace(/[ ]/g, '-'); // add back Bindestrich

    //   return cleaned;
    // };
  }
}

module.exports = OtherFunctions;
