import { StrRegExp } from './model';

const numbersSet = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
const findNamedGroupsReg = /\\?\((?:\?<([\w$_]+)>|\?<()>)?/g;

export const prepareNameMakedRegExp = (reg: StrRegExp, errorsStore?: string[]) => {
  let openPosition = 0;
  const positions: number[] = [];
  const positionedNames: Record<number, string> = {};
  const restContents: Record<string, string> = {};

  const perparedRegStr = reg.replace(
    findNamedGroupsReg,
    (all: string, name: string | undefined, emptyName: string | undefined, index: number, restContent: string) => {
      if (all.startsWith('\\')) return all;

      openPosition++;
      positions.push(openPosition);

      if (emptyName !== undefined) {
        if (errorsStore === undefined) throw `Incorrect StrRegExp name empty <> in makeNamedRegExp`;
        else errorsStore.push('');
      }

      if (name !== undefined && name !== '') {
        if (name === '' || numbersSet.has(name[0])) {
          if (errorsStore === undefined) throw `Incorrect StrRegExp name <${name}> in makeNamedRegExp`;
          else errorsStore.push(name);
        }
        positionedNames[openPosition] = name;
        if (typeof restContent === 'string') restContents[name] = restContent.slice(index + all.length);
      } else if (typeof restContent === 'string') restContents[openPosition] = restContent.slice(index + all.length);

      return '(';
    },
  );

  return { perparedRegStr, positions, positionedNames, restContents };
};
