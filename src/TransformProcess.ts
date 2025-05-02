import { makeRegExp } from './makeRegExp';
import { testMaker } from './test.maker';
import { GroupInfo, GroupName, GroupStubSymbol, StubSymbol } from './types';

setTimeout(testMaker, 500);

export class TransformProcess {
  makerInvokesContentSplitterRegExp: RegExp;
  content: string;
  fileMD5: string;

  quantifierRegStr = '[?+*]\\??|{,\\d+}|{\\d+,\\d*?}|{\\d+}' as const;
  sortGroupIndexes = (a: number, b: number) => a - b;

  stringStubSymbol = StubSymbol.def;
  numberStubSymbol = StubSymbol.def;
  optionalNumberStubSymbol = StubSymbol.def;
  stringTemplateStubSymbol = StubSymbol.def;
  unionStubSymbol = StubSymbol.def;
  optionalStubSymbol = StubSymbol.def;
  untemplatedStubSymbol = StubSymbol.def;
  slashStubSymbol = StubSymbol.def;
  escapeStubSymbol = StubSymbol.def;
  openParenthesisStubSymbol = StubSymbol.def;
  closeParenthesisStubSymbol = StubSymbol.def;

  constructor(options: { importNameMatch: RegExpMatchArray; content: string; fileMD5: string }) {
    this.fileMD5 = options.fileMD5;
    this.content = options.content;

    this.makerInvokesContentSplitterRegExp = makeRegExp(
      `/${
        options.importNameMatch[1] ?? 'makeNamedRegExp'
      }\\(\\s*(?:\\s*(?:\\/{2,}.*|\\/\\*[\\w\\W]+?\\*\\/)\\s*\n*)*/gm`,
    );
  }

  setStubSymbols = (userWritedRegStr: string) => {
    let stubCharCode = 999;

    const makeStub = () => {
      do stubCharCode++;
      while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));
      return String.fromCharCode(stubCharCode) as StubSymbol;
    };

    this.stringStubSymbol = makeStub();
    this.optionalNumberStubSymbol = makeStub();
    this.numberStubSymbol = makeStub();
    this.stringTemplateStubSymbol = makeStub();
    this.slashStubSymbol = makeStub();
    this.escapeStubSymbol = makeStub();
    this.openParenthesisStubSymbol = makeStub();
    this.closeParenthesisStubSymbol = makeStub();
    this.unionStubSymbol = makeStub();
    this.optionalStubSymbol = makeStub();
    this.untemplatedStubSymbol = makeStub();

    const groupStubSymbols: GroupStubSymbol[] = [];

    userWritedRegStr.replace(/\(/g, (all, slashes) => {
      if (this.checkIs4xSlashes(slashes)) return all;

      do stubCharCode++;
      while (userWritedRegStr.includes(String.fromCharCode(stubCharCode)));

      groupStubSymbols.push(String.fromCharCode(stubCharCode) as never);

      return all;
    });

    return groupStubSymbols;
  };

  process = () => {
    this.content = this.cutFileComments(this.content);

    const splits = this.content.split(this.makerInvokesContentSplitterRegExp);
    const namespaces: string[] = [];
    const registeredTypeKeysSet = new Set<string>();

    for (let userRegStri = 1; userRegStri < splits.length; userRegStri++) {
      const leadRegQuote = splits[userRegStri][0];

      const findFreeBracketReg = makeRegExp(`/(?<!\\\\)(?:\\\\{2})*\\\`/`);
      const findConcatenatesReg = makeRegExp('/(?<!(?:\\\\{2})*\\\\)`/');
      const index = splits[userRegStri].slice(1).search(findFreeBracketReg);
      const userWritedRegStr = splits[userRegStri]?.slice(1, index + 1);

      const match = userWritedRegStr.match(findConcatenatesReg);

      if (match) {
        console.info(userWritedRegStr);
        throw `StringRegExp can not be concatenated template string`;
      }

      if (leadRegQuote !== '`') {
        console.info(userWritedRegStr);
        throw `StringRegExp must be template string - makeNamesRegExp(\`/ /g\`)`;
      }

      let countableGroupi = 0;
      let uncountableGroupi = 0;
      const groupNameToSymbolDict = {} as Record<GroupName, GroupStubSymbol>;
      const groupStubSymbols = this.setStubSymbols(userWritedRegStr);

      const groups: Record<number, string> = {};
      const groupSymbolsDict: Record<number, GroupStubSymbol> = {};
      const countableGroupSymbolsDict: Record<number, GroupStubSymbol> = {};
      const symbolGroupsDict: Record<GroupStubSymbol, number> = {} as never;

      let regStr = userWritedRegStr.slice(1, userWritedRegStr.lastIndexOf('/'));
      const regFlags = userWritedRegStr.slice(regStr.length + 2);

      regStr = this.replaceEscapeds(regStr);
      regStr = this.replaceStringTemplateInserts(regStr);

      const regStrForTypeKey = this.replaceEnumsWithStringTemplatePrefix(regStr);

      regStr = this.replaceEnums(regStr);

      regStr = this.insertGroupsWithReplace({
        regStr,
        groups,
        groupStubSymbols,
        groupSymbolsDict,
        countableGroupSymbolsDict,
        symbolGroupsDict,
      });

      const groupSymbols = Object.values(groupSymbolsDict);
      const countableGroupSymbols = Object.values(countableGroupSymbolsDict);

      const groupIndexes = Object.keys(groups).map(Number).sort(this.sortGroupIndexes);
      const uncountableGroupSymbolToInfoDict: Partial<Record<GroupStubSymbol, GroupInfo>> = {};

      const isEachGroupIsOptional = regStr
        .replace(
          makeRegExp(`/\\[([^${this.stringStubSymbol}]+?)\\](${this.quantifierRegStr}|)/g`),
          this.stringStubSymbol,
        )
        .includes('|');

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

      for (const groupIndex of groupIndexes) {
        const groupStr = groups[groupIndex];
        const groupNameMatch = groupStr.match(makeRegExp('/\\((\\?(?:<[!=]|<([^>]*?)>|))?/'));

        if (groupNameMatch === null) throw 'Incorrect RegExp group';
        const matchedGroupName = groupNameMatch[2] as GroupName | undefined;
        const isNoname = matchedGroupName === undefined;

        if (!isNoname) {
          if (matchedGroupName === GroupName.empty) throw 'Group name can not be empty - <>';
          if (matchedGroupName.match(makeRegExp('/^\\d|[^$_\\w]/')))
            throw `Incorrect group name - <${matchedGroupName}>`;
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
            isOptChildren: groupKey.includes('!') || groupContent.includes('|'),
            isCountable: false,
            parent: null,
            isNever: false,
          };

          continue;
        }

        const groupContent = groupStr.slice(isNoname ? 1 : matchedGroupName.length + 4, groupStr.lastIndexOf(')'));

        const isOptChildren = isEachGroupIsOptional || groupContent.includes('|');

        countableGroupi++;
        const groupName = matchedGroupName ?? (`$${countableGroupi}` as GroupName);
        groupNameToSymbolDict[groupName] = groupSymbol;

        groupSymbolToInfoDict[groupSymbol] = {
          isOpt,
          isOptChildren,
          groupStr,
          groupSymbol,
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
      this.setGroupInfoParents(wholeGroupSymbolToInfoDict);

      Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
        groupInfo.isNever = this.checkIsGroupNever(groupInfo);
        groupInfo.isOpt = this.someOfGroupParents(
          groupInfo,
          parentInfo => parentInfo.isOpt || parentInfo.isOptChildren,
        );
      });

      Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
        if (groupTypeContentsDict[groupInfo.groupName] !== undefined)
          throw `Inclusive group name - <${groupInfo.groupName}>`;
        groupTypeContentsDict[groupInfo.groupName] = this.makeGroupTypeFromGroupContent({
          wholeGroupSymbolToInfoDict,
          groupStubSymbols,
          groupInfo,
          groupNameToSymbolDict,
          countableGroupSymbols,
        });
      });

      Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
        const typeContent = `${groupInfo.isNever && !groupInfo.isCountable ? 'undefined & ' : ''}${
          groupTypeContentsDict[groupInfo.groupName]
        }`;

        if (groupInfo.isCountable) {
          const typeName = this.makeGroupTypeName(groupInfo.groupName);

          recordFieldsTypes.push(
            `${groupInfo.groupName}${groupInfo.isOpt || groupInfo.isNever ? '?' : ''}: ${typeName}`,
          );
          groupTypeParts.push(`type ${typeName} = ${typeContent};`);
        } else {
          const typeName = this.makeUncountableGroupTypeName(groupInfo.groupName);

          uncountableGroupPartTypes.push(`type ${typeName} = ${typeContent};`);
        }
      });

      const typeKey = this.makeRegTypeKey(regStrForTypeKey, regFlags);

      if (registeredTypeKeysSet.has(typeKey)) continue;
      registeredTypeKeysSet.add(typeKey);

      namespaces.push(
        `namespace ${this.makeNamespaceTypeName('', namespaces.length)} {\n  ${groupTypeParts
          .concat(uncountableGroupPartTypes)
          .join(
            '\n  ',
          )}\n\n  export interface I extends Record<\n    ${typeKey},\n    {\n      ${recordFieldsTypes.join(
          ';\n      ',
        )}\n    }\n  > { '': '' }\n}`,
      );
    }

    if (!namespaces.length) return null;

    return {
      types: `${namespaces.join(
        '\n\n',
      )}\n\ninterface _GlobalScopedNamedRegExpMakerGeneratedTypes\n  extends ${namespaces
        .map(this.makeNamespaceDotITypeName)
        .join(',\n    ')} {\n    '': ''\n}`,
    };
  };

  makeGroupTypeName = (groupName: GroupName) => `T${groupName}`;
  makeUncountableGroupTypeName = (groupName: GroupName) => `U${groupName}`;

  makeNamespaceTypeName = (_text: string, index: number) => `N${this.fileMD5}_${index + 1}`;
  makeNamespaceDotITypeName = (text: string, index: number) => `${this.makeNamespaceTypeName(text, index)}.I`;

  checkIsHasSubTypes = (regStr: string, groupSymbols: GroupStubSymbol[]) => {
    return groupSymbols.some(char => regStr.includes(char));
  };

  makeRegTypeKey = (regStr: string, regFlags: string) => {
    return `\`/${
      regStr
        .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '\\\\|')
        .replace(makeRegExp(`/[${this.slashStubSymbol}${this.escapeStubSymbol}]/g`), '\\')
        .replace(makeRegExp(`/${this.untemplatedStubSymbol}/g`), '\\${')
        .replace(makeRegExp(`/${this.stringStubSymbol}/g`), '${string}')
        .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '\\\\(')
        .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), '\\\\)')

      //
    }/${regFlags}\``;
  };

  extractGroupKeyAndContent = (groupStr: string) => {
    const groupParts = groupStr
      .slice(0, groupStr.lastIndexOf(')'))
      .match(makeRegExp('/^\\(\\?(<[=!]|[a-z]*(?:-[a-z]*)?:|[:=!]|)(.*)/'));

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

  replaceEnumsWithStringTemplatePrefix = (regStr: string) => {
    return regStr.replace(
      makeRegExp(
        `/(?<!${this.escapeStubSymbol})\\[(?:${this.escapeStubSymbol}{2}]|.)*?\\\$\\\\?{(?:${this.escapeStubSymbol}{2}]|.)*?(?<!${this.escapeStubSymbol})]/g`,
      ),
      this.stringStubSymbol,
    );
  };

  replaceEnums = (regStr: string) => {
    regStr = regStr.replace(
      makeRegExp(
        `/((?:(\\\\*)\\[(?:\\d[-\\d]*\\d)?]|(\\\\+)d)(${this.quantifierRegStr}|))|(?<!${this.escapeStubSymbol})\\[(?:${this.escapeStubSymbol}{2}]|.)+?(?<!${this.escapeStubSymbol})]/g`,
      ),
      (
        all,
        isNumericEnum: string | undefined,
        enumSlashes: string | undefined,
        numberSlashes: string | undefined,
        quantifier: string | undefined,
      ) => {
        if (isNumericEnum !== undefined) {
          const returnNumber = this.checkIsOptionalQuantifier(quantifier)
            ? this.optionalNumberStubSymbol
            : this.numberStubSymbol;

          if (numberSlashes !== undefined) {
            return this.checkIs2xSlashes(numberSlashes) ? returnNumber : all;
          }

          return this.checkIs4xSlashes(enumSlashes) ? all : returnNumber;
        }

        return this.stringStubSymbol;
      },
    );

    return regStr;
  };

  checkIsGroupNever = (groupInfo: GroupInfo) => {
    return (
      groupInfo.isNever ||
      groupInfo.groupKey.includes('!') ||
      this.someOfGroupParents(groupInfo, groupInfo => {
        return groupInfo.groupKey.includes('!');
      })
    );
  };

  setGroupInfoParents = (wholeGroupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo>) => {
    for (const groupInfoSymbol in wholeGroupSymbolToInfoDict) {
      const groupInfo = wholeGroupSymbolToInfoDict[groupInfoSymbol as GroupStubSymbol];

      for (const currentGroupInfoSymbol in wholeGroupSymbolToInfoDict) {
        const currentGroupInfo = wholeGroupSymbolToInfoDict[currentGroupInfoSymbol as GroupStubSymbol];

        if (currentGroupInfo === undefined || currentGroupInfo === groupInfo) continue;
        if (groupInfo.groupContent.includes(currentGroupInfo.groupSymbol)) currentGroupInfo.parent = groupInfo;
      }
    }
  };

  makeGroupTypeFromGroupContent = ({
    groupInfo,
    wholeGroupSymbolToInfoDict,
    groupStubSymbols,
    countableGroupSymbols,
    groupNameToSymbolDict,
  }: {
    wholeGroupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo>;
    groupStubSymbols: GroupStubSymbol[];
    countableGroupSymbols: GroupStubSymbol[];
    groupInfo: GroupInfo;
    groupNameToSymbolDict: Record<GroupName, GroupStubSymbol>;
  }) => {
    if (!groupInfo.groupContent) return '``';

    let content = groupInfo.groupContent.replace(makeRegExp(`/(?<!${this.escapeStubSymbol})(?:[$^])/g`), '');

    content = content.replace(
      makeRegExp(`/\\\\{2}(?:(\\d{1,2})|<([\\w$_]+)>)(${this.quantifierRegStr}|)/g`),
      (all, linkNumber: string | undefined, linkName: string | undefined, quantifier: string) => {
        let linkTypeName: string | null = null;

        let isOptionalLink: boolean | null = null;

        if (!linkNumber && !linkName) return all;

        let linkGroupName = groupInfo.groupName;

        isOptionalLink =
          this.checkIsOptionalQuantifier(quantifier) ||
          groupInfo.isOpt ||
          groupInfo.isOptChildren ||
          this.someOfGroupParents(groupInfo, info => info.isOpt || info.isOptChildren);

        if (linkNumber) {
          if (`$${linkNumber}` in groupNameToSymbolDict) {
            linkGroupName = wholeGroupSymbolToInfoDict[groupNameToSymbolDict[`$${linkNumber}` as GroupName]].groupName;
          } else {
            const groupSymbolByLinkNumber = countableGroupSymbols[+linkNumber - 1];

            if (groupSymbolByLinkNumber !== undefined) {
              const groupInfo = wholeGroupSymbolToInfoDict[groupSymbolByLinkNumber];

              linkTypeName = this.makeGroupTypeName(groupInfo.groupName);
            } else return `\\x${linkNumber.padStart(2, '0')}`;
          }
        } else if (linkName) {
          linkGroupName = wholeGroupSymbolToInfoDict[groupNameToSymbolDict[linkName as GroupName]].groupName;
        }

        linkTypeName ??= this.makeGroupTypeName(linkGroupName);

        return `\${${linkTypeName}${isOptionalLink ? this.optionalStubSymbol : ''}}`;
      },
    );

    for (const currentGroupSymbol of groupStubSymbols) {
      const currentGroupInfo = wholeGroupSymbolToInfoDict[currentGroupSymbol] as GroupInfo | undefined;
      if (currentGroupInfo === undefined) continue;

      // if (wholeGroupSymbolToInfoDict[currentGroupSymbol] && (currentGroupSymbol as never) !== groupInfo.groupSymbol) {
      //   wholeGroupSymbolToInfoDict[currentGroupSymbol].parent = groupInfo;
      // }

      content = content.replace(makeRegExp(`/${currentGroupSymbol}+/g`), () => {
        const typeText = currentGroupInfo.isCountable
          ? this.makeGroupTypeName(currentGroupInfo.groupName)
          : this.makeUncountableGroupTypeName(currentGroupInfo.groupName);

        const optionalSign = currentGroupInfo.isOpt || currentGroupInfo.isNever ? this.optionalStubSymbol : '';

        return `\${${typeText}${optionalSign}}`;
      });
    }

    const contentWithUnions = `\`${
      content
        .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '(')
        .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), ')')
        .replace(makeRegExp(`/(?<!${this.escapeStubSymbol})\\.+/g`), this.stringStubSymbol)
        .replace(makeRegExp(`/\\\\{2}(\\w)(${this.quantifierRegStr}|)/g`), (_all, char, quantifier) => {
          if (char === 'n') {
            return this.checkIsOptionalQuantifier(quantifier) ? `\${'\\n'${this.optionalStubSymbol}}` : '\\n';
          }

          return this.checkIsOptionalQuantifier(quantifier)
            ? `\${string${this.optionalStubSymbol}}`
            : this.stringStubSymbol;
        })
        .replace(makeRegExp(`/${this.slashStubSymbol}/g`), '\\')
        .replace(makeRegExp(`/${this.escapeStubSymbol}+/g`), '')
        .replace(makeRegExp(`/((?:\\\\\\\\)?[^\\\`])(${this.quantifierRegStr})/g`), (all, char, quantifier) =>
          this.checkIsOptionalQuantifier(quantifier) ? `\${\`${char}\`${this.optionalStubSymbol}}` : all,
        )
        // .replace(makeRegExp(`/(?:(\\\\+)[ws]|\\.)(${this.quantifierRegStr}|)/g`), (all, slashes) => {
        //   return slashes === undefined ? '${string}' : this.checkIs4xSlashes(slashes) ? '${string}' : all;
        // })
        .replace(makeRegExp(`/([^\\\\])(${this.quantifierRegStr})/g`), (_all, char, quantifier) =>
          this.checkIsOptionalQuantifier(quantifier) ? this.stringStubSymbol : `${char}${this.stringStubSymbol}`,
        )
        .replace(makeRegExp(`/[${this.slashStubSymbol}${this.escapeStubSymbol}]/g`), '\\')
        .replace(makeRegExp(`/${this.untemplatedStubSymbol}/g`), '\\${')
        .split('|')
        .join('` | `')
        .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '|')
        .replace(makeRegExp(`/${this.optionalStubSymbol}/g`), " | ''")
        .replace(makeRegExp(`/${this.stringStubSymbol}+/g`), '${string}')
        .replace(makeRegExp(`/${this.optionalNumberStubSymbol}/g`), `\${number | ''}`)
        .replace(makeRegExp(`/${this.numberStubSymbol}/g`), `\${number}`)
        .replace(makeRegExp('/`\\${string}`/g'), 'string')
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

  checkIsGroupOptional = (groupStr: string) => !!groupStr.match(makeRegExp('/(?:[*?]|{(?:|0),\\d*})\\??$/'));

  static checkIs4xSlashes = (slashes: string | undefined | null) => !!slashes?.length && slashes.length % 4 === 0;
  static checkIs2xSlashes = (slashes: string | undefined | null) => !!slashes?.length && slashes.length % 2 === 0;
  checkIs4xSlashes = TransformProcess.checkIs4xSlashes;
  checkIs2xSlashes = TransformProcess.checkIs2xSlashes;

  cutFileComments = (content: string) => content.replace(/(?:^|\n) *\/{2,}.*/g, '');

  replaceStringTemplateInserts = (regStr: string) => {
    return regStr.replace(
      makeRegExp(`/(?<!${this.escapeStubSymbol})(?:\\\$\\{[^{}[\\]]+?\\})/g`),
      this.stringStubSymbol,
    );
  };

  someOfGroupParents = (groupInfo: GroupInfo, someCb: (groupInfo: GroupInfo) => boolean) => {
    const checkedSet = new Set();
    let groupToCheck = groupInfo.parent;

    while (groupToCheck !== null) {
      if (checkedSet.has(groupToCheck)) return false;
      checkedSet.add(groupToCheck);

      if (someCb(groupToCheck)) return true;
      groupToCheck = groupToCheck.parent;
    }

    return false;
  };

  replaceEscapeds = (regStr: string) => {
    regStr = regStr.replace(makeRegExp('/(\\\\+?)[|]/g'), (all, slashes: string) => {
      return this.checkIs4xSlashes(slashes)
        ? all
        : `${this.slashStubSymbol.repeat(slashes.length - 2)}${this.unionStubSymbol.repeat(3)}`;
    });

    regStr = regStr
      .replace(makeRegExp(`/(\\\\+?)(\\$\\\\?{|[-[\\]|?^$+*{}:().])/g`), (_all, slashes: string, chars: string) => {
        if (chars === '${' || chars === '$\\{') {
          if (this.checkIs2xSlashes(slashes)) {
            if (chars === '${') return this.slashStubSymbol.repeat(slashes.length) + chars;
            return this.slashStubSymbol.repeat(slashes.length) + this.untemplatedStubSymbol;
          } else {
            return this.slashStubSymbol.repeat(slashes.length - 1) + this.untemplatedStubSymbol;
          }
        }

        if (this.checkIs4xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length) + chars;
        }

        if (!this.checkIs2xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length - 1) + chars;
        }

        return this.escapeStubSymbol.repeat(slashes.length) + chars;
      })
      .replace(makeRegExp(`/(\\\\+?)(\\w)/g`), (all, slashes: string, chars: string) => {
        if (this.checkIs4xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length) + chars;
        }

        if (this.checkIs2xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length - 2) + '\\\\' + chars;
        }

        if (!this.checkIs2xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length - 3) + '\\\\' + chars;
        }

        return all;
      })
      .replace(makeRegExp('/(\\\\+?)([^\\\\`])/g'), (all, slashes: string, chars: string) => {
        if (slashes.length < 3) return all;

        if (chars === '<') {
          return this.slashStubSymbol.repeat(slashes.length - 2) + '\\\\' + chars;
        }

        if (this.checkIs2xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length) + chars;
        }

        return this.slashStubSymbol.repeat(slashes.length - 1) + chars;
      });

    regStr = regStr.replace(
      /(\\+?)\(|(\\+?)\)/g,
      (all, openSlashes: string | undefined, closeSlashes: string | undefined) => {
        if (openSlashes !== undefined) {
          return this.checkIs4xSlashes(openSlashes)
            ? `${openSlashes.slice(2)}${this.openParenthesisStubSymbol.repeat(3)}`
            : all;
        }

        if (closeSlashes !== undefined) {
          return this.checkIs4xSlashes(closeSlashes)
            ? `${closeSlashes.slice(2)}${this.closeParenthesisStubSymbol.repeat(3)}`
            : all;
        }

        return all;
      },
    );

    return regStr;
  };

  insertGroupsWithReplace = ({
    groups,
    regStr,
    groupSymbolsDict,
    groupStubSymbols,
    symbolGroupsDict,
    countableGroupSymbolsDict,
  }: {
    regStr: string;
    groups: Record<number, string>;
    groupStubSymbols: GroupStubSymbol[];
    groupSymbolsDict: Record<number, GroupStubSymbol>;
    countableGroupSymbolsDict: Record<number, GroupStubSymbol>;
    symbolGroupsDict: Record<GroupStubSymbol, number>;
  }) => {
    let isNeedReplace = true;
    let otherStubSymboli = 0;

    while (isNeedReplace) {
      isNeedReplace = false;

      regStr = regStr.replace(
        makeRegExp(
          `/(?<!${this.escapeStubSymbol})\\((\\?(?:!|<!|.))?(?:${this.escapeStubSymbol}[()]|[^()])*?\\)(?:${this.quantifierRegStr}|)/g`,
        ),
        (all, groupKey: string | undefined, index) => {
          isNeedReplace = true;

          groups[index] = all;
          groupSymbolsDict[index] = groupStubSymbols[otherStubSymboli++] as GroupStubSymbol;
          symbolGroupsDict[groupSymbolsDict[index]] = index;

          if (groupKey === undefined || groupKey === '?<') {
            countableGroupSymbolsDict[index] = groupSymbolsDict[index];
          }

          return groupSymbolsDict[index].repeat(all.length);
        },
      );
    }

    return regStr;
  };
}
