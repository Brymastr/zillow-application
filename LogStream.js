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
    this.startTime = Date.now();
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
      time: Date.now() - startTime,             // Total duration of monitor
      bytes: data.length,                       // Length in bytes of data for this summary
      lines: data.toString().split('\n').length // Lines written since last summary
    });
  }
}

module.exports = LogStream;