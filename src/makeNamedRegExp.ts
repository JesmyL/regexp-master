import { makeRegExp } from './makeRegExp';
import { RegTypes, Regulars, StrRegExp } from './model';
import { prepareNameMakedRegExp } from './utils';

const regReps: Record<string, Regulars<object>> = {};

export const makeNamedRegExp = <R extends StrRegExp, Reg extends R extends keyof RegTypes ? R : keyof RegTypes>(
  stringRegExp: Reg,
  setLastIndexTo?: number,
): Regulars<RegTypes[Reg]> => {
  if (regReps[stringRegExp] === undefined) {
    const { positionedNames, perparedRegStr, positions } = prepareNameMakedRegExp(stringRegExp as never);

    regReps[stringRegExp] = {
      regExp: makeRegExp(perparedRegStr as never),
      transform: args => {
        const reps: Record<string, string | undefined> = { $0: args[0] };

        for (const pos of positions) {
          if (pos in positionedNames) reps[positionedNames[pos]] = args[pos];
          else reps[`$${pos}`] = args[pos];
        }

        return reps;
      },
    };
  }

  if (setLastIndexTo !== undefined) regReps[stringRegExp].regExp.lastIndex = setLastIndexTo;

  return regReps[stringRegExp] as never;
};
