import { StrRegExp } from '../types/model';
import { makeRegExp } from './makeRegExp';
import { TransformProcess } from './TransformProcess';

const numbersSet = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
const findNamedGroupsReg = makeRegExp(`/(\\\\*)\\((?:\\?(?:<([\\w$_]+)>|<()>|([=!:ims])))?/g`);

export const prepareNameMakedRegExp = (reg: StrRegExp, errorsStore?: string[]) => {
  let openPosition = 0;
  const positions: number[] = [];
  const positionedNames: Record<number, string> = {};
  const restContents: Record<string, string> = {};

  const perparedRegStr = reg.replace(
    findNamedGroupsReg,
    (
      all: string,
      slashes: string,
      name: string | undefined,
      emptyName: string | undefined,
      key: string | undefined,
      index: number,
      restContent: string,
    ) => {
      if (TransformProcess.checkIs4xSlashes(slashes)) return all;
      if (key !== undefined && key.match(makeRegExp(`/^[=!<:ims]/`))) return all;

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
