namespace Nc1e1ffc130aead13aa199b62448b178c_1 {
  type T$0 = `${Tstr}`;
  type Tstr = `${string}${string}`;

  export interface I extends Record<
    `/(?<str>\\w+)/`,
    {
      $0: T$0;
      str: Tstr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_2 {
  type T$0 = `${Tstr}`;
  type Tstr = `${string | ''}`;

  export interface I extends Record<
    `/(?<str>\\w?)/`,
    {
      $0: T$0;
      str: Tstr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_3 {
  type T$0 = `${Tstr}`;
  type Tstr = `${`a` | ''}`;

  export interface I extends Record<
    `/(?<str>a?)/`,
    {
      $0: T$0;
      str: Tstr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_4 {
  type T$0 = `${Tval}`;
  type Tval = `text`;

  export interface I extends Record<
    `/(?<val>text)/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_5 {
  type T$0 = `${Tval}`;
  type Tval = `text ${number}`;

  export interface I extends Record<
    `/(?<val>text \\d+)/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_6 {
  type T$0 = `${Tval}`;
  type Tval = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<val>text \\d*)/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_7 {
  type T$0 = `${Tval}`;
  type Tval = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<val>text \\d?)/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_8 {
  type T$0 = `${Tval}`;
  type Tval = `tex${`t`}${string}`;

  export interface I extends Record<
    `/(?<val>text{1,3})/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_9 {
  type T$0 = `${Tval}`;
  type Tval = `tex${''|`${`t`}${string}`}`;

  export interface I extends Record<
    `/(?<val>text{0,3})/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_10 {
  type T$0 = `${Tval}`;
  type Tval = `tex${''|`${`t`}${string}`}`;

  export interface I extends Record<
    `/(?<val>text{0,})/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_11 {
  type T$0 = `${Tval}`;
  type Tval = `tex${''|`${`t`}${string}`}`;

  export interface I extends Record<
    `/(?<val>text{,3})/`,
    {
      $0: T$0;
      val: Tval
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_12 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number}`;

  export interface I extends Record<
    `/(?<num>\\d)/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_13 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number}`;

  export interface I extends Record<
    `/(?<num>\\d{1,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_14 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d{,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_15 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d{0,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_16 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d{0,})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_17 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d*)/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_18 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d?)/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_19 {
  type T$0 = `${TnumStr}${string}${''|`${`\n`}${string}`}`;
  type TnumStr = `${number}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d+[amn]+)\\s\\n*/`,
    {
      $0: T$0;
      numStr: TnumStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_20 {
  type T$0 = `${TnumStr}${string}${''|`${`\n`}${string}`}`;
  type TnumStr = `${number}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{1,3}[amn]+)\\s\\n*/`,
    {
      $0: T$0;
      numStr: TnumStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_21 {
  type T$0 = `${TnumStr}${string}${''|`${`\n`}${string}`}`;
  type TnumStr = `${number}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{1,}[amn]+)\\s\\n*/`,
    {
      $0: T$0;
      numStr: TnumStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_22 {
  type T$0 = `${TnumStr}${string}${''|`${`\n`}${string}`}`;
  type TnumStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{0,3}[amn]+)\\s\\n*/`,
    {
      $0: T$0;
      numStr: TnumStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_23 {
  type T$0 = `${TnumStr}${string}${''|`${`\n`}${string}`}`;
  type TnumStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{,3}[amn]+)\\s\\n*/`,
    {
      $0: T$0;
      numStr: TnumStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_24 {
  type T$0 = `${TnumStr}${string}${''|`${`\n`}${string}`}`;
  type TnumStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d?[amn]+)\\s\\n*/`,
    {
      $0: T$0;
      numStr: TnumStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_25 {
  type T$0 = `${TnumStr}${string}${''|`${`\n`}${string}`}`;
  type TnumStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d*[amn]+)\\s\\n*/`,
    {
      $0: T$0;
      numStr: TnumStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_26 {
  type T$0 = `${TconNum}`;
  type TconNum = `text ${number}${''|`${`\n`}${string}`}`;

  export interface I extends Record<
    `/(?<conNum>text \\d\\n*)/`,
    {
      $0: T$0;
      conNum: TconNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_27 {
  type T$0 = `${TconNum}`;
  type TconNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text \\d)/`,
    {
      $0: T$0;
      conNum: TconNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_28 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text \\d{2,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_29 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text \\d{1,})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_30 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{0,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_31 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{0,})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_32 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{0})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_33 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_34 {
  type T$0 = `${TconNum}`;
  type TconNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3])/`,
    {
      $0: T$0;
      conNum: TconNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_35 {
  type T$0 = `${TconNum}`;
  type TconNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]+)/`,
    {
      $0: T$0;
      conNum: TconNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_36 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{1,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_37 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{1,})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_38 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{0,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_39 {
  type T$0 = `${Tnum}`;
  type Tnum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{,3})/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_40 {
  type T$0 = `${TconNum}`;
  type TconNum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]?)/`,
    {
      $0: T$0;
      conNum: TconNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_41 {
  type T$0 = `${TconNum}`;
  type TconNum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]*)/`,
    {
      $0: T$0;
      conNum: TconNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_42 {
  type T$0 = `${`t` | ''}`;

  export interface I extends Record<
    `/t?/`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_43 {
  type T$0 = `${`t`}${string}`;

  export interface I extends Record<
    `/t+/`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_44 {
  type T$0 = `${''|`${`t`}${string}`}${number}`;

  export interface I extends Record<
    `/t*\\d/`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_45 {
  type T$0 = `${`t`}${string}`;

  export interface I extends Record<
    `/t{1,3}/`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_46 {
  type T$0 = `${Tnum}${Tbum}`;
  type Tnum = `${number}`;
  type Tbum = `aa`;

  export interface I extends Record<
    `/(?<num>[1-3]+)?(?<bum>aa)/`,
    {
      $0: T$0;
      num: Tnum;
      bum: Tbum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_47 {
  type T$0 = `${Ttxt}`;
  type Ttxt = `5` | `${number}`;

  export interface I extends Record<
    `/(?<txt>5|\\d)?/`,
    {
      $0: T$0;
      txt: Ttxt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_48 {
  type T$0 = `${Ttxt}`;
  type Ttxt = `a\\\\\\\\|b` | `c` | `${`d` | ''}`;

  export interface I extends Record<
    `/(?<txt>a\\\\\\\\\\|b|c|d?)/`,
    {
      $0: T$0;
      txt: Ttxt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_49 {
  type T$0 = `${Ttxt}`;
  type Ttxt = `a` | `s` | `f\\\\\\\\` | `b` | `c${number}` | `d` | `${string}`;

  export interface I extends Record<
    `/(?<txt>a|s|f\\\\\\\\|b|c\\d|d|[-adf ])/`,
    {
      $0: T$0;
      txt: Ttxt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_50 {
  type T$0 = `${Toptional1 | ''}` | `${Toptional2 | ''}${Treq | ''}`;
  type Toptional1 = `opt1` | `opt`;
  type Toptional2 = `opt2`;
  type Treq = `req`;

  export interface I extends Record<
    `/(?<optional1>opt1|opt)|(?<optional2>opt2)(?<req>req)/`,
    {
      $0: T$0;
      optional1?: Toptional1;
      optional2?: Toptional2;
      req?: Treq
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_51 {
  type T$0 = `${Tnum}`;
  type Tnum = `${number}`;

  export interface I extends Record<
    `/(?<num>[1-3]+)?/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_52 {
  type T$0 = `${Tnum}`;
  type Tnum = `1` | `2`;

  export interface I extends Record<
    `/(?<num>1|2)?/`,
    {
      $0: T$0;
      num: Tnum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_53 {
  type T$0 = `${Tr}`;
  type Tr = `12${Topt | ''}` | `${Topt1 | ''}`;
  type Topt = ``;
  type Topt1 = ``;

  export interface I extends Record<
    `/(?<r>12(?<opt>)|(?<opt1>))/`,
    {
      $0: T$0;
      r: Tr;
      opt?: Topt;
      opt1?: Topt1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_54 {
  type T$0 = `\\\\${Tstr}${T$2}${T$3}`;
  type Tstr = `${string}${string}\${`;
  type T$2 = `\\\\ ${number}${string}`;
  type T$3 = `${T$4 | ''}` | `${T$5 | ''}`;
  type T$4 = `${number}{3,\${txt}\\${string}`;
  type T$5 = `\\\${txt}\\\\\${txt1}\\\\\\\${txt2}\\\\\\\\\${txt3}${string}` | `${string}`;

  export interface I extends Record<
    `/\\\\(?<str>\\w+\${)(\\\\ \\d[1,2])?((\\d{3,\${txt}\\${string})|(\\\${txt}\\\\\${txt1}\\\\\\\${txt2}\\\\\\\\\${txt3}${string}|${string}))/`,
    {
      $0: T$0;
      str: Tstr;
      $2: T$2;
      $3: T$3;
      $4?: T$4;
      $5?: T$5
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_55 {
  type T$0 = `${`(` | ''}<!>${string}${string}\${)${T$1}${string}${T$2}${Tname1}${string}`;
  type T$1 = `${string} ${number}${string}`;
  type T$2 = `${T$3 | ''}` | `${T$4 | ''}`;
  type T$3 = `${number}{3,\${txt}\\${string}`;
  type T$4 = `\${str}` | string | `${Tname | ''}${number}`;
  type Tname = ``;
  type Tname1 = `${Topt1 | ''}` | `${Topt2 | ''}` | ``;
  type Topt1 = ` (  `;
  type Topt2 = ` `;

  export interface I extends Record<
    `/\\(?<!>\\w+\${)(${string} \\d[1,2])?${string}((\\d{3,\${txt}\\${string})|(\${str}|${string}|(?<name>)[1479]))(?<name1>(?<opt1> \\\\\\(  )|(?<opt2> )|)${string}/`,
    {
      $0: T$0;
      $1: T$1;
      $2: T$2;
      $3?: T$3;
      $4?: T$4;
      name?: Tname;
      name1: Tname1;
      opt1?: Topt1;
      opt2?: Topt2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_56 {
  type T$0 = `${T$0th} ${string}in zero`;
  type T$0th = `${T$1th}${T$4}${T$3th}\\\\\\\\\\\\|\\\${ ${`(` | ''}<4>${T$5th})`;
  type T$1th = `${T$2nd}`;
  type T$2nd = ``;
  type T$4 = `nonamϭϰe` | ` `;
  type T$3th = `${number}`;
  type T$5th = `${` `}${string}${T$6th}Ϩ`;
  type T$6th = `${T$7th}${T$10}{${number | ''}}${T$11}{,}`;
  type T$7th = `${T$8th}`;
  type T$8th = ``;
  type T$10 = ``;
  type T$11 = ``;

  export interface I extends Record<
    `/(?<$0th>(?<$1th>(?<$2nd>){,3})(nonamϭϰe| )+(?<$3th>\\d{2,3}){2,3}\\\\\\\\\\\\\\|\\\${ \\(?<$4>(?<$5th> {3,5}(?<$6th>(?<$7th>(?<$8th>))(){[234]?}(){,})Ϩ)\\)) ${string}in zero/gim`,
    {
      $0: T$0;
      $0th: T$0th;
      $1th: T$1th;
      $2nd: T$2nd;
      $4: T$4;
      $3th: T$3th;
      $5th: T$5th;
      $6th: T$6th;
      $7th: T$7th;
      $8th: T$8th;
      $10: T$10;
      $11: T$11
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_57 {
  type T$0 = `${T$0th}${T$2}`;
  type T$0th = ` ` | `sds `;
  type T$2 = `noname` | ``;

  export interface I extends Record<
    `/(?<$0th> |sds )(noname|)/gim`,
    {
      $0: T$0;
      $0th: T$0th;
      $2: T$2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_58 {
  type T$0 = `${Tbefore}${TbeforeSpaces}${Thashes}${TblockHashPosition}${Tassociations}${''|`${` `}${string}`}${Tinfo}${TbeforeCommentSpaces}${Tcomment}${U1}`;
  type Tbefore = `` | `${`\n`}`;
  type TbeforeSpaces = `${''|`${` `}${string}`}`;
  type Thashes = `${`#`}${string}`;
  type TblockHashPosition = `${string}`;
  type Tassociations = `${`_` | ''}${TsecretWidStr}${Tmodificators}`;
  type TsecretWidStr = `${''|`${string}${string}`}`;
  type Tmodificators = `${`!` | ''}`;
  type Tinfo = `[${TblockHeader}]`;
  type TblockHeader = `${string}${string}`;
  type TbeforeCommentSpaces = `${''|`${` `}${string}`}`;
  type Tcomment = `${string}${string}`;
  type U1 = ''; // `${`\n`}${''|`${` `}${string}`}#` | ``;

  export interface I extends Record<
    `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${string})(?<associations>_?(?<secretWidStr>[${string}]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
    {
      $0: T$0;
      before: Tbefore;
      beforeSpaces: TbeforeSpaces;
      hashes: Thashes;
      blockHashPosition: TblockHashPosition;
      associations: Tassociations;
      secretWidStr: TsecretWidStr;
      modificators: Tmodificators;
      info: Tinfo;
      blockHeader: TblockHeader;
      beforeCommentSpaces: TbeforeCommentSpaces;
      comment: Tcomment
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_59 {
  type T$0 = `${Tbookn}${''|`${string}${string}`}${T$4}`;
  type Tbookn = `${number | ''}${U1}`;
  type T$2 = `${''|`${string}${string}`}${T$3 | ''}`;
  type T$3 = `${string}${string}`;
  type T$4 = `${TchapterStr}${T$6}`;
  type TchapterStr = `${number}`;
  type T$6 = `${T$7}${TverseStr}${T$9}${U3}`;
  type T$7 = `:` | `${string}${string}`;
  type TverseStr = `${U2}`;
  type T$9 = `${''|`${string}${string}`}${TverseSeparator}${''|`${string}${string}`}`;
  type TverseSeparator = `${string | ''}`;
  type U1 = ''; // undefined & `${T$2 | ''}`;
  type U2 = ''; // undefined & `${number}`;
  type U3 = ''; // undefined & `finishVerseStr>${number}`;

  export interface I extends Record<
    `/(?<bookn>\\d?(?!(\\s*([а-яё]+))))\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>(?!\\d{1,3}))(\\s*(?<verseSeparator>[-,]?)\\s*)(?<!finishVerseStr>\\d{1,3})?)?)?/i`,
    {
      $0: T$0;
      bookn: Tbookn;
      $2?: T$2;
      $3?: T$3;
      $4: T$4;
      chapterStr: TchapterStr;
      $6: T$6;
      $7: T$7;
      verseStr: TverseStr;
      $9: T$9;
      verseSeparator: TverseSeparator
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_60 {
  type T$0 = `${U1}${T$3} `;
  type T$1 = `${U2} `;
  type T$2 = `abab${`a`}${string}`;
  type T$3 = `jaja`;
  type U1 = `${T$1}`;
  type U2 = ''; // undefined & `${T$2 | ''}`;

  export interface I extends Record<
    `/(?:((?!(ababa+?)) ))(jaja) /`,
    {
      $0: T$0;
      $1: T$1;
      $2?: T$2;
      $3: T$3
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_61 {
  type T$0 = `${U1}${string}${T$3} `;
  type T$1 = `${U2} `;
  type T$2 = `abab${`a`}${string}`;
  type T$3 = `job`;
  type U1 = `${T$1}`;
  type U2 = ''; // undefined & `${T$2 | ''}`;

  export interface I extends Record<
    `/(?:((?!(ababa+?)) ))[|](job) /`,
    {
      $0: T$0;
      $1: T$1;
      $2?: T$2;
      $3: T$3
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_62 {
  type T$0 = `${Tname}${U1}${T$2}${U2}${Tname1}${U3}${T$4}${U4}`;
  type Tname = `n`;
  type T$2 = `2`;
  type Tname1 = `n1`;
  type T$4 = `4`;
  type U1 = `just 1`;
  type U2 = ''; // `just 2`;
  type U3 = ''; // `just 3`;
  type U4 = ''; // undefined & `just 4`;

  export interface I extends Record<
    `/(?<name>n)(?:just 1)(2)(?im-s:just 2)?(?<name1>n1)(?<=just 3)(4)(?<!just 4)/i`,
    {
      $0: T$0;
      name: Tname;
      $2: T$2;
      name1: Tname1;
      $4: T$4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_63 {
  type T$0 = `${T$1}${T$1}`;
  type T$1 = `^`;

  export interface I extends Record<
    `/(\\^)\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_64 {
  type T$0 = `${T$1}${T$1}`;
  type T$1 = `$`;

  export interface I extends Record<
    `/(\\$)\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_65 {
  type T$0 = `${T$1}\x02`;
  type T$1 = `\\\\`;

  export interface I extends Record<
    `/(\\\\$)\\2/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_66 {
  type T$0 = `${U1}${T$1th}${U2}${Ta}${string}${U3}${T$3}${U4}{}${T$4}`;
  type T$1th = `first`;
  type Ta = ` `;
  type T$3 = `888`;
  type T$4 = `${T$3}`;
  type U1 = `&&`;
  type U2 = ` %%%`;
  type U3 = ``;
  type U4 = ` `;

  export interface I extends Record<
    `/(?:&&)(?<$1th>first)(?: %%%)(?<a> )[|](?:)(888)(?: ){}(\\3)/`,
    {
      $0: T$0;
      $1th: T$1th;
      a: Ta;
      $3: T$3;
      $4: T$4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_67 {
  type T$0 = `${U1}${T$1}${Tavva}${string}${U2} {}${Tavvva}`;
  type T$1 = `FF`;
  type Tavva = ` JJJ`;
  type Tavvva = `${Tavva}`;
  type U1 = `uN`;
  type U2 = `888`;

  export interface I extends Record<
    `/(?:uN)(FF)(?<avva> JJJ)[|](?:888) {}(?<avvva>\\2)/`,
    {
      $0: T$0;
      $1: T$1;
      avva: Tavva;
      avvva: Tavvva
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_68 {
  type T$0 = `${U1}${T$1}${U2}${Ta}${string}${U3}${T$3}${U4}{}${T$4}`;
  type T$1 = ``;
  type Ta = ` `;
  type T$3 = `888=BBB`;
  type T$4 = `${Ta}`;
  type U1 = ''; // undefined & `&&`;
  type U2 = ''; // undefined & ` %%%`;
  type U3 = ``;
  type U4 = ` `;

  export interface I extends Record<
    `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888=BBB)(?: ){}(\\2)/`,
    {
      $0: T$0;
      $1: T$1;
      a: Ta;
      $3: T$3;
      $4: T$4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_69 {
  type T$0 = `${T$1}a${string}a${T$1}`;
  type T$1 = `${string}.`;

  export interface I extends Record<
    `/(\\W\\.)a...a\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_70 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `%`;

  export interface I extends Record<
    `/(%)\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_71 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `\\${string}`;

  export interface I extends Record<
    `/(\\${string})\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_72 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `\\\\${string}[${string}`;

  export interface I extends Record<
    `/(\\\\.[${string})\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_73 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `\\\\${string}`;

  export interface I extends Record<
    `/(\\\\${string})\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_74 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `\\\${2}`;

  export interface I extends Record<
    `/(\\\${2})\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_75 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `${string}`;

  export interface I extends Record<
    `/(${string})\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_76 {
  type T$0 = `${T$1}\\\\${T$1 | ''}`;
  type T$1 = `\\\${2}`;

  export interface I extends Record<
    `/(\\\${2})\\\\\\1?/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_77 {
  type T$0 = `${Tnnn}\\\\${Tnnn | ''} \\${Tnnn} `;
  type Tnnn = `\\\${n}`;

  export interface I extends Record<
    `/(?<nnn>\\\${n})\\\\\\k<nnn>? \\\\<nnn> /g`,
    {
      $0: T$0;
      nnn: Tnnn
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_78 {
  type T$0 = `${Ta}${Ta}`;
  type Ta = `\\\${2}`;

  export interface I extends Record<
    `/(?<a>\\\${2})\\k<a>/g`,
    {
      $0: T$0;
      a: Ta
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_79 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `\\\\${string}3}`;

  export interface I extends Record<
    `/(\\\\[\${]3})\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_80 {
  type T$0 = `${T$1}${string}\\${string}\\${string}`;
  type T$1 = `[\\${''|`${`\\ `}${string}`}`;

  export interface I extends Record<
    `/(\\[^\\\\ *)\\W\\\\s\\S\\\\S/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_81 {
  type T$0 = `${T$1}\\\\${T$1}`;
  type T$1 = `${string}4}`;

  export interface I extends Record<
    `/([\\\${\\]]4})\\\\\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_82 {
  type T$0 = ``;

  export interface I extends Record<
    `//[`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_83 {
  type T$0 = `${T$1}${T$1}`;
  type T$1 = `${string}6}`;

  export interface I extends Record<
    `/(${string}6})\\1/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_84 {
  type T$0 = `${`\n`}`;

  export interface I extends Record<
    `/\\n/g`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_85 {
  type T$0 = `_\` ${T$1}`;
  type T$1 = ``;

  export interface I extends Record<
    `/_\` ()/g`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_86 {
  type T$0 = `${string}`;

  export interface I extends Record<
    `/\\u/g`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_87 {
  type T$0 = `${U1}${T$1}c${T$2}`;
  type T$1 = `b`;
  type T$2 = ``;
  type U1 = `a` | `${T$1 | ''}`;

  export interface I extends Record<
    `/(?:a|(b))\\1c()/`,
    {
      $0: T$0;
      $1?: T$1;
      $2: T$2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_88 {
  type T$0 = `${T$1}${T$1}`;
  type T$1 = `a`;

  export interface I extends Record<
    `/\\1(a)/`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_89 {
  type T$0 = `${Tself}${Tself}`;
  type Tself = `s`;

  export interface I extends Record<
    `/\\k<self>(?<self>s)/`,
    {
      $0: T$0;
      self: Tself
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_90 {
  type T$0 = `${Tself}`;
  type Tself = ``;

  export interface I extends Record<
    `/(?<self>)/`,
    {
      $0: T$0;
      self: Tself
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_91 {
  type T$0 = `${U1}c`;
  type T$1 = `a`;
  type T$2 = `b`;
  type U1 = ''; // `${T$1}${T$2}`;

  export interface I extends Record<
    `/(?<=(a)(b))c/`,
    {
      $0: T$0;
      $1: T$1;
      $2: T$2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_92 {
  type T$0 = `${U1}c`;
  type T$1 = `${string}`;
  type U1 = ''; // `${T$1}`;

  export interface I extends Record<
    `/(?<=([ab])+)c/`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_93 {
  type T$0 = `c${U1}`;
  type T$1 = `ab`;
  type U1 = ''; // `${T$1}`;

  export interface I extends Record<
    `/c(?=(ab))/`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_94 {
  type T$0 = `${U1}${U2}`;
  type T$1 = `a`;
  type T$2 = `ab`;
  type T$3 = `c`;
  type T$4 = `bc`;
  type U1 = `${T$1 | ''}` | `${T$2 | ''}`;
  type U2 = `${T$3 | ''}` | `${T$4 | ''}`;

  export interface I extends Record<
    `/(?:(a)|(ab))(?:(c)|(bc))/`,
    {
      $0: T$0;
      $1?: T$1;
      $2?: T$2;
      $3?: T$3;
      $4?: T$4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_95 {
  type T$0 = `WORD`;

  export interface I extends Record<
    `/\\bWORD\\B/`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_96 {
  type T$0 = `${U1}${''|`${`a`}${string}`}b${T$1}`;
  type T$1 = `${`a`}${string}`;
  type U1 = ''; // `${T$1}`;

  export interface I extends Record<
    `/(?=(a+))a*b\\1/`,
    {
      $0: T$0;
      $1: T$1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_97 {
  type T$0 = `${U1}b`;
  type U1 = ''; // `a`;

  export interface I extends Record<
    `/(?=a)?b/`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_98 {
  type T$0 = `${U1}`;
  type T$1 = `${string}${string}`;
  type T$2 = `${string}${string}`;
  type U1 = ''; // `${T$1}${T$2}`;

  export interface I extends Record<
    `/(?<=([ab]+)([bc]+))$/`,
    {
      $0: T$0;
      $1: T$1;
      $2: T$2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_99 {
  type T$0 = `${U1}${number}${U2}`;
  type U1 = ''; // `$`;
  type U2 = `.${number | ''}`;

  export interface I extends Record<
    `/(?<=\\$)\\d+(?:\\.\\d*)?/`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_100 {
  type T$0 = `.${U1}`;
  type U1 = `png` | `jp${`e` | ''}g` | `gif`;

  export interface I extends Record<
    `/\\.(?:png|jpe?g|gif)$/i`,
    {
      $0: T$0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_101 {
  type T$0 = `${U1}=${T$1}${T$2}${T$1}`;
  type T$1 = `${string}`;
  type T$2 = `${string | ''}`;
  type U1 = `title` | `name`;

  export interface I extends Record<
    `/(?:title|name)=(["'])(.*?)\\1/`,
    {
      $0: T$0;
      $1: T$1;
      $2: T$2
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends Nc1e1ffc130aead13aa199b62448b178c_1.I,
    Nc1e1ffc130aead13aa199b62448b178c_2.I,
    Nc1e1ffc130aead13aa199b62448b178c_3.I,
    Nc1e1ffc130aead13aa199b62448b178c_4.I,
    Nc1e1ffc130aead13aa199b62448b178c_5.I,
    Nc1e1ffc130aead13aa199b62448b178c_6.I,
    Nc1e1ffc130aead13aa199b62448b178c_7.I,
    Nc1e1ffc130aead13aa199b62448b178c_8.I,
    Nc1e1ffc130aead13aa199b62448b178c_9.I,
    Nc1e1ffc130aead13aa199b62448b178c_10.I,
    Nc1e1ffc130aead13aa199b62448b178c_11.I,
    Nc1e1ffc130aead13aa199b62448b178c_12.I,
    Nc1e1ffc130aead13aa199b62448b178c_13.I,
    Nc1e1ffc130aead13aa199b62448b178c_14.I,
    Nc1e1ffc130aead13aa199b62448b178c_15.I,
    Nc1e1ffc130aead13aa199b62448b178c_16.I,
    Nc1e1ffc130aead13aa199b62448b178c_17.I,
    Nc1e1ffc130aead13aa199b62448b178c_18.I,
    Nc1e1ffc130aead13aa199b62448b178c_19.I,
    Nc1e1ffc130aead13aa199b62448b178c_20.I,
    Nc1e1ffc130aead13aa199b62448b178c_21.I,
    Nc1e1ffc130aead13aa199b62448b178c_22.I,
    Nc1e1ffc130aead13aa199b62448b178c_23.I,
    Nc1e1ffc130aead13aa199b62448b178c_24.I,
    Nc1e1ffc130aead13aa199b62448b178c_25.I,
    Nc1e1ffc130aead13aa199b62448b178c_26.I,
    Nc1e1ffc130aead13aa199b62448b178c_27.I,
    Nc1e1ffc130aead13aa199b62448b178c_28.I,
    Nc1e1ffc130aead13aa199b62448b178c_29.I,
    Nc1e1ffc130aead13aa199b62448b178c_30.I,
    Nc1e1ffc130aead13aa199b62448b178c_31.I,
    Nc1e1ffc130aead13aa199b62448b178c_32.I,
    Nc1e1ffc130aead13aa199b62448b178c_33.I,
    Nc1e1ffc130aead13aa199b62448b178c_34.I,
    Nc1e1ffc130aead13aa199b62448b178c_35.I,
    Nc1e1ffc130aead13aa199b62448b178c_36.I,
    Nc1e1ffc130aead13aa199b62448b178c_37.I,
    Nc1e1ffc130aead13aa199b62448b178c_38.I,
    Nc1e1ffc130aead13aa199b62448b178c_39.I,
    Nc1e1ffc130aead13aa199b62448b178c_40.I,
    Nc1e1ffc130aead13aa199b62448b178c_41.I,
    Nc1e1ffc130aead13aa199b62448b178c_42.I,
    Nc1e1ffc130aead13aa199b62448b178c_43.I,
    Nc1e1ffc130aead13aa199b62448b178c_44.I,
    Nc1e1ffc130aead13aa199b62448b178c_45.I,
    Nc1e1ffc130aead13aa199b62448b178c_46.I,
    Nc1e1ffc130aead13aa199b62448b178c_47.I,
    Nc1e1ffc130aead13aa199b62448b178c_48.I,
    Nc1e1ffc130aead13aa199b62448b178c_49.I,
    Nc1e1ffc130aead13aa199b62448b178c_50.I,
    Nc1e1ffc130aead13aa199b62448b178c_51.I,
    Nc1e1ffc130aead13aa199b62448b178c_52.I,
    Nc1e1ffc130aead13aa199b62448b178c_53.I,
    Nc1e1ffc130aead13aa199b62448b178c_54.I,
    Nc1e1ffc130aead13aa199b62448b178c_55.I,
    Nc1e1ffc130aead13aa199b62448b178c_56.I,
    Nc1e1ffc130aead13aa199b62448b178c_57.I,
    Nc1e1ffc130aead13aa199b62448b178c_58.I,
    Nc1e1ffc130aead13aa199b62448b178c_59.I,
    Nc1e1ffc130aead13aa199b62448b178c_60.I,
    Nc1e1ffc130aead13aa199b62448b178c_61.I,
    Nc1e1ffc130aead13aa199b62448b178c_62.I,
    Nc1e1ffc130aead13aa199b62448b178c_63.I,
    Nc1e1ffc130aead13aa199b62448b178c_64.I,
    Nc1e1ffc130aead13aa199b62448b178c_65.I,
    Nc1e1ffc130aead13aa199b62448b178c_66.I,
    Nc1e1ffc130aead13aa199b62448b178c_67.I,
    Nc1e1ffc130aead13aa199b62448b178c_68.I,
    Nc1e1ffc130aead13aa199b62448b178c_69.I,
    Nc1e1ffc130aead13aa199b62448b178c_70.I,
    Nc1e1ffc130aead13aa199b62448b178c_71.I,
    Nc1e1ffc130aead13aa199b62448b178c_72.I,
    Nc1e1ffc130aead13aa199b62448b178c_73.I,
    Nc1e1ffc130aead13aa199b62448b178c_74.I,
    Nc1e1ffc130aead13aa199b62448b178c_75.I,
    Nc1e1ffc130aead13aa199b62448b178c_76.I,
    Nc1e1ffc130aead13aa199b62448b178c_77.I,
    Nc1e1ffc130aead13aa199b62448b178c_78.I,
    Nc1e1ffc130aead13aa199b62448b178c_79.I,
    Nc1e1ffc130aead13aa199b62448b178c_80.I,
    Nc1e1ffc130aead13aa199b62448b178c_81.I,
    Nc1e1ffc130aead13aa199b62448b178c_82.I,
    Nc1e1ffc130aead13aa199b62448b178c_83.I,
    Nc1e1ffc130aead13aa199b62448b178c_84.I,
    Nc1e1ffc130aead13aa199b62448b178c_85.I,
    Nc1e1ffc130aead13aa199b62448b178c_86.I,
    Nc1e1ffc130aead13aa199b62448b178c_87.I,
    Nc1e1ffc130aead13aa199b62448b178c_88.I,
    Nc1e1ffc130aead13aa199b62448b178c_89.I,
    Nc1e1ffc130aead13aa199b62448b178c_90.I,
    Nc1e1ffc130aead13aa199b62448b178c_91.I,
    Nc1e1ffc130aead13aa199b62448b178c_92.I,
    Nc1e1ffc130aead13aa199b62448b178c_93.I,
    Nc1e1ffc130aead13aa199b62448b178c_94.I,
    Nc1e1ffc130aead13aa199b62448b178c_95.I,
    Nc1e1ffc130aead13aa199b62448b178c_96.I,
    Nc1e1ffc130aead13aa199b62448b178c_97.I,
    Nc1e1ffc130aead13aa199b62448b178c_98.I,
    Nc1e1ffc130aead13aa199b62448b178c_99.I,
    Nc1e1ffc130aead13aa199b62448b178c_100.I,
    Nc1e1ffc130aead13aa199b62448b178c_101.I {
    '': ''
}