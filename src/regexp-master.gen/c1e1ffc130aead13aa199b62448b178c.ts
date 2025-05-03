/* eslint-disable @typescript-eslint/no-namespace */

namespace Nc1e1ffc130aead13aa199b62448b178c_1 {
  type $0 = `${str}`;
  type str = `${string}${string}`;

  export interface I extends Record<
    `/(?<str>\\w+)/`,
    {
      $0: $0;
      str: str
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_2 {
  type $0 = `${str}`;
  type str = `${string | ''}`;

  export interface I extends Record<
    `/(?<str>\\w?)/`,
    {
      $0: $0;
      str: str
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_3 {
  type $0 = `${str}`;
  type str = `${`a` | ''}`;

  export interface I extends Record<
    `/(?<str>a?)/`,
    {
      $0: $0;
      str: str
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_4 {
  type $0 = `${val}`;
  type val = `text`;

  export interface I extends Record<
    `/(?<val>text)/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_5 {
  type $0 = `${val}`;
  type val = `text ${number}`;

  export interface I extends Record<
    `/(?<val>text \\d+)/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_6 {
  type $0 = `${val}`;
  type val = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<val>text \\d*)/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_7 {
  type $0 = `${val}`;
  type val = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<val>text \\d?)/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_8 {
  type $0 = `${val}`;
  type val = `tex${`t`}${string}`;

  export interface I extends Record<
    `/(?<val>text{1,3})/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_9 {
  type $0 = `${val}`;
  type val = `tex${''|`${`t`}${string}`}`;

  export interface I extends Record<
    `/(?<val>text{0,3})/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_10 {
  type $0 = `${val}`;
  type val = `tex${''|`${`t`}${string}`}`;

  export interface I extends Record<
    `/(?<val>text{0,})/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_11 {
  type $0 = `${val}`;
  type val = `tex${''|`${`t`}${string}`}`;

  export interface I extends Record<
    `/(?<val>text{,3})/`,
    {
      $0: $0;
      val: val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_12 {
  type $0 = `${num}`;
  type num = `${number}`;

  export interface I extends Record<
    `/(?<num>\\d)/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_13 {
  type $0 = `${num}`;
  type num = `${number}`;

  export interface I extends Record<
    `/(?<num>\\d{1,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_14 {
  type $0 = `${num}`;
  type num = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d{,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_15 {
  type $0 = `${num}`;
  type num = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d{0,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_16 {
  type $0 = `${num}`;
  type num = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d{0,})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_17 {
  type $0 = `${num}`;
  type num = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d*)/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_18 {
  type $0 = `${num}`;
  type num = `${number | ''}`;

  export interface I extends Record<
    `/(?<num>\\d?)/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_19 {
  type $0 = `${numStr}${string}${''|`${`\n`}${string}`}`;
  type numStr = `${number}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d+[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_20 {
  type $0 = `${numStr}${string}${''|`${`\n`}${string}`}`;
  type numStr = `${number}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{1,3}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_21 {
  type $0 = `${numStr}${string}${''|`${`\n`}${string}`}`;
  type numStr = `${number}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{1,}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_22 {
  type $0 = `${numStr}${string}${''|`${`\n`}${string}`}`;
  type numStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{0,3}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_23 {
  type $0 = `${numStr}${string}${''|`${`\n`}${string}`}`;
  type numStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d{,3}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_24 {
  type $0 = `${numStr}${string}${''|`${`\n`}${string}`}`;
  type numStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d?[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_25 {
  type $0 = `${numStr}${string}${''|`${`\n`}${string}`}`;
  type numStr = `${number | ''}${string}${string}`;

  export interface I extends Record<
    `/(?<numStr>\\d*[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_26 {
  type $0 = `${conNum}`;
  type conNum = `text ${number}${''|`${`\n`}${string}`}`;

  export interface I extends Record<
    `/(?<conNum>text \\d\\n*)/`,
    {
      $0: $0;
      conNum: conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_27 {
  type $0 = `${conNum}`;
  type conNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text \\d)/`,
    {
      $0: $0;
      conNum: conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_28 {
  type $0 = `${num}`;
  type num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text \\d{2,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_29 {
  type $0 = `${num}`;
  type num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text \\d{1,})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_30 {
  type $0 = `${num}`;
  type num = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{0,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_31 {
  type $0 = `${num}`;
  type num = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{0,})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_32 {
  type $0 = `${num}`;
  type num = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{0})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_33 {
  type $0 = `${num}`;
  type num = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text \\d{,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_34 {
  type $0 = `${conNum}`;
  type conNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3])/`,
    {
      $0: $0;
      conNum: conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_35 {
  type $0 = `${conNum}`;
  type conNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]+)/`,
    {
      $0: $0;
      conNum: conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_36 {
  type $0 = `${num}`;
  type num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{1,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_37 {
  type $0 = `${num}`;
  type num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{1,})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_38 {
  type $0 = `${num}`;
  type num = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{0,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_39 {
  type $0 = `${num}`;
  type num = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{,3})/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_40 {
  type $0 = `${conNum}`;
  type conNum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]?)/`,
    {
      $0: $0;
      conNum: conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_41 {
  type $0 = `${conNum}`;
  type conNum = `text ${number | ''}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]*)/`,
    {
      $0: $0;
      conNum: conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_42 {
  type $0 = `${`t` | ''}`;

  export interface I extends Record<
    `/t?/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_43 {
  type $0 = `${`t`}${string}`;

  export interface I extends Record<
    `/t+/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_44 {
  type $0 = `${''|`${`t`}${string}`}${number}`;

  export interface I extends Record<
    `/t*\\d/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_45 {
  type $0 = `${`t`}${string}`;

  export interface I extends Record<
    `/t{1,3}/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_46 {
  type $0 = `${num}${bum}`;
  type num = `${number}`;
  type bum = `aa`;

  export interface I extends Record<
    `/(?<num>[1-3]+)?(?<bum>aa)/`,
    {
      $0: $0;
      num: num;
      bum: bum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_47 {
  type $0 = `${txt}`;
  type txt = `5` | `${number}`;

  export interface I extends Record<
    `/(?<txt>5|\\d)?/`,
    {
      $0: $0;
      txt: txt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_48 {
  type $0 = `${txt}`;
  type txt = `a\\\\\\\\|b` | `c` | `${`d` | ''}`;

  export interface I extends Record<
    `/(?<txt>a\\\\\\\\\\|b|c|d?)/`,
    {
      $0: $0;
      txt: txt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_49 {
  type $0 = `${txt}`;
  type txt = `a` | `s` | `f\\\\\\\\` | `b` | `c${number}` | `d` | `${string}`;

  export interface I extends Record<
    `/(?<txt>a|s|f\\\\\\\\|b|c\\d|d|[-adf ])/`,
    {
      $0: $0;
      txt: txt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_50 {
  type $0 = `${optional1 | ''}` | `${optional2 | ''}${req | ''}`;
  type optional1 = `opt1` | `opt`;
  type optional2 = `opt2`;
  type req = `req`;

  export interface I extends Record<
    `/(?<optional1>opt1|opt)|(?<optional2>opt2)(?<req>req)/`,
    {
      $0: $0;
      optional1?: optional1;
      optional2?: optional2;
      req?: req
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_51 {
  type $0 = `${num}`;
  type num = `${number}`;

  export interface I extends Record<
    `/(?<num>[1-3]+)?/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_52 {
  type $0 = `${num}`;
  type num = `1` | `2`;

  export interface I extends Record<
    `/(?<num>1|2)?/`,
    {
      $0: $0;
      num: num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_53 {
  type $0 = `${r}`;
  type r = `12${opt | ''}` | `${opt1 | ''}`;
  type opt = ``;
  type opt1 = ``;

  export interface I extends Record<
    `/(?<r>12(?<opt>)|(?<opt1>))/`,
    {
      $0: $0;
      r: r;
      opt?: opt;
      opt1?: opt1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_54 {
  type $0 = `\\\\${str}${$2}${$3}`;
  type str = `${string}${string}\${`;
  type $2 = `\\\\ ${number}${string}`;
  type $3 = `${$4 | ''}` | `${$5 | ''}`;
  type $4 = `${number}{3,\${txt}\\${string}`;
  type $5 = `\\\${txt}\\\\\${txt1}\\\\\\\${txt2}\\\\\\\\\${txt3}${string}` | `${string}`;

  export interface I extends Record<
    `/\\\\(?<str>\\w+\${)(\\\\ \\d[1,2])?((\\d{3,\${txt}\\${string})|(\\\${txt}\\\\\${txt1}\\\\\\\${txt2}\\\\\\\\\${txt3}${string}|${string}))/`,
    {
      $0: $0;
      str: str;
      $2: $2;
      $3: $3;
      $4?: $4;
      $5?: $5
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_55 {
  type $0 = `${`(` | ''}<!>${string}${string}\${)${$1}${string}${$2}${name1}${string}`;
  type $1 = `${string} ${number}${string}`;
  type $2 = `${$3 | ''}` | `${$4 | ''}`;
  type $3 = `${number}{3,\${txt}\\${string}`;
  type $4 = `\${str}` | string | `${name | ''}${number}`;
  type name = ``;
  type name1 = `${opt1 | ''}` | `${opt2 | ''}` | ``;
  type opt1 = ` (  `;
  type opt2 = ` `;

  export interface I extends Record<
    `/\\(?<!>\\w+\${)(${string} \\d[1,2])?${string}((\\d{3,\${txt}\\${string})|(\${str}|${string}|(?<name>)[1479]))(?<name1>(?<opt1> \\\\\\(  )|(?<opt2> )|)${string}/`,
    {
      $0: $0;
      $1: $1;
      $2: $2;
      $3?: $3;
      $4?: $4;
      name?: name;
      name1: name1;
      opt1?: opt1;
      opt2?: opt2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_56 {
  type $0 = `${$0th} ${string}in zero`;
  type $0th = `${$1th}${$4}${$3th}\\\\\\\\\\\\|\\\${ ${`(` | ''}<4>${$5th})`;
  type $1th = `${$2nd}`;
  type $2nd = ``;
  type $4 = `nonamϭϰe` | ` `;
  type $3th = `${number}`;
  type $5th = `${` `}${string}${$6th}Ϩ`;
  type $6th = `${$7th}${$10}{${number | ''}}${$11}{,}`;
  type $7th = `${$8th}`;
  type $8th = ``;
  type $10 = ``;
  type $11 = ``;

  export interface I extends Record<
    `/(?<$0th>(?<$1th>(?<$2nd>){,3})(nonamϭϰe| )+(?<$3th>\\d{2,3}){2,3}\\\\\\\\\\\\\\|\\\${ \\(?<$4>(?<$5th> {3,5}(?<$6th>(?<$7th>(?<$8th>))(){[234]?}(){,})Ϩ)\\)) ${string}in zero/gim`,
    IgnoreCaseRecord<{
      $0: $0;
      $0th: $0th;
      $1th: $1th;
      $2nd: $2nd;
      $4: $4;
      $3th: $3th;
      $5th: $5th;
      $6th: $6th;
      $7th: $7th;
      $8th: $8th;
      $10: $10;
      $11: $11
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_57 {
  type $0 = `${$0th}${$2}`;
  type $0th = ` ` | `sds `;
  type $2 = `noname` | ``;

  export interface I extends Record<
    `/(?<$0th> |sds )(noname|)/gim`,
    IgnoreCaseRecord<{
      $0: $0;
      $0th: $0th;
      $2: $2
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_58 {
  type $0 = `${before}${beforeSpaces}${hashes}${blockHashPosition}${associations}${''|`${` `}${string}`}${info}${beforeCommentSpaces}${comment}${U1}`;
  type before = `` | `${`\n`}`;
  type beforeSpaces = `${''|`${` `}${string}`}`;
  type hashes = `${`#`}${string}`;
  type blockHashPosition = `${string}`;
  type associations = `${`_` | ''}${secretWidStr}${modificators}`;
  type secretWidStr = `${''|`${string}${string}`}`;
  type modificators = `${`!` | ''}`;
  type info = `[${blockHeader}]`;
  type blockHeader = `${string}${string}`;
  type beforeCommentSpaces = `${''|`${` `}${string}`}`;
  type comment = `${string}${string}`;
  
  type U1 = ''; // `${`\n`}${''|`${` `}${string}`}#` | ``;

  export interface I extends Record<
    `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${string})(?<associations>_?(?<secretWidStr>[${string}]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
    {
      $0: $0;
      before: before;
      beforeSpaces: beforeSpaces;
      hashes: hashes;
      blockHashPosition: blockHashPosition;
      associations: associations;
      secretWidStr: secretWidStr;
      modificators: modificators;
      info: info;
      blockHeader: blockHeader;
      beforeCommentSpaces: beforeCommentSpaces;
      comment: comment
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_59 {
  type $0 = `${bookn}${''|`${string}${string}`}${$4}`;
  type bookn = `${number | ''}${U1}`;
  type $2 = `${''|`${string}${string}`}${$3 | ''}`;
  type $3 = `${string}${string}`;
  type $4 = `${chapterStr}${$6}`;
  type chapterStr = `${number}`;
  type $6 = `${$7}${verseStr}${$9}${U3}`;
  type $7 = `:` | `${string}${string}`;
  type verseStr = `${U2}`;
  type $9 = `${''|`${string}${string}`}${verseSeparator}${''|`${string}${string}`}`;
  type verseSeparator = `${string | ''}`;
  
  type U1 = ''; // undefined & `${$2 | ''}`;
  type U2 = ''; // undefined & `${number}`;
  type U3 = ''; // undefined & `finishVerseStr>${number}`;

  export interface I extends Record<
    `/(?<bookn>\\d?(?!(\\s*([а-яё]+))))\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>(?!\\d{1,3}))(\\s*(?<verseSeparator>[-,]?)\\s*)(?<!finishVerseStr>\\d{1,3})?)?)?/i`,
    IgnoreCaseRecord<{
      $0: $0;
      bookn: bookn;
      $2?: $2;
      $3?: $3;
      $4: $4;
      chapterStr: chapterStr;
      $6: $6;
      $7: $7;
      verseStr: verseStr;
      $9: $9;
      verseSeparator: verseSeparator
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_60 {
  type $0 = `${U1}${$3} `;
  type $1 = `${U2} `;
  type $2 = `abab${`a`}${string}`;
  type $3 = `jaja`;
  
  type U1 = `${$1}`;
  type U2 = ''; // undefined & `${$2 | ''}`;

  export interface I extends Record<
    `/(?:((?!(ababa+?)) ))(jaja) /`,
    {
      $0: $0;
      $1: $1;
      $2?: $2;
      $3: $3
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_61 {
  type $0 = `${U1}${string}${$3} `;
  type $1 = `${U2} `;
  type $2 = `abab${`a`}${string}`;
  type $3 = `job`;
  
  type U1 = `${$1}`;
  type U2 = ''; // undefined & `${$2 | ''}`;

  export interface I extends Record<
    `/(?:((?!(ababa+?)) ))[|](job) /`,
    {
      $0: $0;
      $1: $1;
      $2?: $2;
      $3: $3
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_62 {
  type $0 = `${name}${U1}${$2}${U2}${name1}${U3}${$4}${U4}`;
  type name = `n`;
  type $2 = `2`;
  type name1 = `n1`;
  type $4 = `4`;
  
  type U1 = `just 1`;
  type U2 = ''; // `just 2`;
  type U3 = ''; // `just 3`;
  type U4 = ''; // undefined & `just 4`;

  export interface I extends Record<
    `/(?<name>n)(?:just 1)(2)(?im-s:just 2)?(?<name1>n1)(?<=just 3)(4)(?<!just 4)/i`,
    IgnoreCaseRecord<{
      $0: $0;
      name: name;
      $2: $2;
      name1: name1;
      $4: $4
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_63 {
  type $0 = `${$1}${$1}`;
  type $1 = `^`;

  export interface I extends Record<
    `/(\\^)\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_64 {
  type $0 = `${$1}${$1}`;
  type $1 = `$`;

  export interface I extends Record<
    `/(\\$)\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_65 {
  type $0 = `${$1}\x02`;
  type $1 = `\\\\`;

  export interface I extends Record<
    `/(\\\\$)\\2/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_66 {
  type $0 = `${U1}${$1th}${U2}${a}${string}${U3}${$3}${U4}{}${$4}`;
  type $1th = `first`;
  type a = ` `;
  type $3 = `888`;
  type $4 = `${$3}`;
  
  type U1 = `&&`;
  type U2 = ` %%%`;
  type U3 = ``;
  type U4 = ` `;

  export interface I extends Record<
    `/(?:&&)(?<$1th>first)(?: %%%)(?<a> )[|](?:)(888)(?: ){}(\\3)/`,
    {
      $0: $0;
      $1th: $1th;
      a: a;
      $3: $3;
      $4: $4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_67 {
  type $0 = `${U1}${$1}${avva}${string}${U2} {}${avvva}`;
  type $1 = `FF`;
  type avva = ` JJJ`;
  type avvva = `${avva}`;
  
  type U1 = `uN`;
  type U2 = `888`;

  export interface I extends Record<
    `/(?:uN)(FF)(?<avva> JJJ)[|](?:888) {}(?<avvva>\\2)/`,
    {
      $0: $0;
      $1: $1;
      avva: avva;
      avvva: avvva
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_68 {
  type $0 = `${U1}${$1}${U2}${a}${string}${U3}${$3}${U4}{}${$4}`;
  type $1 = ``;
  type a = ` `;
  type $3 = `888=BBB`;
  type $4 = `${a}`;
  
  type U1 = ''; // undefined & `&&`;
  type U2 = ''; // undefined & ` %%%`;
  type U3 = ``;
  type U4 = ` `;

  export interface I extends Record<
    `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888=BBB)(?: ){}(\\2)/`,
    {
      $0: $0;
      $1: $1;
      a: a;
      $3: $3;
      $4: $4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_69 {
  type $0 = `${$1}a${string}a${$1}`;
  type $1 = `${string}.`;

  export interface I extends Record<
    `/(\\W\\.)a...a\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_70 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `%`;

  export interface I extends Record<
    `/(%)\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_71 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `\\${string}`;

  export interface I extends Record<
    `/(\\${string})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_72 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `\\\\${string}[${string}`;

  export interface I extends Record<
    `/(\\\\.[${string})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_73 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `\\\\${string}`;

  export interface I extends Record<
    `/(\\\\${string})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_74 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `\\\${2}`;

  export interface I extends Record<
    `/(\\\${2})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_75 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `${string}`;

  export interface I extends Record<
    `/(${string})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_76 {
  type $0 = `${$1}\\\\${$1 | ''}`;
  type $1 = `\\\${2}`;

  export interface I extends Record<
    `/(\\\${2})\\\\\\1?/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_77 {
  type $0 = `${nnn}\\\\${nnn | ''} \\${nnn} `;
  type nnn = `\\\${n}`;

  export interface I extends Record<
    `/(?<nnn>\\\${n})\\\\\\k<nnn>? \\\\<nnn> /g`,
    {
      $0: $0;
      nnn: nnn
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_78 {
  type $0 = `${a}${a}`;
  type a = `\\\${2}`;

  export interface I extends Record<
    `/(?<a>\\\${2})\\k<a>/g`,
    {
      $0: $0;
      a: a
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_79 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `\\\\${string}3}`;

  export interface I extends Record<
    `/(\\\\[\${]3})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_80 {
  type $0 = `${$1}${string}\\${string}\\${string}`;
  type $1 = `[\\${''|`${`\\ `}${string}`}`;

  export interface I extends Record<
    `/(\\[^\\\\ *)\\W\\\\s\\S\\\\S/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_81 {
  type $0 = `${$1}\\\\${$1}`;
  type $1 = `${string}4}`;

  export interface I extends Record<
    `/([\\\${\\]]4})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_82 {
  type $0 = ``;

  export interface I extends Record<
    `//[`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_83 {
  type $0 = `${$1}${$1}`;
  type $1 = `${string}6}`;

  export interface I extends Record<
    `/(${string}6})\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_84 {
  type $0 = `${`\n`}`;

  export interface I extends Record<
    `/\\n/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_85 {
  type $0 = `_\` ${$1}`;
  type $1 = ``;

  export interface I extends Record<
    `/_\` ()/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_86 {
  type $0 = `${string}`;

  export interface I extends Record<
    `/\\u/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_87 {
  type $0 = `${U1}${$1}c${$2}`;
  type $1 = `b`;
  type $2 = ``;
  
  type U1 = `a` | `${$1 | ''}`;

  export interface I extends Record<
    `/(?:a|(b))\\1c()/`,
    {
      $0: $0;
      $1?: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_88 {
  type $0 = `${$1}${$1}`;
  type $1 = `a`;

  export interface I extends Record<
    `/\\1(a)/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_89 {
  type $0 = `${self}${self}`;
  type self = `s`;

  export interface I extends Record<
    `/\\k<self>(?<self>s)/`,
    {
      $0: $0;
      self: self
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_90 {
  type $0 = `${self}`;
  type self = ``;

  export interface I extends Record<
    `/(?<self>)/`,
    {
      $0: $0;
      self: self
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_91 {
  type $0 = `${U1}c`;
  type $1 = `a`;
  type $2 = `b`;
  
  type U1 = ''; // `${$1}${$2}`;

  export interface I extends Record<
    `/(?<=(a)(b))c/`,
    {
      $0: $0;
      $1: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_92 {
  type $0 = `${U1}c`;
  type $1 = `${string}`;
  
  type U1 = ''; // `${$1}`;

  export interface I extends Record<
    `/(?<=([ab])+)c/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_93 {
  type $0 = `c${U1}`;
  type $1 = `ab`;
  
  type U1 = ''; // `${$1}`;

  export interface I extends Record<
    `/c(?=(ab))/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_94 {
  type $0 = `${U1}${U2}`;
  type $1 = `a`;
  type $2 = `ab`;
  type $3 = `c`;
  type $4 = `bc`;
  
  type U1 = `${$1 | ''}` | `${$2 | ''}`;
  type U2 = `${$3 | ''}` | `${$4 | ''}`;

  export interface I extends Record<
    `/(?:(a)|(ab))(?:(c)|(bc))/`,
    {
      $0: $0;
      $1?: $1;
      $2?: $2;
      $3?: $3;
      $4?: $4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_95 {
  type $0 = `WORD`;

  export interface I extends Record<
    `/\\bWORD\\B/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_96 {
  type $0 = `${U1}${''|`${`a`}${string}`}b${$1}`;
  type $1 = `${`a`}${string}`;
  
  type U1 = ''; // `${$1}`;

  export interface I extends Record<
    `/(?=(a+))a*b\\1/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_97 {
  type $0 = `${U1}b`;
  
  type U1 = ''; // `a`;

  export interface I extends Record<
    `/(?=a)?b/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_98 {
  type $0 = `${U1}`;
  type $1 = `${string}${string}`;
  type $2 = `${string}${string}`;
  
  type U1 = ''; // `${$1}${$2}`;

  export interface I extends Record<
    `/(?<=([ab]+)([bc]+))$/`,
    {
      $0: $0;
      $1: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_99 {
  type $0 = `${U1}${number}${U2}`;
  
  type U1 = ''; // `$`;
  type U2 = `.${number | ''}`;

  export interface I extends Record<
    `/(?<=\\$)\\d+(?:\\.\\d*)?/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_100 {
  type $0 = `.${U1}`;
  
  type U1 = `png` | `jp${`e` | ''}g` | `gif`;

  export interface I extends Record<
    `/\\.(?:png|jpe?g|gif)$/i`,
    IgnoreCaseRecord<{
      $0: $0
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_101 {
  type $0 = `${U1}=${$1}${$2}${$1}`;
  type $1 = `${string}`;
  type $2 = `${string | ''}`;
  
  type U1 = `title` | `name`;

  export interface I extends Record<
    `/(?:title|name)=(["'])(.*?)\\1/`,
    {
      $0: $0;
      $1: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_102 {
  type $0 = `${string} ${string} ${string} ${string}  `;

  export interface I extends Record<
    `/\\w \\W \\s \\S \\B \\b/`,
    {
      $0: $0
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
    Nc1e1ffc130aead13aa199b62448b178c_101.I,
    Nc1e1ffc130aead13aa199b62448b178c_102.I {
    '': ''
}