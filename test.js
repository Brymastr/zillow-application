const
  assert = require('assert'),
  LogStream = require('./LogStream'),
  ReportStream = require('./ReportStream');

(function writeToLogStream_ExpectSummary() {
  const dataToWrite = `
    this is a test
    this is also a test
    this is the fourth line
  `;
  const functionName = arguments.callee.name;
  const expectedSummary = {
    bytes: 74,
    lines: 5
  };
  const logStream = new LogStream();

  logStream.on('data', function(data) {
    const actualSummary = JSON.parse(data.toString());
    delete actualSummary.time; // time varies per cpu
    try {
      assert.deepEqual(expectedSummary, actualSummary)
      console.log(`TEST: ${functionName}   PASS`);
    } catch(err) {
      console.log(`TEST: ${functionName}   FAIL`);
    }
  });

  logStream.write(dataToWrite);

})();