const fs = require('fs').promises;
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
// const outputDir = path.join(__dirname, 'project-dist');
// const finalFile = path.join(outputDir, 'bundle.css');

async function mergeStyle() {
  try {
    const files = await fs.readdir(stylesDir, { withFileTypes: true });
    for (let file of files) {
      const filePath = path.join(stylesDir, file.name);
      const stats = await fs.stat(filePath);
      if (!stats.isFile()) {
        continue;
      }
      const [, fileExtension] = file.name.split('.');
      if (fileExtension != 'css') {
        continue;
      }
      console.log(file.name);
    }
  } catch (error) {
    console.log('error occured while styles merge process: ', error);
  }
}

mergeStyle();
