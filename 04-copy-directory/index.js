const fs = require('fs');
const path = require('path');
const oldDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');

function copyDir(oldDir, newDir) {
  fs.rm(newDir, { force: true, recursive: true }, () => {

    fs.mkdir(newDir, { recursive: true }, () => { });

    fs.readdir(oldDir, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log('Error:', err.message);
      } else {
        files.forEach(file => {
          if (file.isFile()) {
            fs.copyFile(path.join(oldDir, file.name), path.join(newDir, file.name), () => { });
          } else if (file.isDirectory()) {
            copyDir(path.join(oldDir, file.name), path.join(newDir, file.name));
          }
        });
      }
    });
  });
}

copyDir(oldDir, newDir);
