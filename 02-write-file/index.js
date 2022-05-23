const fs = require('fs');
const path = require('path');
const { stdin, exit } = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'input.txt'), {
  'flags': 'a', 'encoding': 'utf-8',
});

console.log('Type your text: ');
stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    console.log('bye');
    exit();
  } else {
    writeStream.write(chunk);
  }
});

process.on('SIGINT', () => {
  console.log('\nbye');
  exit();
});




