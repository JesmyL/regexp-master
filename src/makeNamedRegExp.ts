import { NamedRegExpRegulars, makeNamedRegExp as maker } from '../types/model';
import { makeRegExp } from './makeRegExp';
import { prepareNameMakedRegExp } from './prepareNameMakedRegExp';
import { TransformProcess } from './TransformProcess';

const regReps: Record<string, NamedRegExpRegulars<object>> = {};

export const makeNamedRegExp: typeof maker = (stringRegExp, setLastIndexTo) => {
  if (regReps[stringRegExp] === undefined) {
    const { positionedNames, perparedRegStr, positions } = prepareNameMakedRegExp(stringRegExp as never, undefined);
    let namesToPositions: Record<string, number> | null = null;

    const regStr = perparedRegStr.replace(makeRegExp('/(\\\\+)k<([$_a-z][\\w$_]*)>/gi'), (all, slashes, name) => {
      if (namesToPositions === null) {
        namesToPositions = {};
        Object.entries(positionedNames).forEach(([key, value]) => (namesToPositions![value] = +key));
      }

      if (TransformProcess.checkIs4xSlashes(slashes)) return all;

      return `${slashes}${namesToPositions[name]}`;
    });

    regReps[stringRegExp] = {
      regExp: makeRegExp(regStr as never),
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
