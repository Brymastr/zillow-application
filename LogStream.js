const { Duplex } = require('stream');

/** Class representing a readable and writable stream of log text data */
class LogStream extends Duplex {

  /**
   * Create a LogStream
   * @constructor
   * @param {object} options - Readable/Writable stream options
   */
  constructor(options) {
    super(options);
    this.startTime = new Date();
  }

  _read(size) {
    // Unimplemented
  }

  _write(data, encoding, done) {
    this.push(LogStream.summarize(data, this.startTime));
    done();
  }

  static summarize(data, startTime) {
    return JSON.stringify({
      time: new Date() - startTime,
      length: data.length,
      lines: data.toString().split('\n').length - 1
    });
  }
}

module.exports = LogStream;