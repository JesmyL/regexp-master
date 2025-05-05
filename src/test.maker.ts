import { makeNamedRegExp } from './makeNamedRegExp';

const printMatch = (
  { regExp, transform }: { transform(match: RegExpMatchArray | [string, ...string[]]): any; regExp: RegExp },
  text: string,
) => {
  const match = text.match(regExp);
  console.info({ text, regExp, matchDict: match && [transform(match).$0, transform(match)], match });
};

export const testMaker = () => {
  if (1) return;

  const arg = [''] as [''];
  console.info(`
        //////////////////////////////////////////////////////
        //////////////////// TEST START //////////////////////
        //////////////////////////////////////////////////////
 `);

  if (0) {
    const regs = makeNamedRegExp(
      // X    1 X        2         3   4    X      5
      `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888)(?: ){}(\\2)(\\k<a>?)/`,
    );

    printMatch(regs, ' |888 {}  ');
    printMatch(regs, ' |888 {} ');
    printMatch(regs, ' |888 {}');
  }

  if (0) {
    const regs = makeNamedRegExp(`/(?:a|(b))\\1c/`);

    regs.transform(arg).$0;

    // OK
    printMatch(regs, 'ac');
    printMatch(regs, 'aac');
    printMatch(regs, 'bac');
    printMatch(regs, 'bbc');

    // NULL
    printMatch(regs, 'a\x01c');
    printMatch(regs, 'abc');
  }

  if (1) {
    const regs = makeNamedRegExp(`/(1)\\s?text between\\s(?<groupName>named group)( )?\\k<groupName>?/`);

    printMatch(regs, '1text between named group ');
  }

  console.info(`
    //////////////////////////////////////////////////////
    ///////////////////// TEST END ///////////////////////
    //////////////////////////////////////////////////////
`);
};
