const fs = require('fs').promises;
const path = require('path');

const secretForlderPath = path.join(__dirname, 'secret-folder');

async function getFilesInFolder(fPath) {
  try {
    const files = await fs.readdir(fPath, { withFileTypes: true });
    for (let file of files) {
      const filePath = path.join(fPath, file.name);
      const stats = await fs.stat(filePath);
      if (!stats.isFile()) {
        continue;
      }
      const [fileName, fileExtension] = file.name.split('.');
      const fileSize = stats.size / 1024;
      console.log(`${fileName} - ${fileExtension} - ${fileSize.toFixed(3)}kb`);
    }
  } catch (error) {
    console.error('Error reading directory:', error.message);
    process.exit(1);
  }
}

getFilesInFolder(secretForlderPath);
