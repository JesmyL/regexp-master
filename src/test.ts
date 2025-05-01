import { makeNamedRegExp } from 'model';

const getValue = <Value>(_: Value) => {};
const getKeys = <ReqKeys extends string, OptKeys extends string = string>(
  _: Record<ReqKeys, unknown> & Partial<Record<OptKeys, unknown>>,
) => {};

const arg: [``] = [``];

getValue<string>(makeNamedRegExp(`/(?<str>\\w+)/`).transform(arg).str);
getValue<string>(makeNamedRegExp(`/(?<str>\\w?)/`).transform(arg).str);
getValue<string>(makeNamedRegExp(`/(?<str>a?)/`).transform(arg).str);

getValue<`text`>(makeNamedRegExp(`/(?<val>text)/`).transform(arg).val);
getValue<`text ${number}${string}`>(makeNamedRegExp(`/(?<val>text \\d+)/`).transform(arg).val);
getValue<`text ${number | ``}${string}`>(makeNamedRegExp(`/(?<val>text \\d*)/`).transform(arg).val);
getValue<`text ${number | ``}${string}`>(makeNamedRegExp(`/(?<val>text \\d?)/`).transform(arg).val);
getValue<`text${string}`>(makeNamedRegExp(`/(?<val>text{1,3})/`).transform(arg).val);
getValue<`tex${string}`>(makeNamedRegExp(`/(?<val>text{0,3})/`).transform(arg).val);
getValue<`tex${string}`>(makeNamedRegExp(`/(?<val>text{0,})/`).transform(arg).val);
getValue<`tex${string}`>(makeNamedRegExp(`/(?<val>text{,3})/`).transform(arg).val);

getValue<`${number}`>(makeNamedRegExp(`/(?<num>\\d)/`).transform(arg).num);
getValue<`${number}`>(makeNamedRegExp(`/(?<num>\\d{1,3})/`).transform(arg).num);
getValue<`${number}` | ``>(makeNamedRegExp(`/(?<num>\\d{,3})/`).transform(arg).num);
getValue<`${number}` | ``>(makeNamedRegExp(`/(?<num>\\d{0,3})/`).transform(arg).num);
getValue<`${number}` | ``>(makeNamedRegExp(`/(?<num>\\d{0,})/`).transform(arg).num);
getValue<`${number}` | ``>(makeNamedRegExp(`/(?<num>\\d*)/`).transform(arg).num);
getValue<`${number}` | ``>(makeNamedRegExp(`/(?<num>\\d?)/`).transform(arg).num);

getValue<`${number}${string}`>(makeNamedRegExp(`/(?<numStr>\\d+[amn]+)\\s\\n*/`).transform(arg).numStr);
getValue<`${number}${string}`>(makeNamedRegExp(`/(?<numStr>\\d{1,3}[amn]+)\\s\\n*/`).transform(arg).numStr);
getValue<`${number}${string}`>(makeNamedRegExp(`/(?<numStr>\\d{1,}[amn]+)\\s\\n*/`).transform(arg).numStr);
getValue<string>(makeNamedRegExp(`/(?<numStr>\\d{0,3}[amn]+)\\s\\n*/`).transform(arg).numStr);
getValue<string>(makeNamedRegExp(`/(?<numStr>\\d{,3}[amn]+)\\s\\n*/`).transform(arg).numStr);
getValue<string>(makeNamedRegExp(`/(?<numStr>\\d?[amn]+)\\s\\n*/`).transform(arg).numStr);
getValue<string>(makeNamedRegExp(`/(?<numStr>\\d*[amn]+)\\s\\n*/`).transform(arg).numStr);

getValue<`text ${number}${`\n` | ``}`>(makeNamedRegExp(`/(?<conNum>text \\d\\n*)/`).transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp(`/(?<conNum>text \\d)/`).transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp(`/(?<num>text \\d{2,3})/`).transform(arg).num);
getValue<`text ${number}`>(makeNamedRegExp(`/(?<num>text \\d{1,})/`).transform(arg).num);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<num>text \\d{0,3})/`).transform(arg).num);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<num>text \\d{0,})/`).transform(arg).num);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<num>text \\d{0})/`).transform(arg).num);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<num>text \\d{,3})/`).transform(arg).num);

getValue<`text ${number}`>(makeNamedRegExp(`/(?<conNum>text [1-3])/`).transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp(`/(?<conNum>text [1-3]+)/`).transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp(`/(?<num>text [1-3]{1,3})/`).transform(arg).num);
getValue<`text ${number}`>(makeNamedRegExp(`/(?<num>text [1-3]{1,})/`).transform(arg).num);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<num>text [1-3]{0,3})/`).transform(arg).num);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<num>text [1-3]{,3})/`).transform(arg).num);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<conNum>text [1-3]?)/`).transform(arg).conNum);
getValue<`text ${number | ``}`>(makeNamedRegExp(`/(?<conNum>text [1-3]*)/`).transform(arg).conNum);

getValue<{ num?: `${number}`; bum: `aa` }>(makeNamedRegExp(`/(?<num>[1-3]+)?(?<bum>aa)/`).transform(arg));

getValue<`5` | `${number}` | undefined>(makeNamedRegExp(`/(?<txt>5|\\d)?/`).transform(arg).txt);
getValue<`a\\\\\\\\|b` | `c` | `${`d` | ``}`>(makeNamedRegExp(`/(?<txt>a\\\\\\\\\\|b|c|d?)/`).transform(arg).txt);

getValue<`a` | `s` | `f\\\\` | `b` | `c${number}` | `d` | string>(
  makeNamedRegExp(`/(?<txt>a|s|f\\\\\\\\|b|c\\d|d|[-adf ])/`).transform(arg).txt,
);

getValue<{ optional1?: `opt1` | `opt` | undefined }>(
  makeNamedRegExp(`/(?<optional1>opt1|opt)|(?<optional2>opt2)(?<req>req)/`).transform(arg),
);
getValue<`${number}` | undefined>(makeNamedRegExp(`/(?<num>[1-3]+)?/`).transform(arg).num);
getValue<`${number}` | undefined>(makeNamedRegExp(`/(?<num>1|2)?/`).transform(arg).num);
getValue<{ opt?: ``; opt1?: ``; r: `12` | `` }>(makeNamedRegExp(`/(?<r>12(?<opt>)|(?<opt1>))/`).transform(arg));

const str = `123`;
const a = { b: `` };

getKeys<`str` | `$3` | `$0`, `$2` | `$4` | `$5`>(
  makeNamedRegExp(
    `/\\\\(?<str>\\w+\${)(\\\\ \\d[1,2])?((\\d{3,\${txt}\\${str})|(\\\${txt}\\\\\${txt1}\\\\\\\${txt2}\\\\\\\\\${txt3}${str}|${a.b}))/`,
  ).transform(arg),
);

const veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString = `str`;

makeNamedRegExp(
  `/\\(?<!>\\w+\${)(${
    //
    veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString
    //
    //
  } \\d[1,2])?${str}((\\d{3,\${txt}\\${str})|(\${str}|${
    a.b
  }|(?<name>)[1479]))(?<name1>(?<opt1> \\\\\\(  )|(?<opt2> )|)${veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString}/`,
).transform(arg).name1;

makeNamedRegExp(
  // ``,
  `/(?<$0th>(?<$1th>(?<$2nd>){,3})(nonamϭϰe| )+(?<$3th>\\d{2,3}){2,3}\\\\\\\\\\\\\\|\\\${ \\(?<$4>(?<$5th> {3,5}(?<$6th>(?<$7th>(?<$8th>))(){[234]?}(){,})Ϩ)\\)) ${str}in zero/gim`,
).transform(arg).$0;

getKeys<`$0` | `$0th` | `$2`>(makeNamedRegExp(`/(?<$0th> |sds )(noname|)/gim`).transform(arg));

getValue<`[${string}]` | undefined>(
  makeNamedRegExp(
    `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${
      //
      str
    })(?<associations>_?(?<secretWidStr>[${
      //
      a.b
    }]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
  ).transform(arg).info,
);

getValue<string | undefined>(
  makeNamedRegExp(
    `/(?<bookn>\\d?(?!(\\s*([а-яё]+))))\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>(?!\\d{1,3}))(\\s*(?<verseSeparator>[-,]?)\\s*)(?<!finishVerseStr>\\d{1,3})?)?)?/i`,
  ).transform(arg).verseSeparator,
);

getValue<{ $2?: `ababa${string}` }>(makeNamedRegExp(`/(?:((?!(ababa+?)) ))(jaja) /`).transform(arg));

getValue<{ $3: `job` }>(makeNamedRegExp(`/(?:((?!(ababa+?)) ))[|](job) /`).transform(arg));

getKeys<`name` | `$2` | `name1` | `$4`>(
  makeNamedRegExp(`/(?<name>n)(?:just 1)(2)(?im-s:just 2)?(?<name1>n1)(?<=just 3)(4)(?<!just 4)/i`).transform(arg),
);

getValue<{ $0: `^^` }>(makeNamedRegExp(`/(\\^)\\1/g`).transform(arg));
getValue<{ $0: `$$` }>(makeNamedRegExp(`/(\\$)\\1/g`).transform(arg));
getValue<{ $0: `\\\\\x02` }>(makeNamedRegExp(`/(\\\\$)\\2/g`).transform(arg));

getValue<{ $4: '888' }>(
  makeNamedRegExp(
    //X     1             X       2         X   3    X      4
    `/(?:&&)(?<$1th>first)(?: %%%)(?<a> )[|](?:)(888)(?: ){}(\\3)/`,
  ).transform(arg),
);

getValue<{ avvva: ' JJJ' }>(
  makeNamedRegExp(
    //X     1   2               X         3
    `/(?:uN)(FF)(?<avva> JJJ)[|](?:888) {}(?<avvva>\\2)/`,
  ).transform(arg),
);

getValue<` ${string}888=BBB{} `>(
  makeNamedRegExp(
    // X    1 X        2         X   3        X      4
    `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888=BBB)(?: ){}(\\2)/`,
  ).transform(arg).$0,
);

getValue<{ $0: `${string}.a${string}a${string}.` }>(makeNamedRegExp(`/(\\W\\.)a...a\\1/g`).transform(arg));
getValue<{ $0: `%\\\\%` }>(makeNamedRegExp(`/(%)\\\\\\1/g`).transform(arg));

const abc = `abc`;
getValue<{ $0: `\\${string}\\\\\\${string}` }>(makeNamedRegExp(`/(\\${1})\\\\\\1/g`).transform(arg));
getValue<{ $0: `\\\\${string}[${string}\\\\\\${string}[${string}` }>(
  makeNamedRegExp(`/(\\\\.[${1})\\\\\\1/g`).transform(arg),
);
getValue<{ $0: `\\\\${string}\\\\\\\\${string}` }>(makeNamedRegExp(`/(\\\\${abc})\\\\\\1/g`).transform(arg));
getValue<{ $0: `\\\${2}\\\\\\\${2}` }>(makeNamedRegExp(`/(\\\${2})\\\\\\1/g`).transform(arg));

// @ts-expect-error
getValue<{ $0: `\${2}\\\\\${2}` }>(makeNamedRegExp(`/($\{2})\\\\\\1/g`).transform(arg).$0);

getValue<{ $0: `\\\${2}\\\\${`\\\${2}` | ''}` }>(makeNamedRegExp(`/(\\\$\{2})\\\\\\1?/g`).transform(arg));
getValue<{ $0: `\\\${n}\\\\${`\\\${n}` | ''} \\\\\${n} ` }>(
  makeNamedRegExp(`/(?<nnn>\\\$\{n})\\\\\\<nnn>? \\\\<nnn> /g`).transform(arg),
);
getValue<{ $0: `\\\${2}\\\\\\\${2}` }>(makeNamedRegExp(`/(\\$\{2})\\\\\\1/g`).transform(arg));
getValue<{ $0: `\\\\${string}3}\\\\\\\\${string}3}` }>(makeNamedRegExp(`/(\\\\[\$\{]3})\\\\\\1/g`).transform(arg));
getValue<{ $0: `[\\${`\\ ` | ``}${string}${string}\\${string}` }>(
  makeNamedRegExp(`/(\\[\^\\\\\ \*)\\W\\\\\s\\S\\\\\S/g`).transform(arg),
);

getValue<{ $0: `${string}4}\\\\${string}4}` }>(makeNamedRegExp(`/([\\\${\\]]4})\\\\\\1/g`).transform(arg));

getValue<{ $0: `${string}5}${string}5}` }>(
  // @ts-expect-error
  makeNamedRegExp(
    // @ts-expect-error
    `/([\\` +
      //
      123 +
      `\${]5})\\1/g`,
  ).transform(arg),
);

getValue<{ $0: `${string}6}${string}6}` }>(makeNamedRegExp(`/([ \\]\` + \\]\\\`$\{]6})\\1/g`).transform(arg));
getValue<{ $0: `\n` }>(makeNamedRegExp(`/\\n/g`).transform(arg));
getValue<{ $0: `_\` ` }>(makeNamedRegExp(`/_\` ()/g`).transform(arg));
getValue<{ $0: string }>(makeNamedRegExp(`/\\u/g`).transform(arg));
