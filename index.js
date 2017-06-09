#!/usr/bin/env node
// $ tail -f mylogfile | myscript --verbose

const
  Summary = require('./summary'),
  LogStream = require('./LogStream'),
  ReportStream = require('./ReportStream'),
  fs = require('fs');


// process.stdin.resume();
// process.stdin.setEncoding('utf8');

const logStream = new LogStream();
const reportStream = new ReportStream();

process.stdin.pipe(logStream).pipe(reportStream);

// Offer some different parameters
// Make a help text thing