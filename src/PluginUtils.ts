import md5 from 'md5';
import fsp from 'node:fs/promises';
import { Options } from './types';

export class PluginUtils {
  private fs: typeof fsp;

  dirName: string = '.';
  generatesDir: string = '.';

  bracketsSet = new Set(['`', '"', "'"]);

  knownFilesSet: Set<string> = new Set();
  knownFilesFilePath: string = './files.json';

  constructor({ srcDirName = 'src', fs }: Options) {
    console.log('fsp', fsp);
    console.log('keys(fsp)', Object.keys(fsp));
    console.log('fsp.default', Object.keys(fsp?.default || { nonono: 'NNOO' }));
    console.log('process.cwd()', process.cwd());

    this.fs = fsp;
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
    this.fs.writeFile(this.knownFilesFilePath, JSON.stringify(Array.from(this.knownFilesSet).sort(), null, 4));
  };

  fun = () => {};
  writeFileContent = (modelFilePath: string, content: string) => {
    this.fs.writeFile(modelFilePath, content);
  };

  removeKnownFile = (generatedTypeFilePath: string, fileSrc: string) => {
    try {
      this.fs.unlink(generatedTypeFilePath);
    } catch (_error) {
      //
    }
    if (this.knownFilesSet.has(fileSrc)) this.saveKnownFiles(this.knownFilesSet.delete(fileSrc));
  };

  readFile = async (src: string) => {
    return '' + (await this.fs.readFile(src));
  };

  importMatcherReg = /import \{\s*[\w\W]*?makeNamedRegExp(?:\s+as\s+([\\w_$]+))?[\w\W]*?}\s*from/;

  matchImport = (content: string) => content.match(this.importMatcherReg);

  takeFilePaths = (src: string) => {
    const fileSrc = src.slice(this.dirName.length + 1);

    return { fileSrc, modelFilePath: `${this.generatesDir}/${md5(fileSrc)}.ts` };
  };
}
