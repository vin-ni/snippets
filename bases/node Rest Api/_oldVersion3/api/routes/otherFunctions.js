const fs = require('fs');

class OtherFunctions {
  constructor() {
    this.params = {
      counterPath: './api/counter.txt',
    };

    this.getCount = () => {
      return new Promise((resolve, reject) => {
        fs.readFile(this.params.counterPath, 'utf8', (err, data) => {
          if (err) reject(err);
          let counter = parseInt(data);
          fs.writeFile(this.params.counterPath, counter, (err) => {
            if (err) reject(err);
            resolve(counter);
          });
        });
      });
    };

    this.increaseCount = () => {
      return new Promise((resolve, reject) => {
        fs.readFile(this.params.counterPath, 'utf8', (err, data) => {
          if (err) reject(err);
          let counter = parseInt(data);
          counter++;
          fs.writeFile(this.params.counterPath, counter, (err) => {
            if (err) reject(err);
            resolve(counter);
          });
        });
      });
    };
  }
}

module.exports = OtherFunctions;
