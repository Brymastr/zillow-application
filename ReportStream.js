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
    this.verbose = options.verbose || false;
    this.totalLines = 0;
    this.totalBytes = 0;
    this.startTime = Date.now();
  }

  _write(data, encoding, done) {
    setTimeout(() => {
      const summary = this.parseSummary(data.toString());
      const now = Date.now();
      const bytesPerSecond = Math.floor(this.totalBytes / ((now - this.startTime) / 1000.0));
      if(summary !== null) {
        if(this.verbose === true) console.log(`[${new Date().toISOString()}] New lines: ${summary.lines}, Total lines: ${this.totalLines}, New bytes: ${summary.bytes}, Avg. bytes/s: ${bytesPerSecond}`);
        else console.log(`Total lines: ${this.totalLines}, Avg. bytes/s: ${bytesPerSecond}`);
      }
    }, this.interval);
    done();
  }

  /**
   * Parse json stringified summary objects
   * 
   * @param {string} data - stringified summary object to parse
   */
  parseSummary(data) {
    try {
      const summaryObject = JSON.parse(data);
      this.totalLines += summaryObject.lines;
      this.totalBytes += summaryObject.bytes;
      return summaryObject;
    } catch(err) {
      console.error(`Error parsing incoming summary object: ${err}`);
      return null;
    }
  }
}

module.exports = ReportStream;

// TODO: Show throughput in bytes/second (length / interval / 60)