const fs = require('fs').promises;
const path = require('path');

const secretForlderPath = path.join(__dirname, 'secret-folder');

async function getFilesInFolder(fPath) {
  try {
    const files = await fs.readdir(fPath, { withFileTypes: true });
    console.log(files);
  } catch (error) {
    console.error('Error reading directory:', error.message);
    process.exit(1);
  }
}

getFilesInFolder(secretForlderPath);
