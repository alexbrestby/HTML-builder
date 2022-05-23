const fs = require('fs');
const path = require('path');
const srcFolder = path.join(__dirname, 'styles');
const distFile = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(distFile);

fs.readdir(srcFolder, { withFileTypes: true }, (err, files) => {
  for (let file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      const filePath = path.join(srcFolder, file.name);
      const readStream = fs.createReadStream(filePath, 'utf-8');
      let result = '';
      readStream.on('data', chunk => result += chunk);
      readStream.on('end', () => writeStream.write(result));
    }
  }
});