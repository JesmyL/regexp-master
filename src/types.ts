import { regExpMasterVitePlugin } from '../types/model';

export type Options = Parameters<typeof regExpMasterVitePlugin>[0];

export type GroupInfo = {
  isOpt: boolean;
  isOptChildren: boolean;
  groupStr: string;
  groupSymbol: GroupStubSymbol;
  groupContent: string;
  groupKey: string;
  groupName: GroupName;
  parent: GroupInfo | null;
  isNever: boolean;
  isHasSubTypes: boolean;
  isCountable: boolean;
};

export const enum StubSymbol {
  def = '*******',
}

export const enum GroupStubSymbol {
  zero = '*0',
}

export const enum GroupName {
  empty = '',
  zero = '$0',
  other = '{OTHER NAME}',
}
