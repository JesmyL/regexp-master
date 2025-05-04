export type StrRegExpFlag = 'd' | 'g' | 'i' | 'm' | 's' | 'u' | 'y';
export type StrRegExpFlags = `${F<'d'>}${F<'g'>}${F<'i'>}${F<'m'>}${F<'s'>}${F<'u'>}${F<'y'>}`;

type F<F extends string> = F | '';
export type StrRegExp = `/${string}${string}/${StrRegExpFlags}`;

declare global {
  interface _GlobalScopedNamedRegExpMakerGeneratedTypes {
    ['/ /']: { $0: ' ' };
  }

  type IgnoreCaseRecord<T extends object> = {
    [K in keyof T]: T[K] extends string ? Uppercase<T[K]> | Lowercase<T[K]> : T[K];
  };
}

type RegTypes = _GlobalScopedNamedRegExpMakerGeneratedTypes;
export type NamedRegExpRegulars<Ret> = {
  regExp: RegExp;
  transform: (args: [string, ...(string | undefined)[]] | RegExpMatchArray) => Ret;
};

declare function makeNamedRegExp<R extends StrRegExp, Reg extends R extends keyof RegTypes ? R : keyof RegTypes>(
  stringRegExp: Reg,
  setLastIndexTo?: number,
): NamedRegExpRegulars<RegTypes[Reg]>;

declare function makeRegExp(reg: StrRegExp, setLastIndexTo?: number): RegExp;

export type PluginOptions = {
  srcDirName?: `/${string}`;
  collectClassCharactersMaxCount?: 'unlimited' | number;
};

declare function regExpMasterVitePlugin(options?: PluginOptions): {
  name: string;
};
