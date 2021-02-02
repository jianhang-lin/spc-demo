import { Column } from 'shared-ui';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}
export let locksColumns42QAdmin: Array<Column> = [
           {
               header: 'locks-list.customer',
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
               header: 'locks-list.login-id',
               field: 'loginId',
               filterType: 'globalFilter',
               filterMatchMode: 'LIKE',
               placeholder: 'users-list.search-by-name-or-login',
               isGlobal: true,
               isDisplayed: true,
               autofocus: true
           },
           { header: 'locks-list.name', field: 'userName', isDisplayed: true, autofocus: false },
           {
               header: 'locks-list.site',
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
               header: 'locks-list.plant',
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
               header: 'locks-list.email',
               field: 'email',
               filterType: 'inputFilter',
               filterMatchMode: 'LIKE',
               placeholder: 'users-list.search-by-email',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'locks-list.status',
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
               header: 'locks-list.user-type',
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
               header: 'locks-list.tags',
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

export let locksColumnsSite: Array<Column> = [
  {
    header: 'spc.locks-list.monitor-name',
    field: 'monitorName',
    filterType: 'globalFilter',
    filterMatchMode: 'LIKE',
    placeholder: 'spc.monitor-groups-list.search-by-group-name',
    isGlobal: true,
    isDisplayed: true,
    autofocus: true,
    sortDisabled: false
  },
  {
    header: 'spc.locks-list.location-process-location-family',
    field: 'location',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.locks-list.part-number-family-id',
    field: 'partNumber',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.locks-list.status',
    field: 'status',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.locks-list.chart-type',
    field: 'chartType',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.locks-list.create-time',
    field: 'createTime',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.locks-list.expected-send-time',
    field: 'expectedSendTime',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.locks-list.actual-send-time',
    field: 'actualSendTime',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  }
];
