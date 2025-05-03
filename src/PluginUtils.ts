import fsm from 'fs';
import md5 from 'md5';
import nodeFs from 'node:fs';
import path from 'path';
import { Options } from './types';

console.log(import.meta, import.meta.dirname);

const __filename = import.meta.url;
const __dirname = path.dirname(__filename);

export class PluginUtils {
  private fs: typeof import('fs');

  dirName: string;
  generatesDir: string;

  bracketsSet = new Set(['`', '"', "'"]);

  knownFilesSet: Set<string>;
  knownFilesFilePath: string;

  constructor({ srcDirName = 'src', fs }: Options) {
    try {
      console.log('nodeFs.readdirSync', nodeFs.readdirSync('.'));
    } catch (e) {
      console.error('err', 1);
    }

    try {
      console.log('fsm.readdirSync', fsm.readdirSync('.'));
    } catch (e) {
      console.error('err', 2);
    }

    try {
      console.log('path.dirname(.)', path.dirname('.'));
    } catch (e) {
      console.error('err', 3);
    }

    try {
      console.log('__dirname', __dirname);
    } catch (e) {
      console.error('err', 4);
    }

    try {
      console.log('__filename', __filename);
    } catch (e) {
      console.error('err', 5);
    }

    this.fs = nodeFs;
    this.dirName = __dirname.replace(/\\/g, '/');
    if (this.dirName.endsWith(`/${srcDirName}`)) this.dirName = this.dirName.slice(0, -(srcDirName.length + 1));

    this.generatesDir = `${this.dirName}/${srcDirName}/regexp-master.gen` as const;
    this.knownFilesFilePath = `${this.generatesDir}/files.json` as const;

    console.log([this.dirName, this.generatesDir, this.knownFilesFilePath]);

    let knownFiles: string[] = [];

    try {
      knownFiles = JSON.parse(`${this.fs.readFileSync(this.knownFilesFilePath)}`);
    } catch (_error) {
      if (!this.fs.existsSync(this.generatesDir)) {
        this.fs.mkdirSync(this.generatesDir);
      }
    }

    this.knownFilesSet = new Set(knownFiles);
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
