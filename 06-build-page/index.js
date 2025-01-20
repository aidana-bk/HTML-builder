const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  try {
    await fs.mkdir(path.join(__dirname, 'project-dist'), {
      recursive: true,
    });
    await buildTemplate();
    await buildStyle();
    await copyAssets();
  } catch (error) {
    console.error('Error: ', error);
    process.exit(1);
  }
}

async function buildTemplate() {
  try {
    const outputDir = path.join(__dirname, 'project-dist');
    await fs.mkdir(outputDir, { recursive: true });
    let template = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf8',
    );
    let startIdx = template.indexOf('{{');
    while (startIdx !== -1) {
      const endIdx = template.indexOf('}}', startIdx);
      if (endIdx === -1) break;
      const componentName = template.slice(startIdx + 2, endIdx).trim();
      try {
        const componentPath = path.join(
          __dirname,
          'components',
          `${componentName}.html`,
        );
        const componentContent = await fs.readFile(componentPath, 'utf8');
        template =
          template.slice(0, startIdx) +
          componentContent +
          template.slice(endIdx + 2);
      } catch (error) {
        console.error('Error reading component:', error.message);
      }
      startIdx = template.indexOf('{{');
    }
    await fs.writeFile(path.join(outputDir, 'index.html'), template, 'utf8');
  } catch (error) {
    console.error('Error creating template:', error.message);
  }
}

async function buildStyle() {
  try {
    const styleFiles = await fs.readdir(path.join(__dirname, 'styles'));
    const styleContents = [];

    for (const file of styleFiles) {
      if (path.extname(file) === '.css') {
        const content = await fs.readFile(
          path.join(__dirname, 'styles', file),
          'utf8',
        );
        styleContents.push(content);
      }
    }

    await fs.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      styleContents.join('\n'),
      'utf8',
    );
  } catch (error) {
    console.error('Error creating style:', error.message);
  }
}

async function copyAssets() {
  try {
    const sourceDir = path.join(__dirname, 'assets');
    const targetDir = path.join(__dirname, 'project-dist', 'assets');
    await fs.mkdir(targetDir, { recursive: true });
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    for (const elem of entries) {
      const sourcePath = path.join(sourceDir, elem.name);
      const targetPath = path.join(targetDir, elem.name);
      if (elem.isDirectory()) {
        await copyAssets(sourcePath, targetPath);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  } catch (error) {
    throw new Error('Assets copying failed: ', error.message);
  }
}

buildPage();
