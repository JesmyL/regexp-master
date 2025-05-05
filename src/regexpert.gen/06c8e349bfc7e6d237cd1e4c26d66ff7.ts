/* eslint-disable @typescript-eslint/no-namespace */

namespace N06c8e349bfc7e6d237cd1e4c26d66ff7_1 {
  type $0 = `${U1}${$1}${U2}${a}${string}${U3}${$3}${U4}{}${$4}${$5}`;
  type $1 = ``;
  type a = ` `;
  type $3 = `888`;
  type $4 = `${a}`;
  type $5 = `${a | ''}`;
  
  type U1 = ''; // undefined & `&&`;
  type U2 = ''; // undefined & ` %%%`;
  type U3 = ``;
  type U4 = ` `;

  export interface I extends Record<
    `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888)(?: ){}(\\2)(\\k<a>?)/`,
    {
      $0: $0;
      $1: $1;
      a: a;
      $3: $3;
      $4: $4;
      $5: $5
    }
  > { '': '' }
}

namespace N06c8e349bfc7e6d237cd1e4c26d66ff7_2 {
  type $0 = `${U1}${$1}c`;
  type $1 = `b`;
  
  type U1 = `a` | `${$1 | ''}`;

  export interface I extends Record<
    `/(?:a|(b))\\1c/`,
    {
      $0: $0;
      $1?: $1
    }
  > { '': '' }
}

namespace N06c8e349bfc7e6d237cd1e4c26d66ff7_3 {
  type $0 = `${$1}${string | ''}text between${string}${groupName}${$3 | ''}${groupName | ''}`;
  type $1 = `1`;
  type groupName = `named group`;
  type $3 = ` `;

  export interface I extends Record<
    `/(1)\\s?text between\\s(?<groupName>named group)( )?\\k<groupName>?/`,
    {
      $0: $0;
      $1: $1;
      groupName: groupName;
      $3?: $3
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N06c8e349bfc7e6d237cd1e4c26d66ff7_1.I,
    N06c8e349bfc7e6d237cd1e4c26d66ff7_2.I,
    N06c8e349bfc7e6d237cd1e4c26d66ff7_3.I {
    '': ''
}