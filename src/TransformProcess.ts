import { makeRegExp } from './makeRegExp';
import {
  CloseParenthesisStubSymbol,
  GroupInfo,
  GroupName,
  GroupStubSymbol,
  OpenParenthesisStubSymbol,
  SlashStubSymbol,
  StringStubSymbol,
  UnionStubSymbol,
} from './types';

export class TransformProcess {
  makerInvokesContentSplitterRegExp: RegExp;
  content: string;
  bracketsSet = new Set(['`', '"', "'"]);
  fileMD5: string;

  stringStubSymbol = StringStubSymbol.def;
  slashStubSymbol = SlashStubSymbol.def;
  unionStubSymbol = UnionStubSymbol.def;
  openParenthesisStubSymbol = OpenParenthesisStubSymbol.def;
  closeParenthesisStubSymbol = CloseParenthesisStubSymbol.def;

  constructor(options: { importNameMatch: RegExpMatchArray; content: string; fileMD5: string }) {
    this.fileMD5 = options.fileMD5;
    this.content = options.content;

    this.makerInvokesContentSplitterRegExp = makeRegExp(
      `/${
        options.importNameMatch[1] ?? 'makeNamedRegExp'
      }\\(\\s*(?:\\s*(?:\\/{2,}.*|\\/\\*[\\w\\W]+?\\*\\/)\\s*\n*)*/gm`,
    );
  }

  process = () => {
    this.content = this.cutFileComments(this.content);

    const splits = this.content.split(this.makerInvokesContentSplitterRegExp);
    const recordTypes: string[] = [];
    const recordPartsTypes: string[] = [];

    for (let userRegStri = 1; userRegStri < splits.length; userRegStri++) {
      const leadRegBracket = splits[userRegStri][0];

      const findFreeBracketReg = makeRegExp(`/(?<!\\\\)\\${leadRegBracket}/`);
      const index = splits[userRegStri].slice(1).search(findFreeBracketReg);
      const userWritedRegStr = splits[userRegStri]?.slice(1, index + 1);

      if (!this.bracketsSet.has(leadRegBracket)) throw `Pass incorrect string regexp "${userWritedRegStr}"`;

      const groupStubSymbols = this.setStubSymbols(userWritedRegStr);

      const groups: Record<number, string> = {};
      const groupSymbolsDict: Record<number, GroupStubSymbol> = {};
      const symbolGroupsDict: Record<GroupStubSymbol, number> = {} as never;

      let regStr = userWritedRegStr.slice(1, userWritedRegStr.lastIndexOf('/'));
      const regFlags = userWritedRegStr.slice(regStr.length + 2);

      regStr = this.replaceSlashedParenthesis(regStr);
      regStr = this.replaceStringTemplateInserts(regStr);
      regStr = this.replaceSlashedOrSign(regStr);

      const regReplacedStringTemplateInserts = regStr;

      regStr = this.replaceSlashes(regStr);
      regStr = this.insertGroupsWithReplace(regStr, groups, groupStubSymbols, groupSymbolsDict, symbolGroupsDict);

      const isEachGroupIsOptional = regStr.includes('|');

      const groupIndexes = Object.keys(groups).map(Number).sort(this.sortGroupIndexes);
      const groupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo> = {
        [GroupStubSymbol.zero]: {
          groupName: '$0' as never,
          groupContent: regStr,
          groupStr: regStr,
          groupSymbol: GroupStubSymbol.zero,
          index: -1,
          isOpt: false,
          isOptChildren: isEachGroupIsOptional,
        },
      };

      for (const groupIndexi in groupIndexes) {
        const groupIndex = groupIndexes[groupIndexi];
        const groupStr = groups[groupIndex];
        const groupNameMatch = groupStr.match(/\((?:\?<([^>]*?)>)?/);

        if (groupNameMatch === null) throw 'Incorrect RegExp group';
        const groupName = groupNameMatch[1] as GroupName | undefined;
        const isNoname = groupName === undefined;

        if (!isNoname) {
          if (groupName === '') throw 'Group name can not be empty - <>';
          if (groupName.match(/^\d|[^$_\w]/)) throw `Incorrect group name - <${groupName}>`;
        }

        const groupSymbol = groupSymbolsDict[groupIndex];
        const groupContent = groupStr.slice(isNoname ? 1 : groupName.length + 4, groupStr.lastIndexOf(')'));

        const isOptChildren = !isEachGroupIsOptional && groupContent.includes('|');

        const isOpt =
          isEachGroupIsOptional ||
          this.checkIsGroupOptional(groupStr) ||
          Object.values(groupSymbolToInfoDict).some(({ groupStr, isOpt, isOptChildren }) => {
            if (!groupStr.includes(groupSymbol)) return false;
            return isOpt || isOptChildren;
          });

        groupSymbolToInfoDict[groupSymbol] = {
          isOpt,
          isOptChildren,
          index: groupIndex,
          groupStr,
          groupSymbol: groupSymbolsDict[groupIndex],
          groupName: groupName ?? (`$${+groupIndexi + 1}` as GroupName),
          groupContent,
        };
      }

      const groupPartTypes: Record<GroupName, string> = {} as never;
      const recordFieldsTypes: string[] = [];

      Object.values(groupSymbolToInfoDict).forEach(groupInfo => {
        if (groupPartTypes[groupInfo.groupName] !== undefined) throw `Inclusive group name - <${groupInfo.groupName}>`;
        const typeName = this.makeGroupTypeName(userRegStri, groupInfo.groupName);
        const typeContent = this.makeGroupTypeFromGroupContent(
          userRegStri,
          groupSymbolToInfoDict,
          groupStubSymbols,
          groupInfo.groupContent,
        );

        groupPartTypes[groupInfo.groupName] = `type ${typeName} = ${typeContent};`;
        recordFieldsTypes.push(`${groupInfo.groupName}${groupInfo.isOpt ? '?' : ''}: ${typeName}`);
      });

      recordTypes.push(
        `Record<\n    ${this.makeRegTypeKey(
          regReplacedStringTemplateInserts,
          regFlags,
        )},\n    {\n      ${recordFieldsTypes.join(';\n      ')}}\n  >`,
      );
      recordPartsTypes.push(Object.values(groupPartTypes).join('\n'));
    }

    if (!recordTypes.length) return null;

    return {
      types: `${recordPartsTypes.join(
        '\n\n',
      )}\n\n\ninterface _GlobalScopedNamedRegExpMakerGeneratedTypes\n  extends ${recordTypes.join(',\n  ')} {' ': ''}`,
    };
  };

  makeGroupTypeName = (userRegStri: number, groupName: GroupName) => `T${this.fileMD5}_${userRegStri}_${groupName}`;

  makeGroupTypeParts = () => {};

  makeRegTypeKey = (regStr: string, regFlags: string) => {
    return `\`/${regStr
      .replace(makeRegExp(`/${this.stringStubSymbol}/g`), '${string}')
      .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '\\\\|')
      .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '\\\\(')
      .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), '\\\\)')}/${regFlags}\``;
  };

  makeGroupTypeFromGroupContent = (
    userRegStri: number,
    groupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo>,
    groupSymbols: GroupStubSymbol[],
    groupContent: string,
  ) => {
    if (!groupContent) return '``';

    for (const groupSymbol of groupSymbols) {
      const groupInfo = groupSymbolToInfoDict[groupSymbol];

      groupContent = groupContent.replace(
        makeRegExp(`/${groupSymbol}+/g`),
        () =>
          `\${${this.makeGroupTypeName(userRegStri, groupInfo.groupName)}${
            groupInfo.isOpt ? ` ${this.unionStubSymbol} ''` : ''
          }}`,
      );
    }

    const contentWithUnions = `\`${groupContent
      .replace(makeRegExp(`/${this.stringStubSymbol}/g`), '${string}')
      .replace(makeRegExp(`/${this.slashStubSymbol}/g`), '\\')
      .replace(/`\${string}`/g, 'string')
      .split('|')
      .join('` | `')
      .replace(
        makeRegExp(`/(?:(\\\\*)\\[(?:\\d[-\\d]*\\d)?]|(\\\\{1,})d)(${this.quantifierRegStr}|)/g`),
        (all, slashes: string | undefined, slashes1: string | undefined, quantifier: string | undefined) => {
          const optionalSign = this.checkIsOptionalQuantifier(quantifier) ? " | ''" : '';

          if (slashes1 !== undefined) {
            return this.checkIsSlashedSymbol(slashes1) ? `\${number${optionalSign}}` : all;
          }

          return this.checkIsSlashedSymbol(slashes) ? all : `\${number${optionalSign}}`;
        },
      )
      .replace(makeRegExp(`/((?:\\\\\\\\)?[^\\\`])(${this.quantifierRegStr})/`), (all, char, quantifier) =>
        this.checkIsOptionalQuantifier(quantifier) ? `\${\`${char}\` | ''}` : all,
      )
      .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '|')
      .replace(makeRegExp(`/${this.unionStubSymbol}/g`), '|')
      .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '(')
      .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), ')')}\``;

    return contentWithUnions;
  };

  checkIsOptionalQuantifier = (quantifier: string | undefined) =>
    quantifier !== undefined &&
    (quantifier.endsWith('?') ||
      quantifier.endsWith('*') ||
      quantifier.startsWith('{0,') ||
      quantifier.startsWith('{,') ||
      quantifier === '{0}');

  sortGroupIndexes = (a: number, b: number) => a - b;

  setStubSymbols = (userWritedRegStr: string) => {
    let stubCharCode = 999;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.stringStubSymbol = String.fromCharCode(stubCharCode) as StringStubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.slashStubSymbol = String.fromCharCode(stubCharCode) as SlashStubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.unionStubSymbol = String.fromCharCode(stubCharCode) as UnionStubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.openParenthesisStubSymbol = String.fromCharCode(stubCharCode) as OpenParenthesisStubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.closeParenthesisStubSymbol = String.fromCharCode(stubCharCode) as CloseParenthesisStubSymbol;

    const groupStubSymbols: GroupStubSymbol[] = [];

    userWritedRegStr.replace(/(\\*)\(/g, (all, slashes) => {
      if (this.checkIsSlashedSymbol(slashes)) return all;

      do stubCharCode++;
      while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));

      groupStubSymbols.push(String.fromCharCode(stubCharCode) as never);

      return all;
    });

    return groupStubSymbols;
  };

  checkIsGroupOptional = (groupStr: string) => !!groupStr.match(/(?:[*?]|{(?:|0),\d*})\??$/);

  static checkIsSlashedSymbol = (slashes: string | undefined, count: 2 | 4 = 4) =>
    (slashes?.length && slashes.length % count) ?? 0;
  checkIsSlashedSymbol = TransformProcess.checkIsSlashedSymbol;

  cutFileComments = (content: string) => content.replace(/(?:^|\n) *\/{2,}.*/g, '');

  replaceStringTemplateInserts = (regStr: string) =>
    regStr.replace(/(\\*)(\${[\w.]+})/g, (all, slashes) => {
      return this.checkIsSlashedSymbol(slashes, 2) ? all : `${slashes.slice(2)}${this.stringStubSymbol}`;
    });

  replaceSlashedOrSign = (regStr: string) => {
    return regStr.replace(/(\\+?)\|/g, (all, slashes: string) => {
      return this.checkIsSlashedSymbol(slashes) ? `${slashes.slice(2)}${this.unionStubSymbol.repeat(3)}` : all;
    });
  };

  replaceSlashedParenthesis = (regStr: string) => {
    return regStr.replace(
      /(\\+?)\(|(\\+?)\)/g,
      (all, openSlashes: string | undefined, closeSlashes: string | undefined) => {
        if (openSlashes !== undefined) {
          return this.checkIsSlashedSymbol(openSlashes)
            ? `${openSlashes.slice(2)}${this.openParenthesisStubSymbol.repeat(3)}`
            : all;
        }

        if (closeSlashes !== undefined) {
          return this.checkIsSlashedSymbol(closeSlashes)
            ? `${closeSlashes.slice(2)}${this.closeParenthesisStubSymbol.repeat(3)}`
            : all;
        }

        return all;
      },
    );
  };

  quantifierRegStr = '[?+*]\\??|{,\\d+}|{\\d+,\\d*?}|{\\d+}' as const;

  insertGroupsWithReplace = (
    regStr: string,
    groups: Record<number, string>,
    otherStubSymbols: GroupStubSymbol[],
    groupSymbolsDict: Record<number, GroupStubSymbol>,
    symbolGroupsDict: Record<GroupStubSymbol, number>,
  ) => {
    let isNeedReplace = true;
    let otherStubSymboli = 0;

    while (isNeedReplace) {
      isNeedReplace = false;
      regStr = regStr.replace(makeRegExp(`/\\([^()]*?\\)(?:${this.quantifierRegStr}|)/g`), (all, index) => {
        isNeedReplace = true;

        groups[index] = all;
        groupSymbolsDict[index] = otherStubSymbols[otherStubSymboli++] as GroupStubSymbol;
        symbolGroupsDict[groupSymbolsDict[index]] = index;

        return groupSymbolsDict[index].repeat(all.length);
      });
    }

    return regStr;
  };

  replaceSlashes = (regStr: string) => {
    return regStr.replace(/\\{4}/g, () => this.slashStubSymbol + this.slashStubSymbol);
  };
}
