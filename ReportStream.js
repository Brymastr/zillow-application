const { Writable } = require('stream');

/**
 * Read text input and output summary objects
 * with Elapsed Time, Byte length, and Total Lines
 */
class ReportStream extends Writable {
  constructor(options) {
    super({objectMode: true});
  }

  _write(data, encoding, done) {
    const summary = JSON.parse(data.toString());
    console.dir(summary);
    done()
  }

}

module.exports = ReportStream;