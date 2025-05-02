namespace N06c8e349bfc7e6d237cd1e4c26d66ff7_1 {
  type T$0 = `${U1 | ''}${T$1}${U2 | ''}${Ta}${string}${U3}${T$3}${U4}{}${T$4}${T$5}`;
  type T$1 = ``;
  type Ta = ` `;
  type T$3 = `888`;
  type T$4 = `${Ta}`;
  type T$5 = `${Ta | ''}`;
  type U1 = undefined & `&&`;
  type U2 = undefined & ` %%%`;
  type U3 = ``;
  type U4 = ` `;

  export interface I extends Record<
    `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888)(?: ){}(\\2)(\\<a>?)/`,
    {
      $0: T$0;
      $1: T$1;
      a: Ta;
      $3: T$3;
      $4: T$4;
      $5: T$5
    }
  > { '': '' }
}

namespace N06c8e349bfc7e6d237cd1e4c26d66ff7_2 {
  type T$0 = `${U1}${T$1}c`;
  type T$1 = `b`;
  type U1 = `a` | `${T$1 | ''}`;

  export interface I extends Record<
    `/(?:a|(b))\\1c/`,
    {
      $0: T$0;
      $1?: T$1
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N06c8e349bfc7e6d237cd1e4c26d66ff7_1.I,
    N06c8e349bfc7e6d237cd1e4c26d66ff7_2.I {
    '': ''
}