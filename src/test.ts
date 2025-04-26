import { makeNamedRegExp } from 'model';

const getValue = <Value>(_: Value) => {};

const arg: [''] = [''];

getValue<string>(makeNamedRegExp('/(?<str>\\w+)/').transform(arg).str);
getValue<string>(makeNamedRegExp('/(?<str>\\w?)/').transform(arg).str);
getValue<string>(makeNamedRegExp('/(?<str>a?)/').transform(arg).str);

getValue<`text`>(makeNamedRegExp('/(?<val>text)/').transform(arg).val);
getValue<`text ${number}${string}`>(makeNamedRegExp('/(?<val>text \\d+/').transform(arg).val);
getValue<`text ${number | ''}${string}`>(makeNamedRegExp('/(?<val>text \\d*/').transform(arg).val);
getValue<`text ${number | ''}${string}`>(makeNamedRegExp('/(?<val>text \\d?/').transform(arg).val);
getValue<`text${string}`>(makeNamedRegExp('/(?<val>text{1,3}/').transform(arg).val);
getValue<`tex${string}`>(makeNamedRegExp('/(?<val>text{0,3}/').transform(arg).val);
getValue<`tex${string}`>(makeNamedRegExp('/(?<val>text{0,}/').transform(arg).val);
getValue<`tex${string}`>(makeNamedRegExp('/(?<val>text{,3}/').transform(arg).val);

getValue<`${number}`>(makeNamedRegExp('/(?<num>\\d)/').transform(arg).num);
getValue<`${number}`>(makeNamedRegExp('/(?<num>\\d{1,3})/').transform(arg).num);
getValue<`${number}` | ''>(makeNamedRegExp('/(?<num>\\d{,3})/').transform(arg).num);
getValue<`${number}` | ''>(makeNamedRegExp('/(?<num>\\d{0,3})/').transform(arg).num);
getValue<`${number}` | ''>(makeNamedRegExp('/(?<num>\\d{0,})/').transform(arg).num);
getValue<`${number}` | ''>(makeNamedRegExp('/(?<num>\\d*)/').transform(arg).num);
getValue<`${number}` | ''>(makeNamedRegExp('/(?<num>\\d?)/').transform(arg).num);

getValue<`${number}${string}`>(makeNamedRegExp('/(?<numStr>\\d+[amn]+)\\s\\n*/').transform(arg).numStr);
getValue<`${number}${string}`>(makeNamedRegExp('/(?<numStr>\\d{1,3}[amn]+)\\s\\n*/').transform(arg).numStr);
getValue<`${number}${string}`>(makeNamedRegExp('/(?<numStr>\\d{1,}[amn]+)\\s\\n*/').transform(arg).numStr);
getValue<string>(makeNamedRegExp('/(?<numStr>\\d{0,3}[amn]+)\\s\\n*/').transform(arg).numStr);
getValue<string>(makeNamedRegExp('/(?<numStr>\\d{,3}[amn]+)\\s\\n*/').transform(arg).numStr);
getValue<string>(makeNamedRegExp('/(?<numStr>\\d?[amn]+)\\s\\n*/').transform(arg).numStr);
getValue<string>(makeNamedRegExp('/(?<numStr>\\d*[amn]+)\\s\\n*/').transform(arg).numStr);

getValue<`text ${number}${string}`>(makeNamedRegExp('/(?<conNum>text \\d\\n*/').transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp('/(?<conNum>text \\d)/').transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp('/(?<num>text \\d{2,3})/').transform(arg).num);
getValue<`text ${number}`>(makeNamedRegExp('/(?<num>text \\d{1,})/').transform(arg).num);
getValue<`text ${number | ''}`>(makeNamedRegExp('/(?<num>text \\d{0,3})/').transform(arg).num);
getValue<`text ${number | ''}`>(makeNamedRegExp('/(?<num>text \\d{0,})/').transform(arg).num);
getValue<`text ${number | ''}`>(makeNamedRegExp('/(?<num>text \\d{,3})/').transform(arg).num);

getValue<`text ${number}`>(makeNamedRegExp('/(?<conNum>text [1-3])/').transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp('/(?<conNum>text [1-3]+)/').transform(arg).conNum);
getValue<`text ${number}`>(makeNamedRegExp('/(?<num>text [1-3]{1,3})/').transform(arg).num);
getValue<`text ${number}`>(makeNamedRegExp('/(?<num>text [1-3]{1,})/').transform(arg).num);
getValue<`text ${number | ''}`>(makeNamedRegExp('/(?<num>text [1-3]{0,3})/').transform(arg).num);
getValue<`text ${number | ''}`>(makeNamedRegExp('/(?<num>text [1-3]{,3})/').transform(arg).num);
getValue<`text ${number | ''}`>(makeNamedRegExp('/(?<conNum>text [1-3]?)/').transform(arg).conNum);
getValue<`text ${number | ''}`>(makeNamedRegExp('/(?<conNum>text [1-3]*)/').transform(arg).conNum);

getValue<{ num?: `${number}`; bum: 'aa' }>(makeNamedRegExp('/(?<num>[1-3]+)?(?<bum>aa)/').transform(arg));

getValue<`5${string}` | undefined>(makeNamedRegExp('/(?<txt>5|\\d)?/').transform(arg).txt);
getValue<`a${string}`>(makeNamedRegExp('/(?<txt>a\\\\\\\\\\|b|c|d)/').transform(arg).txt);
getValue<`a${string}`>(makeNamedRegExp('/(?<txt>a\\\\\\\\\\|b|c|d)/').transform(arg).txt);
getValue<`a${string}`>(makeNamedRegExp('/(?<txt>a|s|f\\\\\\\\|b|c\\d|d)/').transform(arg).txt);

getValue<{ optional1?: `opt1` | 'opt' | undefined }>(
  makeNamedRegExp('/(?<optional1>opt1|opt)|(?<optional2>opt2)(?<req>req)/').transform(arg),
);
getValue<`${number}` | undefined>(makeNamedRegExp('/(?<num>[1-3]+)?/').transform(arg).num);
getValue<`${number}` | undefined>(makeNamedRegExp('/(?<num>1|2)?/').transform(arg).num);
