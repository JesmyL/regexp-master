import md5 from 'md5';
import { Options } from './types';

export class PluginUtils {
  private fs: typeof import('fs');

  dirName: string;
  generatesDir: string;

  bracketsSet = new Set(['`', '"', "'"]);

  knownFilesSet: Set<string>;
  knownFilesFilePath: string;

  constructor({ srcDir = 'src', __dirname, fs }: Options) {
    this.fs = fs;
    this.dirName = __dirname.replace(/\\/g, '/');
    this.generatesDir = `${this.dirName}/${srcDir}/regexp-master.gen` as const;
    this.knownFilesFilePath = `${this.generatesDir}/files.json` as const;

    let knownFiles: string[] = [];

    try {
      knownFiles = JSON.parse(`${fs.readFileSync(this.knownFilesFilePath)}`);
    } catch (_error) {
      if (!fs.existsSync(this.generatesDir)) {
        fs.mkdirSync(this.generatesDir);
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
    this.fs.writeFileSync(this.knownFilesFilePath, JSON.stringify(Array.from(this.knownFilesSet), null, 4));
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
