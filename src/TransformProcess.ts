import { makeNamedRegExp } from './makeNamedRegExp';
import { makeRegExp } from './makeRegExp';
import { GroupInfo, GroupName, GroupStubSymbol, StubSymbol } from './types';

export class TransformProcess {
  makerInvokesContentSplitterRegExp: RegExp;
  content: string;
  bracketsSet = new Set(['`', '"', "'"]);
  fileMD5: string;

  stringStubSymbol = StubSymbol.def;
  dotStubSymbol = StubSymbol.def;
  slashStubSymbol = StubSymbol.def;
  unionStubSymbol = StubSymbol.def;
  openParenthesisStubSymbol = StubSymbol.def;
  closeParenthesisStubSymbol = StubSymbol.def;
  closeSquareBracketStubSymbol = StubSymbol.def;
  openSquareBracketStubSymbol = StubSymbol.def;

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

      const regReplacedStringTemplateInserts = regStr;

      regStr = this.replaceStubs(regStr);
      regStr = this.insertGroupsWithReplace(regStr, groups, groupStubSymbols, groupSymbolsDict, symbolGroupsDict);

      const isEachGroupIsOptional = regStr
        .replace(
          makeRegExp(`/\\[([^${this.stringStubSymbol}]+?)\\](${this.quantifierRegStr}|)/g`),
          this.stringStubSymbol,
        )
        .includes('|');
      const groupSymbols = Object.values(groupSymbolsDict);

      const groupIndexes = Object.keys(groups).map(Number).sort(this.sortGroupIndexes);
      const uncountableGroupSymbolToInfoDict: Partial<Record<GroupStubSymbol, GroupInfo>> = {};

      const groupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo> = {
        [GroupStubSymbol.zero]: {
          groupName: GroupName.zero,
          groupSymbol: GroupStubSymbol.zero,
          groupStr: regStr,
          groupContent: regStr,
          groupKey: '',
          isOpt: false,
          isOptChildren: isEachGroupIsOptional,
          isHasSubTypes: this.checkIsHasSubTypes(regStr, groupSymbols),
          isCountable: true,
          parent: null,
          isNever: false,
        },
      };
      let countableGroupi = 0;
      let uncountableGroupi = 0;

      for (const groupIndex of groupIndexes) {
        const groupStr = groups[groupIndex];
        const groupNameMatch = groupStr.match(/\((\?(?:<[!=]|<([^>]*?)>|))?/);

        if (groupNameMatch === null) throw 'Incorrect RegExp group';
        const matchedGroupName = groupNameMatch[2] as GroupName | undefined;
        const isNoname = matchedGroupName === undefined;

        if (!isNoname) {
          if (matchedGroupName === GroupName.empty) throw 'Group name can not be empty - <>';
          if (matchedGroupName.match(/^\d|[^$_\w]/)) throw `Incorrect group name - <${matchedGroupName}>`;
        }

        const groupSymbol = groupSymbolsDict[groupIndex];

        const isUncountable = isNoname && groupNameMatch[1] !== undefined;

        const isOpt =
          isEachGroupIsOptional ||
          this.checkIsGroupOptional(groupStr) ||
          Object.values(groupSymbolToInfoDict).some(({ groupStr, isOpt, isOptChildren }) => {
            if (!groupStr.includes(groupSymbol)) return false;
            return isOpt || isOptChildren;
          });

        if (isUncountable) {
          const { groupContent, groupKey } = this.extractGroupKeyAndContent(groupStr);
          const groupName = `${++uncountableGroupi}` as GroupName;

          uncountableGroupSymbolToInfoDict[groupSymbol] = {
            groupContent,
            groupKey,
            groupName,
            groupStr,
            groupSymbol,
            isHasSubTypes: false,
            isOpt,
            isOptChildren: groupKey.includes('!'),
            isCountable: false,
            parent: null,
            isNever: false,
          };

          continue;
        }

        const groupContent = groupStr.slice(isNoname ? 1 : matchedGroupName.length + 4, groupStr.lastIndexOf(')'));
        const isOptChildren = !isEachGroupIsOptional && groupContent.includes('|');

        countableGroupi++;
        const groupName = matchedGroupName ?? (`$${countableGroupi}` as GroupName);

        groupSymbolToInfoDict[groupSymbol] = {
          isOpt,
          isOptChildren,
          groupStr,
          groupSymbol: groupSymbolsDict[groupIndex],
          groupName,
          groupContent,
          groupKey: '',
          isHasSubTypes: this.checkIsHasSubTypes(groupStr, groupSymbols),
          isCountable: true,
          parent: null,
          isNever: false,
        };
      }

      const groupTypeParts: string[] = [];
      const groupTypeContentsDict = {} as Record<GroupName, string>;
      const uncountableGroupPartTypes: string[] = [];
      const recordFieldsTypes: string[] = [];
      const wholeGroupSymbolToInfoDict = { ...groupSymbolToInfoDict, ...uncountableGroupSymbolToInfoDict };

      Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
        if (groupTypeContentsDict[groupInfo.groupName] !== undefined)
          throw `Inclusive group name - <${groupInfo.groupName}>`;
        groupTypeContentsDict[groupInfo.groupName] = this.makeGroupTypeFromGroupContent({
          userRegStri,
          wholeGroupSymbolToInfoDict,
          groupStubSymbols,
          groupInfo,
        });
      });

      Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
        groupInfo.isNever = this.someOfGroupParents(groupInfo, groupInfo => {
          return groupInfo.groupKey.includes('!');
        });
      });

      Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
        const typeContent = this.makeGroupTypeFromGroupContent({
          userRegStri,
          wholeGroupSymbolToInfoDict,
          groupStubSymbols,
          groupInfo,
        });

        if (groupInfo.isCountable) {
          const typeName = this.makeGroupTypeName(userRegStri, groupInfo.groupName);

          recordFieldsTypes.push(
            `${groupInfo.groupName}${groupInfo.isOpt || groupInfo.isNever ? '?' : ''}: ${typeName}`,
          );
          groupTypeParts.push(`type ${typeName} = ${groupInfo.isNever ? 'undefined & ' : ''}${typeContent};`);
        } else if (!groupInfo.groupKey.includes('!')) {
          const typeName = this.makeUncountableGroupTypeName(userRegStri, groupInfo.groupName);

          uncountableGroupPartTypes.push(`type ${typeName} = ${typeContent};`);
        }
      });

      recordTypes.push(
        `Record<\n    ${this.makeRegTypeKey(
          regReplacedStringTemplateInserts,
          regFlags,
        )},\n    {\n      ${recordFieldsTypes.join(';\n      ')}}\n  >`,
      );
      recordPartsTypes.push(groupTypeParts.concat(uncountableGroupPartTypes).join('\n'));
    }

    if (!recordTypes.length) return null;

    return {
      types: `${recordPartsTypes.join(
        '\n\n',
      )}\n\n\ninterface _GlobalScopedNamedRegExpMakerGeneratedTypes\n  extends ${recordTypes.join(',\n  ')} {' ': ''}`,
    };
  };

  makeGroupTypeName = (userRegStri: number, groupName: GroupName) => `T${this.fileMD5}_${userRegStri}_${groupName}`;
  makeUncountableGroupTypeName = (userRegStri: number, groupName: GroupName) =>
    `U${this.fileMD5}_${userRegStri}_${groupName}`;

  checkIsHasSubTypes = (regStr: string, groupSymbols: GroupStubSymbol[]) => {
    return groupSymbols.some(char => regStr.includes(char));
  };

  makeRegTypeKey = (regStr: string, regFlags: string) => {
    return `\`/${
      regStr
        .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '\\\\|')
        .replace(makeRegExp(`/${this.dotStubSymbol}{3}/g`), '\\\\.')
        .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '\\\\(')
        .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), '\\\\)')
        .replace(makeRegExp(`/${this.openSquareBracketStubSymbol}{3}/g`), '\\\\[')
        .replace(makeRegExp(`/${this.closeSquareBracketStubSymbol}{3}/g`), '\\\\]')
        .replace(makeRegExp(`/${this.stringStubSymbol}/g`), '${string}')
      //
    }/${regFlags}\``;
  };

  extractGroupKeyAndContent = (groupStr: string) => {
    const groupParts = groupStr
      .slice(0, groupStr.lastIndexOf(')'))
      .match(/^\(\?(<[=!]|[a-z]*(?:-[a-z]*)?:|[:=!]|)(.*)/);

    if (groupParts === null)
      return {
        groupKey: '',
        groupContent: '',
      };

    return {
      groupKey: groupParts[1],
      groupContent: groupParts[2],
    };
  };

  makeGroupTypeFromGroupContent = ({
    groupInfo,
    wholeGroupSymbolToInfoDict,
    groupStubSymbols,
    userRegStri,
  }: {
    userRegStri: number;
    wholeGroupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo>;
    groupStubSymbols: GroupStubSymbol[];
    groupInfo: GroupInfo;
  }) => {
    if (!groupInfo.groupContent) return '``';
    let content = groupInfo.groupContent.replace(makeRegExp(`/(\\\\*)(?:\\^|\\$)/g`), (_all, slashes) =>
      this.checkIsSlashedSymbol(slashes) ? slashes.slice(2) : '',
    );

    for (const groupSymbol of groupStubSymbols) {
      const currentGroupInfo = wholeGroupSymbolToInfoDict[groupSymbol];

      content = content.replace(makeRegExp(`/${groupSymbol}+/g`), all => {
        if (wholeGroupSymbolToInfoDict[all[0] as GroupStubSymbol])
          wholeGroupSymbolToInfoDict[all[0] as GroupStubSymbol].parent = groupInfo;

        return currentGroupInfo.groupKey.includes('!')
          ? `\${''}`
          : `\${${
              currentGroupInfo.isCountable
                ? this.makeGroupTypeName(userRegStri, currentGroupInfo.groupName)
                : this.makeUncountableGroupTypeName(userRegStri, currentGroupInfo.groupName)
            }${currentGroupInfo.isOpt ? ` ${this.unionStubSymbol} ''` : ''}}`;
      });
    }

    const contentWithUnions = `\`${
      content
        .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '(')
        .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), ')')
        .replace(makeRegExp(`/${this.stringStubSymbol}/g`), '${string}')
        .replace(makeRegExp(`/${this.slashStubSymbol}/g`), '\\')
        .replace(makeRegExp(`/${this.dotStubSymbol}/g`), '.')
        .replace(
          makeRegExp(`/(?:(\\\\*)\\[(?:\\d[-\\d]*\\d)?]|(\\\\{1,})d)(${this.quantifierRegStr}|)/g`),
          (all, slashes: string | undefined, slashes1: string | undefined, quantifier: string | undefined) => {
            const optionalSign = this.checkIsOptionalQuantifier(quantifier) ? ` ${this.unionStubSymbol} ''` : '';

            if (slashes1 !== undefined) {
              return this.checkIsSlashedSymbol(slashes1) ? `\${number${optionalSign}}` : all;
            }

            return this.checkIsSlashedSymbol(slashes) ? all : `\${number${optionalSign}}`;
          },
        )
        .replace(makeRegExp(`/\\[((?:\\]|.)+)\\](${this.quantifierRegStr}|)/g`), () => {
          return '${string}';
        })
        .replace(makeRegExp(`/((?:\\\\\\\\)?[^\\\`])(${this.quantifierRegStr})/g`), (all, char, quantifier) =>
          this.checkIsOptionalQuantifier(quantifier) ? `\${\`${char}\` ${this.unionStubSymbol} ''}` : all,
        )
        .replace(makeRegExp(`/(?:(\\\\+)[ws]|\\.)(${this.quantifierRegStr}|)/g`), (all, slashes) => {
          return slashes === undefined ? '${string}' : this.checkIsSlashedSymbol(slashes) ? '${string}' : all;
        })
        .replace(makeRegExp(`/([^\\\\])(${this.quantifierRegStr})/g`), (_all, char, quantifier) =>
          this.checkIsOptionalQuantifier(quantifier) ? '${string}' : `${char}\${string}`,
        )
        .replace(makeRegExp(`/${this.openSquareBracketStubSymbol}{3}/g`), '[')
        .replace(makeRegExp(`/${this.closeSquareBracketStubSymbol}{3}/g`), ']')
        .split('|')
        .join('` | `')
        .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '|')
        .replace(makeRegExp(`/${this.unionStubSymbol}/g`), '|')
      // .replace(/`\${string}`/g, 'string')
      //
    }\``;

    return contentWithUnions;
  };

  checkIsOptionalQuantifier = (quantifier: string | undefined) => {
    return (
      quantifier !== undefined &&
      ((quantifier.endsWith('?') && !quantifier.startsWith('+')) ||
        quantifier.endsWith('*') ||
        quantifier.startsWith('{0,') ||
        quantifier.startsWith('{,') ||
        quantifier === '{0}')
    );
  };

  sortGroupIndexes = (a: number, b: number) => a - b;

  setStubSymbols = (userWritedRegStr: string) => {
    let stubCharCode = 999;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.stringStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.slashStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.dotStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.unionStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.openParenthesisStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.closeParenthesisStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.openSquareBracketStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

    do stubCharCode++;
    while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
    this.closeSquareBracketStubSymbol = String.fromCharCode(stubCharCode) as StubSymbol;

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
    regStr.replace(/(\\*)(\${[^{}]+})/g, (all, slashes) => {
      return this.checkIsSlashedSymbol(slashes, 2) ? all : `${slashes.slice(2)}${this.stringStubSymbol}`;
    });

  someOfGroupParents = (groupInfo: GroupInfo, someCb: (groupInfo: GroupInfo) => boolean) => {
    while (groupInfo.parent !== null) {
      if (someCb(groupInfo)) return true;
      groupInfo = groupInfo.parent;
    }

    return false;
  };

  replaceSlashedParenthesis = (regStr: string) => {
    return (
      regStr
        // .replace(makeRegExp(`/\\[((?:\\]|.)+)\\](${this.quantifierRegStr}|)/g`), () => {
        //   return this.stringStubSymbol;
        // })
        .replace(/(\\+?)\(|(\\+?)\)/g, (all, openSlashes: string | undefined, closeSlashes: string | undefined) => {
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
        })
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

  replaceStubs = (regStr: string) => {
    return regStr
      .replace(/\\{4}/g, this.slashStubSymbol.repeat(2))
      .replace(/\\{2}\./g, this.dotStubSymbol.repeat(3))
      .replace(/\\{2}\[/g, this.openSquareBracketStubSymbol.repeat(3))
      .replace(/\\{2}\]/g, this.closeSquareBracketStubSymbol.repeat(3))
      .replace(/(\\+?)\|/g, (all, slashes: string) => {
        return this.checkIsSlashedSymbol(slashes) ? `${slashes.slice(2)}${this.unionStubSymbol.repeat(3)}` : all;
      });
  };
}

if (0) {
  const { regExp, transform } = makeNamedRegExp('/()(?<a>)[|](888) {}/');
  const match = '|888 {}'.match(regExp);
  console.log(match && transform(match));
}
