import { Column } from 'shared-ui';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}
export let locationFamiliesColumns42QAdmin: Array<Column> = [
           {
               header: 'location-families-list.customer',
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
               header: 'location-families-list.login-id',
               field: 'loginId',
               filterType: 'globalFilter',
               filterMatchMode: 'LIKE',
               placeholder: 'users-list.search-by-name-or-login',
               isGlobal: true,
               isDisplayed: true,
               autofocus: true
           },
           { header: 'location-families-list.name', field: 'userName', isDisplayed: true, autofocus: false },
           {
               header: 'location-families-list.site',
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
               header: 'location-families-list.plant',
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
               header: 'location-families-list.email',
               field: 'email',
               filterType: 'inputFilter',
               filterMatchMode: 'LIKE',
               placeholder: 'users-list.search-by-email',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'location-families-list.status',
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
               header: 'location-families-list.user-type',
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
               placeholder: 'location-families-list.user-type',
               filterMatchMode: 'EQUAL',
               optionLabel: 'name',
               filterPlaceholder: 'users-list.user-type-filter-placeholder',
               uniqueKey: 'value',
               isDisplayed: true,
               autofocus: false
           },
           {
               header: 'location-families-list.tags',
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

export let locationFamiliesColumnsSite: Array<Column> = [
  {
    header: 'spc.location-families-list.monitor-name',
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
    header: 'spc.location-families-list.monitor-type',
    field: 'monitorType',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.location-families-list.monitor-short-name',
    field: 'monitorShortName',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.location-families-list.part-number-family-id',
    field: 'partNumber',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.location-families-list.grouping-type',
    field: 'groupingType',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false
  },
  {
    header: 'spc.location-families-list.collection-type',
    field: 'dataSource',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.location-families-list.monitor-status',
    field: 'monitorStatus',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.location-families-list.batch-id',
    field: 'batchId',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.location-families-list.update-time',
    field: 'updateTime',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.location-families-list.update-by',
    field: 'updateBy',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
  {
    header: 'spc.location-families-list.more',
    field: 'monitorGroupListIcon',
    isDisplayed: true,
    autofocus: false,
    sortDisabled: false,
  },
];
