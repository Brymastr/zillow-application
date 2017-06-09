const { Duplex } = require('stream');
const buffer = Symbol('buffer');

/**
 * Read text input and output summary objects
 * with Elapsed Time, Byte length, and Total Lines
 */
class LogStream extends Duplex {
  constructor(options) {
    super(options);
    this.waiting = false;
  }

  _read(size) {
    // TODO: save data to an array in the write method then this.push it here
    
  }

  _write(data, encoding, done) {
    this.waiting = false;    
    this.push(this.summarize(data));
    done();
  }

  summarize(data) {
    return JSON.stringify({
      time: 0,
      length: data.length,
      lines: data.toString().split('\n').length
    });
  }
}

module.exports = LogStream;