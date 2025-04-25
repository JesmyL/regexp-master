import fs from 'fs';

export type StrRegExp = `/${string}${string}/${'d' | ''}${'g' | ''}${'i' | ''}${'m' | ''}${'s' | ''}${'u' | ''}${
  | 'y'
  | ''}`;

declare global {
  interface _GlobalScopedNamedRegExpMakerGeneratedTypes {
    ['/ /']: { $0: ' ' };
  }
}

type RegTypes = _GlobalScopedNamedRegExpMakerGeneratedTypes;
export type Regulars<Ret> = { regExp: RegExp; transform: (args: [string, ...(string | undefined)[]]) => Ret };

declare function makeNamedRegExp<R extends StrRegExp, Reg extends R extends keyof RegTypes ? R : keyof RegTypes>(
  stringRegExp: Reg,
  setLastIndexTo?: number,
): Regulars<RegTypes[Reg]>;

declare function makeRegExp(reg: StrRegExp, setLastIndexTo?: number): RegExp;

declare function regExpMasterVitePlugin(options: { srcDir?: string; fs: typeof fs; __dirname: string }): {
  name: string;
};
