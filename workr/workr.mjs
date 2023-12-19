// workr.js
//
//

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import chalk from 'chalk';


const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function setTerminalTitle(title) {
    process.stdout.write(`\x1b]0;${title}\x07`);
}

// Function to simulate a build process
function simulateBuild() {
    console.log(chalk.blue('Starting build process...'));
    // Simulate build duration
    setTimeout(() => {
        console.log(chalk.blue('Build completed.'));
    }, 2000);
}

function replaceDateInLine(line) {
  return line.replace(/{{CURRENT_DATE}}/g, new Date().toISOString());
}

function processLine(line) {
  let color = chalk.white;

  if (line.includes('ERROR')) {
    color = chalk.red;
  } else if (line.includes('WARN')) {
    color = chalk.yellow;
  } else if (line.includes('INFO')) {
    color = chalk.green;
  } else if (line.includes('DEBUG')) {
    color = chalk.blue;
  }

  console.log(color(line));
}

const getDelayForLine = (line) => {
    if (line.includes('ERROR')) return randomDelay(800, 1000); // Slower for errors
    if (line.includes('DEBUG')) return randomDelay(100, 300);  // Faster for debug
    return randomDelay(200, 600); // Default for other types
};

async function readFileLineByLine(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    processLine(replaceDateInLine(line)); // Process each line
    await new Promise(resolve => setTimeout(resolve, getDelayForLine(line)));
  }

  rl.close();
  fileStream.close();

  readFileLineByLine(filePath);
}

function main() {
  setTerminalTitle('debug');
  const logFilePath = path.join('./', 'sample.txt');
  readFileLineByLine(logFilePath);

  // Simulate a build every 5 minutes
  setInterval(simulateBuild, 300000);
}

main();
