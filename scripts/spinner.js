var readline = require('readline');
class Spinner {
  constructor() {
    this.characters = ['⣷', '⣯', '⣟', '⡿', '⢿', '⣻', '⣽', '⣾'];
    this.message = null;
    this.index = 0;
  }

  start(message) {
    this.message = message || this.message;
    this.index = 0;

    this.timerId = setInterval(() => {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(` ${this.characters[this.index]} ${this.message}`);
      readline.cursorTo(process.stdout, 0);
    
      this.index = this.index === this.characters.length - 1 ? 0 : this.index + 1;
    }, 100);
  }

  stop() {
    clearInterval(this.timerId);

    readline.clearLine();
  }

  setMessage (message) {
    this.message = message;
  }

}

module.exports = Spinner;
