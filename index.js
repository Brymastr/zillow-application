#!/usr/bin/env node
// $ tail -f mylogfile | myscript --verbose

const
  Summary = require('./summary'),
  LogStream = require('./LogStream'),
  ReportStream = require('./ReportStream'),
  fs = require('fs');


const options = {
  verbose: false,
  interval: 1000
};

// Set options based on cli arguments
for(let arg of process.argv.slice(2)) {
  if(arg === '--verbose')
    options.verbose = true;
  else if(arg.startsWith('--interval'))
    options.interval = parseInt(arg.match(/=(\d*)/)[1]);
}

const logStream = new LogStream();
const reportStream = new ReportStream(options);

process.stdin
  .pipe(logStream)
  .pipe(reportStream);

// Offer some different parameters
// Make a help text thing