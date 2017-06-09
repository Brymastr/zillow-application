const fs = require('fs');
const corpus = `abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789 ;:/?!'"`;

const stream = fs.createWriteStream('log.txt');

/**
 * Write random text to a log file at a random interval
 */
function writeLog() {
  const interval = randomInt(900, 200);
  setTimeout(() => {
    const log = buildLog();
    stream.write(log)
    writeLog();
  }, interval)
}

function buildLog() {
  const length = randomInt(500);
  let text = '';
  for(let i = 0; i < length; i++) 
    text += corpus[randomInt(corpus.length)];
  return text + '\n';
}

function randomInt(max, min = 0) {
  return Math.floor(Math.random() * max + min);
}

writeLog();