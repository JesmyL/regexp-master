import md5 from 'md5';
import nodeFs from 'node:fs';
import * as fsp from 'node:fs/promises';
import { Options } from './types';

import nodePath from 'node:path';
import nodeUrl from 'node:url';

console.log('fsp.writeFile', fsp.writeFile);
console.log('fsp.readFile', fsp.readFile);
console.log('nodePath', nodePath);
console.log('nodeUrl', nodeUrl);
console.log('========================================================================');
console.log('fsp.keys', Object.keys(fsp).slice(0, 20));
console.log('nodeUrl.keys', Object.keys(nodeUrl).slice(0, 20));
console.log('nodePath.keys', Object.keys(nodePath).slice(0, 20));

export class PluginUtils {
  private fs: typeof import('fs');

  dirName: string = '.';
  generatesDir: string = '.';

  bracketsSet = new Set(['`', '"', "'"]);

  knownFilesSet: Set<string> = new Set();
  knownFilesFilePath: string = './files.json';

  constructor({ srcDirName = 'src', fs }: Options) {
    this.fs = nodeFs;
    // this.dirName = __dirname.replace(/\\/g, '/');
    // if (this.dirName.endsWith(`/${srcDirName}`)) this.dirName = this.dirName.slice(0, -(srcDirName.length + 1));

    // this.generatesDir = `${this.dirName}/${srcDirName}/regexp-master.gen` as const;
    // this.knownFilesFilePath = `${this.generatesDir}/files.json` as const;

    // console.log([this.dirName, this.generatesDir, this.knownFilesFilePath]);

    // let knownFiles: string[] = [];

    // try {
    //   knownFiles = JSON.parse(`${this.fs.readFileSync(this.knownFilesFilePath)}`);
    // } catch (_error) {
    //   if (!this.fs.existsSync(this.generatesDir)) {
    //     this.fs.mkdirSync(this.generatesDir);
    //   }
    // }

    // this.knownFilesSet = new Set(knownFiles);
  }

  checkIsInvalidSrcToTransform = (src: string) =>
    !(src.endsWith('.tsx') || src.endsWith('.ts') || src.endsWith('.js') || src.endsWith('.jsx'));

  saveKnownFile = (fileSrc: string) => {
    if (!this.knownFilesSet.has(fileSrc)) this.saveKnownFiles(this.knownFilesSet.add(fileSrc));
  };

  saveKnownFiles = (_result: boolean | Set<string>) => {
    this.fs.writeFileSync(this.knownFilesFilePath, JSON.stringify(Array.from(this.knownFilesSet).sort(), null, 4));
  };

  fun = () => {};
  writeFileContent = (modelFilePath: string, content: string) => {
    this.fs.writeFile(modelFilePath, content, this.fun);
  };

  removeKnownFile = (generatedTypeFilePath: string, fileSrc: string) => {
    try {
      this.fs.unlinkSync(generatedTypeFilePath);
    } catch (_error) {
      //
    }
    if (this.knownFilesSet.has(fileSrc)) this.saveKnownFiles(this.knownFilesSet.delete(fileSrc));
  };

  readFileAsync = (src: string) => {
    return new Promise<string>((resolve, reject) => {
      this.fs.readFile(src, (error, contentBuffer) => {
        if (error) reject(error);
        else resolve(`${contentBuffer}`);
      });
    });
  };

  importMatcherReg = /import \{\s*[\w\W]*?makeNamedRegExp(?:\s+as\s+([\\w_$]+))?[\w\W]*?}\s*from/;

  matchImport = (content: string) => content.match(this.importMatcherReg);

  takeFilePaths = (src: string) => {
    const fileSrc = src.slice(this.dirName.length + 1);

    return { fileSrc, modelFilePath: `${this.generatesDir}/${md5(fileSrc)}.ts` };
  };
}
