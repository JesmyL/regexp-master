import { regExpMasterVitePlugin } from './model';

export type Options = Parameters<typeof regExpMasterVitePlugin>[0];

export type GroupInfo = {
  isOpt: boolean;
  isOptChildren: boolean;
  index: number;
  groupStr: string;
  groupSymbol: GroupStubSymbol;
  groupContent: string;
  groupName: GroupName;
};

export const enum StringStubSymbol {
  def = ' ',
}

export const enum SlashStubSymbol {
  def = '\\',
}

export const enum UnionStubSymbol {
  def = '|',
}

export const enum OpenParenthesisStubSymbol {
  def = '(',
}

export const enum CloseParenthesisStubSymbol {
  def = ')',
}

export const enum GroupStubSymbol {
  zero = '$0',
}

export const enum GroupName {
  def = '',
  other = '{OTHER NAME}',
}
