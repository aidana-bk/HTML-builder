const fs = require('fs');
const path = require('path');
const readline = require('readline');

const outputPath = path.join(__dirname, 'text.txt');
const ws = fs.createWriteStream(outputPath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter text to write to file. To exit use Ctrl+C or type "exit"');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Process of writing stopped! Bye!');
    closeAll();
    return;
  }
  ws.write(input + '\n');
});

rl.on('SIGINT', () => {
  console.log('Process of writing stopped! Bye!');
  closeAll();
});

function closeAll() {
  ws.end();
  rl.close();
  process.exit(0);
}

ws.on('error', (err) => {
  console.error('Error with write: ', err.message);
  closeAll();
});
