import { exec } from 'child_process';

export const deployTheCode = async () => {
  await execAsync('npm run build');

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
