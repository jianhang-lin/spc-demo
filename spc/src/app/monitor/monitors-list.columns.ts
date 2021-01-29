import { Column } from 'shared-ui';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}
export let monitorsColumns42QAdmin: Array<Column> = [
           {
               header: 'monitor-groups-list.customer',
               field: 'customer',
               isObject: true,
               fieldKey: 'customerName',
               filterType: 'searchableDropdownFilter',
               filterMatchMode: 'IN',
               uniqueKey: 'id',
               optionLabel: 'customerName',
               placeholder: 'users-list.customer',
               filterPlaceholder: 'users-list.customer-filter-placeholder',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'monitor-groups-list.login-id',
               field: 'loginId',
               filterType: 'globalFilter',
               filterMatchMode: 'LIKE',
               placeholder: 'users-list.search-by-name-or-login',
               isGlobal: true,
               isDisplayed: true,
               autofocus: true
           },
           { header: 'monitor-groups-list.name', field: 'userName', isDisplayed: true, autofocus: false },
           {
               header: 'users-list.site',
               field: 'access',
               isArrayOfObjects: true,
               fieldKey: 'access',
               placeholder: 'users-list.site',
               filterType: 'searchableDropdownFilter',
               uniqueKey: 'id',
               filterMatchMode: 'IN',
               optionLabel: 'siteName',
               filterPlaceholder: 'users-list.sites-filter-placeholder',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'monitor-groups-list.plant',
               field: 'plants',
               isArrayOfObjects: true,
               fieldKey: 'plantName',
               placeholder: 'users-list.plant',
               filterType: 'searchableDropdownFilter',
               uniqueKey: 'id',
               filterMatchMode: 'IN',
               optionLabel: 'plantName',
               filterPlaceholder: 'users-list.plants-filter-placeholder',
               isDisplayed: false,
               autofocus: false
           },
           {
               header: 'monitor-groups-list.email',
               field: 'email',
               filterType: 'inputFilter',
               filterMatchMode: 'LIKE',
               placeholder: 'users-list.search-by-email',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'monitor-groups-list.status',
               field: 'active',
               isBoolean: true,
               isTrueLabel: 'Active',
               isFalseLabel: 'Inactive',
               filterType: 'searchableDropdownFilter',
               placeholder: 'users-list.status',
               filterMatchMode: 'EQUAL',
               optionLabel: 'name',
               filterPlaceholder: 'users-list.status-filter-placeholder',
               uniqueKey: 'value',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'monitor-groups-list.user-type',
               field: 'userType',
               fieldIsKey: true,
               objectKeysValues: [
                   { key: UserDetailsType.FEDERATED, label: 'users-list.federated', addClass: 'active-user' },
                   {
                       key: UserDetailsType.NONFEDERATED,
                       label: 'users-list.non-federated',
                       addClass: 'inactive-user'
                   }
               ],
               filterType: 'searchableDropdownFilter',
               placeholder: 'users-list.user-type',
               filterMatchMode: 'EQUAL',
               optionLabel: 'name',
               filterPlaceholder: 'users-list.user-type-filter-placeholder',
               uniqueKey: 'value',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'monitor-groups-list.tags',
               field: 'tags',
               isArrayOfObjects: true,
               fieldKey: 'name',
               addClass: 'tag',
               placeholder: 'users-list.tags',
               filterType: 'searchableDropdownFilter',
               uniqueKey: 'id',
               filterMatchMode: 'IN',
               optionLabel: 'name',
               filterPlaceholder: 'users-list.tags-filter-placeholder',
               isDisplayed: true,
               autofocus: false
           }
       ];

export let monitorsColumnsSite: Array<Column> = [
  {
    header: 'spc.monitors-list.monitor-name',
    field: 'name',
    filterType: 'globalFilter',
    filterMatchMode: 'LIKE',
    placeholder: 'spc.monitor-groups-list.search-by-group-name',
    isGlobal: true,
    isDisplayed: true,
    autofocus: true,
    sortDisabled: false
  },
  {
    header: 'spc.monitors-list.monitor-type',
    field: 'datasourceType',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.monitors-list.monitor-short-name',
    field: 'sfdcTimezone',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.monitors-list.part-number-family-id',
    field: 'netUserId',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.monitors-list.grouping-type',
    field: 'mdsUrl',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.monitors-list.collection-type',
    field: 'monitorGroupListIcon',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.monitors-list.monitor-status',
    field: 'monitorGroupListIcon',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.monitors-list.batch-id',
    field: 'monitorGroupListIcon',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.monitors-list.update-time',
    field: 'monitorGroupListIcon',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.monitors-list.update-by',
    field: 'monitorGroupListIcon',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.monitors-list.more',
    field: 'monitorGroupListIcon',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
];
