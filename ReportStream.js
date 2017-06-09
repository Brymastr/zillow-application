const { Writable } = require('stream');

/** Class representing a writable Report Stream */
class ReportStream extends Writable {

  /**
   * Create a ReportStream
   * @constructor
   * @param {object} options - Writable stream options
   */
  constructor(options = {}) {
    super({objectMode: true});
    this.interval = options.interval || 1000;
    this.lines = 0;
  }

  _write(data, encoding, done) {
    setTimeout(() => {
      const summary = this.parseSummary(data);
      if(summary !== null) console.log(summary);
      done();
    }, this.interval);
  }

  parseSummary(data) {
    try {
      const summaryObject = JSON.parse(data.toString());
      return summaryObject;
    } catch(err) {
      console.error(`Error parsing incoming summary object: ${err}`);
      return null;
    }
  }
}

module.exports = ReportStream;