const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');

// fs.readFile(filePath, 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

const stream = fs.createReadStream(filePath, 'utf8');

stream.pipe(process.stdout);

stream.on('error', (error) => {
  console.error('Error reading file:', error.message);
  process.exit(1);
});
