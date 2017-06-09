#!/usr/bin/env node
// $ tail -f log.txt | node monitor --verbose

const
  Summary = require('./summary'),
  LogStream = require('./LogStream'),
  ReportStream = require('./ReportStream'),
  fs = require('fs');

const helpText = `
  -h, --help          show this help text
  --verbose           show extra information in reports
  --interval=[+]NUM   interval at which to write reports to stdout in milliseconds (default 1000)
`;

function parseArguments(args) {
  const options = {};
  for(let arg of args) {
    if(arg === '-h' || arg === '--help') {
      console.log(helpText);
      return null;
    } else if(arg === '-v' || arg === '--verbose')
      options.verbose = true;
    else if(arg.startsWith('--interval'))
      options.interval = parseInt(arg.match(/=(\d*)/)[1]);
  }
  return options;
}

function main() {
  const options = {
    verbose: false,
    interval: 1000
  };

  const args = parseArguments(process.argv.slice(2));
  if(args === null) return 0;
  Object.assign(options, args);

  const logStream = new LogStream();
  const reportStream = new ReportStream(options);

  process.stdin
    .pipe(logStream)
    .pipe(reportStream);
}

main();
