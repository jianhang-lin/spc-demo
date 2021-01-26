import { TooltipPosition, ActionType, EnableActionRule, TableAction } from 'shared-ui';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}
export let UsersEnableActionsRules: Array<EnableActionRule> = [
    { id: ActionType.changePass, field: 'userType', hasValue: UserDetailsType.NONFEDERATED },
    { id: ActionType.activate, field: 'active', hasValue: false },
    { id: ActionType.deactivate, field: 'active', hasValue: true },
    { id: ActionType.edit, isSingleSelection: true },
    { id: ActionType.view, isSingleSelection: true },
    { id: ActionType.impersonate, isSingleSelection: true }
];

export let UsersTableActions: Array<TableAction> = [
    {
        id: ActionType.view,
        tooltipLabel: 'general.label.view-user',
        tooltipPosition: TooltipPosition.top,
        icon: 'icon-eye-fill',
        permissions: ['users-list.view-users']
    },
    {
        id: ActionType.edit,
        tooltipLabel: 'general.label.edit-user',
        tooltipPosition: TooltipPosition.top,
        icon: 'icon-edit-fill',
        permissions: ['users-list.edit-user']
    },
    {
        id: ActionType.activate,
        tooltipLabel: 'general.label.activate-user',
        tooltipPosition: TooltipPosition.top,
        icon: 'icon-checkmark-circle-fill',
        permissions: ['users-list.activate-user']
    },
    {
        id: ActionType.deactivate,
        tooltipLabel: 'general.label.deactivate-user',
        tooltipPosition: TooltipPosition.top,
        icon: 'icon-close-circle-fill',
        permissions: ['users-list.deactivate-user']
    },
    {
        id: ActionType.changePass,
        tooltipLabel: 'general.label.change-password',
        tooltipPosition: TooltipPosition.top,
        icon: 'icon-lock-fill',
        permissions: ['users-list.change-password']
    },
    {
        id: ActionType.impersonate,
        tooltipLabel: 'general.label.impersonate-user',
        tooltipPosition: TooltipPosition.top,
        icon: 'icon-impersonate-fill',
        permissions: ['users-list.impersonate-user']
    }
];
