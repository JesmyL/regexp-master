import { makeRegExp } from './makeRegExp';
import { NamedRegExpRegulars, makeNamedRegExp as maker } from './model';
import { prepareNameMakedRegExp } from './prepareNameMakedRegExp';

const regReps: Record<string, NamedRegExpRegulars<object>> = {};

export const makeNamedRegExp: typeof maker = (stringRegExp, setLastIndexTo) => {
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
