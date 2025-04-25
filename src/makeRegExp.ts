import { StrRegExp } from './model';

const regs: Record<string, RegExp> = {};

export function makeRegExp(reg: StrRegExp, setLastIndexTo?: number) {
  if (regs[reg] === undefined) {
    const errorText = `Invalid arg passed in ${makeRegExp.name}(${reg})`;
    if (reg.length < 3 || !reg.startsWith('/')) throw errorText;
    try {
      regs[reg] = new RegExp(reg.slice(1, reg.lastIndexOf('/')), reg.slice(reg.lastIndexOf('/') + 1));
    } catch (_e) {
      throw errorText;
    }
  }

  if (setLastIndexTo !== undefined) regs[reg].lastIndex = setLastIndexTo;

  return regs[reg];
}
