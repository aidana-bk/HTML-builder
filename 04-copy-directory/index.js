const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir);

    await Promise.all(
      files.map(async (file) => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        try {
          const stats = await fs.stat(sourcePath);
          if (stats.isFile()) {
            await fs.copyFile(sourcePath, targetPath);
          }
        } catch (err) {
          console.error('Error copying file:', err.message);
        }
      }),
    );
  } catch (error) {
    console.error('Error copying directory:', error.message);
    process.exit(1);
  }
}

copyDir();
