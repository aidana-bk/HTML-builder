const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  try {
    await fs.mkdir(path.join(__dirname, 'project-dist'), {
      recursive: true,
    });
  } catch (error) {
    console.error('Error: ', error);
    process.exit(1);
  }
}

buildPage();
