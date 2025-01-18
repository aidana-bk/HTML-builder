const fs = require('fs').promises;
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const finalFile = path.join(outputDir, 'bundle.css');

async function mergeStyle() {
  const styleContent = [];
  try {
    const files = await fs.readdir(stylesDir, { withFileTypes: true });
    await fs.mkdir(outputDir, { recursive: true });

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
      try {
        const filePath = path.join(stylesDir, file.name);
        const content = await fs.readFile(filePath, 'utf8');
        styleContent.push(content);
      } catch (err) {
        console.error('Error reading file:', err.message);
      }
    }
    // console.log(styleContent);
  } catch (error) {
    console.log('error occured while styles merge process: ', error);
  }
  const bundleContent = styleContent.join('\n');
  await fs.writeFile(finalFile, bundleContent, 'utf8');
}

mergeStyle();
