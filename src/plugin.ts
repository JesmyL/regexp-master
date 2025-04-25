import fs from 'fs';
import md5 from 'md5';
import { makeRegExp } from './makeRegExp';
import { prepareNameMakedRegExp } from './utils';

export type RegExpMasterVitePlugin = (options: { srcDir?: string; fs: typeof fs; __dirname: string }) => {
  name: string;
};

export const regExpMasterVitePlugin: RegExpMasterVitePlugin = ({ srcDir = 'src', fs, __dirname }) => {
  const bracketsSet = new Set(['`', '"', "'"]);
  const dirName = __dirname.replace(/\\/g, '/');
  const generatesDir = `${dirName}/${srcDir}/regexp-master.gen` as const;
  const knownFilesFilePath = `${generatesDir}/files.json` as const;

  const fillTypes = (types: string[], isOptionalParam: boolean, insertableLiteralContents: Record<string, string>) =>
    types.length === 0
      ? ''
      : types
          .sort()
          .map(
            key =>
              `${key}${isOptionalParam ? '?' : ''}: ${
                insertableLiteralContents[key] === undefined ? 'string' : insertableLiteralContents[key]
              };`,
          )
          .join(' ');

  let knownFiles: string[] = [];

  try {
    knownFiles = JSON.parse('' + fs.readFileSync(knownFilesFilePath));
  } catch (_error) {
    if (!fs.existsSync(generatesDir)) {
      fs.mkdirSync(generatesDir);
    }
  }
  const knownFilesSet = new Set(knownFiles);

  const saveKnownFiles = (_result: boolean | Set<string>) => {
    fs.writeFileSync(knownFilesFilePath, JSON.stringify(Array.from(knownFilesSet), null, 4));
  };

  const removeFile = (generatedTypeFilePath: string, fileSrc: string) => {
    try {
      fs.unlinkSync(generatedTypeFilePath);
    } catch (_error) {
      //
    }
    if (knownFilesSet.has(fileSrc)) saveKnownFiles(knownFilesSet.delete(fileSrc));
  };

  const slashedBracketsReplacer = (all: string, $1: string, $2: string) =>
    all.length % 2 ? `${$1}\\\\${$2}` : $2 === '`' ? all : `${$1.slice(0, -1)}${$2}`;

  const readFileAsync = (src: string) => {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(src, (error, contentBuffer) => {
        if (error) reject(error);
        else resolve('' + contentBuffer);
      });
    });
  };

  function filterInclusiveNames(this: Set<string>, name: string) {
    const isInclusive = !this.has(name);
    this.delete(name);
    return isInclusive;
  }

  const unreadableUnionsSet = new Set(['^', '$', '']);
  const filterUakeReadableUnions = (text: string) => !unreadableUnionsSet.has(text);
  const makeReadableUnions = (text: string) => {
    const s = text.split(makeRegExp('/\\|/g'));
    const f = s.filter(filterUakeReadableUnions);

    return (s.length !== f.length && f.length ? "' | '" : '') + f.join("' | '");
  };

  //////////////////
  // region: opts //
  //////////////////

  return {
    name: 'regExpMasterVitePlugin',
    enforce: 'pre' as const,
    watchChange: async (src: string, change: { event: 'create' | 'update' | 'delete' }) => {
      if (!(src.endsWith('.tsx') || src.endsWith('.ts') || src.endsWith('.js') || src.endsWith('.jsx'))) return;

      const fileSrc = src.slice(dirName.length + 1);
      const modelFilePath = `${generatesDir}/${md5(fileSrc)}.ts`;

      if (change.event === 'delete') {
        removeFile(modelFilePath, fileSrc);
        return;
      }

      const content = await readFileAsync(src);

      const importNameMatch = content.match(
        makeRegExp(`/import \\{\\s*[\\w\\W]*?makeNamedRegExp(?:\\s+as\\s+([\\w_$]+))?[\\w\\W]*?}\\s*from/`),
      );

      if (importNameMatch === null) {
        removeFile(modelFilePath, fileSrc);
        return;
      }

      try {
        const splits = content.split(
          makeRegExp(
            `/${importNameMatch[1] ?? 'makeNamedRegExp'}\\(\\s*(?:\\s*(?:\\/{2,}.*|\\/\\*[\\w\\W]+?\\*\\/)\\s*\n*)*/gm`,
          ),
        );
        const nameErrors: string[] = [];
        const generatedRegsSet = new Set<string>();

        const types: {
          typeKeyRegStr: string;
          requiredTypes: string[];
          optionalTypes: string[];
          nameErrors: string[];
          duplicateNameErrors: string[];
          insertableLiteralContents: Record<string, string>;
        }[] = [];

        for (let i = 1; i < splits.length; i++) {
          const bracket = splits[i][0];
          if (!bracketsSet.has(bracket)) throw `Pass incorrect string regexp`;

          const findFreeBracketReg = makeRegExp(`/(?<!\\\\)\\${bracket}/`);
          const index = splits[i].slice(1).search(findFreeBracketReg);
          let userWritedRegStr = splits[i]?.slice(1, index + 1);

          let typeKeyRegStr = `\`${
            bracket === '`'
              ? userWritedRegStr
              : userWritedRegStr.replace(makeRegExp('/(\\\\*?)\\\\([`\'"])/g'), slashedBracketsReplacer)
          }\``;

          if (bracket === '`') {
            let replacement = '${string}';
            const reg = makeRegExp('/(\\\\*)\\$\\{[^}]+\\}/gi');

            const replacer = (all: string, slashes: string) => {
              return slashes.length % 2 ? all : replacement;
            };

            typeKeyRegStr = typeKeyRegStr.replace(reg, replacer);
            replacement = '\\\\w+';
            userWritedRegStr = userWritedRegStr.replace(reg, replacer);
          }

          if (generatedRegsSet.has(typeKeyRegStr)) continue;
          generatedRegsSet.add(typeKeyRegStr);

          let isNeedReplace = true;
          const optionalTypes: string[] = [];
          const requiredTypes: string[] = ['$0'];
          const registeredNames: string[] = ['$0'];
          const insertableLiteralContents: Record<string, string> = {};
          const { positionedNames, positions, perparedRegStr, restContents } = prepareNameMakedRegExp(
            userWritedRegStr as never,
            nameErrors,
          );

          if (nameErrors.length === 0) {
            let replacedPerparedRegStr = perparedRegStr
              .replace(makeRegExp('/\\\\\\\\[()]/g'), '')
              .replace(makeRegExp('/[^)*]\\?/g'), '')
              .replace(makeRegExp('/[^()*?]/g'), '');

            while (isNeedReplace) {
              isNeedReplace = false;
              replacedPerparedRegStr = replacedPerparedRegStr.replace(
                makeRegExp('/(?<!\\\\)\\(((?:(?!\\\\)[^(])*?)\\)\\*?\\??/g'),
                (all, $1) => {
                  isNeedReplace = true;
                  return all.endsWith('?') || all.endsWith('*') ? `[${$1}]` : '0' + ($1 || '');
                },
              );
            }

            isNeedReplace = true;

            replacedPerparedRegStr = replacedPerparedRegStr.replace(makeRegExp('/[^[\\]0]/g'), '');

            while (isNeedReplace) {
              isNeedReplace = false;

              replacedPerparedRegStr = replacedPerparedRegStr.replace(makeRegExp('/\\[[01]*\\]/g'), all => {
                isNeedReplace = true;
                return '1'.repeat(all.length - 1);
              });
            }

            for (const position of positions) {
              const registeredName = position in positionedNames ? positionedNames[position] : `$${position}`;

              registeredNames.push(registeredName);
              (replacedPerparedRegStr[position - 1] === '1' ? optionalTypes : requiredTypes).push(registeredName);
            }

            for (const key in restContents) {
              const restContentParts: [string, ...(string | undefined)[]] = restContents[key]
                .replace(makeRegExp('/\\\\{2}/g'), '\\')
                .split(makeRegExp('/((?!\\\\)[)])/'))[0]
                .split(
                  makeRegExp(
                    '/(\\[(?:\\d[-\\d]*\\d)?][?*]?|\\\\*\\[|\\+|(?:\\\\+[wd][?*]?)|.[?*]|.\\{(?:0|),\\d+\\}|{\\d+,?\\d?\\}|\\(|\\.)/',
                  ),
                  4,
                ) as never;

              const isFirstNumber =
                restContentParts[1] === '\\\\d' ||
                (restContentParts[1] && makeRegExp('/\\[\\d[-\\d]*\\d]/').test(restContentParts[1]));
              const optionalNumber =
                restContentParts[1] && (restContentParts[1].endsWith('?') || restContentParts[1].endsWith('*'))
                  ? " | ''"
                  : '';

              insertableLiteralContents[key] =
                restContentParts.length === 1
                  ? `'${makeReadableUnions(restContentParts[0].replace(makeRegExp("/'/g"), "\\'"))}'`
                  : `\`${restContentParts[0].replace(makeRegExp('/`/g'), '\\`')}\${${
                      isFirstNumber
                        ? !restContentParts[2] && !restContentParts[3]
                          ? `number${optionalNumber}`
                          : `number${optionalNumber}}\${string`
                        : 'string'
                    }}\``;

              if (insertableLiteralContents[key] === '`${string}`') insertableLiteralContents[key] = 'string';
            }
          }

          types.push({
            typeKeyRegStr,
            optionalTypes,
            requiredTypes,
            insertableLiteralContents,
            nameErrors,
            duplicateNameErrors: registeredNames.filter(filterInclusiveNames, new Set(registeredNames)),
          });
        }

        if (!types.length) {
          removeFile(modelFilePath, fileSrc);
          return;
        }

        if (!knownFilesSet.has(fileSrc)) saveKnownFiles(knownFilesSet.add(fileSrc));

        fs.writeFile(
          modelFilePath,
          `interface _GlobalScopedNamedRegExpMakerGeneratedTypes extends\n  ${types
            .map(props => {
              let typeContent = '';

              if (props.duplicateNameErrors.length !== 0)
                typeContent = `'Duplicate name${
                  props.duplicateNameErrors.length === 1
                    ? ` <${props.duplicateNameErrors[0]}>`
                    : `s: <${props.duplicateNameErrors.join('>, <')}>`
                }'`;
              else if (props.nameErrors.length !== 0)
                typeContent = `'Invalid group name${
                  props.nameErrors.length === 1 ? ` <${props.nameErrors[0]}>` : `s: <${props.nameErrors.join('>, <')}>`
                }'`;
              else
                typeContent = `{ ${fillTypes(props.requiredTypes, false, props.insertableLiteralContents)} ${fillTypes(
                  props.optionalTypes,
                  true,
                  props.insertableLiteralContents,
                )} }`;

              return `Record<${props.typeKeyRegStr}, ${typeContent}>`;
            })
            .join(',\n  ')}\n{ '': ''; }\n`,
          () => {},
        );
      } catch (error) {
        console.error(error);
      }
    },
  };
};
