import { TooltipPosition, ActionType, EnableActionRule, TableAction } from 'shared-ui';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}
export let monitorGroupsEnableActionsRules: Array<EnableActionRule> = [
    { id: ActionType.changePass, field: 'userType', hasValue: UserDetailsType.NONFEDERATED },
    { id: ActionType.activate, field: 'active', hasValue: false },
    { id: ActionType.deactivate, field: 'active', hasValue: true },
    { id: ActionType.edit, isSingleSelection: true },
    { id: ActionType.view, isSingleSelection: true },
    { id: ActionType.impersonate, isSingleSelection: true }
];

export let monitorGroupsEnableActionsRulesSite: Array<EnableActionRule> = [
  { id: ActionType.edit, isSingleSelection: true },
  { id: ActionType.copy, isSingleSelection: true },
  { id: ActionType.delete, isSingleSelection: true },
  { id: ActionType.view, isSingleSelection: true },
  { id: ActionType.edit_as_view, isSingleSelection: true }
];

export let monitorGroupsEnableActionsRules42Q: Array<EnableActionRule> = [
  { id: ActionType.edit, isSingleSelection: true },
  { id: ActionType.copy, isSingleSelection: true },
  { id: ActionType.delete, isSingleSelection: true },
  { id: ActionType.view, isSingleSelection: true },
  { id: ActionType.edit_as_view, isSingleSelection: true }
];

export let monitorGroupsTableActions: Array<TableAction> = [
  {
    id: ActionType.view,
    tooltipLabel: 'spc.monitor-groups.label.view-monitor-group',
    tooltipPosition: TooltipPosition.top,
    icon: 'icon-eye-fill',
    // permissions: ['users-list.view-users']
  },
  {
    id: ActionType.edit_as_view,
    tooltipLabel: 'spc.monitor-groups.label.view-monitor-group',
    tooltipPosition: TooltipPosition.top,
    icon: 'icon-eye-fill',
    // permissions: ['profiles-list.assign-users'],
    display: false
  },
  {
    id: ActionType.edit,
    tooltipLabel: 'spc.monitor-groups.label.edit-monitor-group',
    tooltipPosition: TooltipPosition.top,
    icon: 'icon-edit-fill',
    // permissions: ['users-list.edit-user']
  },
  {
    id: ActionType.copy,
    tooltipLabel: 'spc.monitor-groups.label.copy-monitor-group',
    tooltipPosition: TooltipPosition.top,
    icon: 'icon-copy-fill',
    // permissions: ['profiles-list.copy-profile'],
    display: false
  },
  {
    id: ActionType.delete,
    tooltipLabel: 'spc.monitor-groups.label.delete-monitor-group',
    tooltipPosition: TooltipPosition.top,
    icon: 'icon-trash-2-fill',
    // permissions: ['profiles-list.delete-profile']
  }
];
