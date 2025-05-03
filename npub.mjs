import { exec } from 'child_process';
import fs from 'fs';

const copyFile = (fileName, dir) => {
  fs.writeFileSync(`./build/${fileName}`, fs.readFileSync(`${dir}${fileName}`));
};

export const deployTheCode = async () => {
  await execAsync('npm run build');

  copyFile('model.d.ts', './src/');
  copyFile('README.md', './');

  if (~process.argv.indexOf('--major')) {
    await execAsync('npm version major');
  } else if (~process.argv.indexOf('--minor')) {
    await execAsync('npm version minor');
  } else {
    await execAsync('npm version patch');
  }

  await execAsync('npm publish');
};

const execAsync = stringCommand => {
  return new Promise((res, rej) =>
    exec(stringCommand, error => {
      if (error) rej(error);
      else res();
    }).on('message', message => console.info(message)),
  );
};

deployTheCode();
