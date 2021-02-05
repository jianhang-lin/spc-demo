import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { isNull} from 'util';
import { Subscription } from 'rxjs';
import { ActionType, Column } from 'shared-ui';
import { CustomizedTableComponent } from 'shared-ui/lib/components/primeng/customized-table/customized-table.component';
import { MonitorGroupDetailsFormComponent } from '../monitor-group-details-form/monitor-group-details-form.component';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from '../../services/common.service';
import { HomeService } from '../../services/home.service';
import { MonitorGroupService } from '../../services/monitor-group.service';
import { monitorGroupsColumns42QAdmin, monitorGroupsColumnsSite } from '../monitor-groups-list.columns';
import {
  monitorGroupsEnableActionsRules,
  monitorGroupsEnableActionsRules42Q,
  monitorGroupsEnableActionsRulesSite,
  monitorGroupsTableActions
} from '../monitor-group-table-actions';
import { Customer} from '../../domain/list-user.model';
import { FormState } from '../../domain/form-state.model';
import { HomePageBuilder } from '../../domain/home-page.model';
import { MonitorGroup } from '../../domain/monitor-group.model';
import { MonitorGroupsList } from '../../domain/monitor-groups-list.model';
import { NetUser } from '../../domain/net-user.model';
import { DataSourceTypeOption } from '../../domain/data-source-type-option.model';
import { TimeZoneInfo } from '../../domain/time-zone-info.model';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}

@Component({
  selector: 'spc-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss']
})
export class MonitorGroupListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('monitorGroupsTable', { static: false }) monitorGroupsTable: CustomizedTableComponent;
  @ViewChild('addMonitorGroup', { static: false }) addMonitorGroup: MonitorGroupDetailsFormComponent;
  @ViewChild('goToFunctionHomePageButton', { static: false }) goToFunctionHomePageButton: ElementRef;
  @ViewChild('addMonitorGroupButton', { static: false }) addMonitorGroupButton: ElementRef;
  tableData = [];
  tableColumns = [];
  totalRecords: number;
  addUserOptions = [
    { label: 'users-list.federated', value: UserDetailsType.FEDERATED },
    { label: 'users-list.non-federated', value: UserDetailsType.NONFEDERATED }
  ];
  dropdownPlaceholder = 'users-list.add-user';
  showForm: boolean;
  formState: FormState;
  is42qAdmin: boolean;
  is42qSite: boolean;
  defaultFilters: Array<Column> = [];
  availableFilters: Array<Column> = [];
  loggedUserDetails: any;
  loggedCustomer: Customer;
  monitorGroup: MonitorGroup;
  enableActionsRules = monitorGroupsEnableActionsRules;
  availableTableActions = monitorGroupsTableActions;
  filterBySite;
  filterByPlant;
  filterByCustomer;
  monitorGroupListSubscription: Subscription;
  netUserOptions: Array<NetUser>;
  dataSourceTypeOptions: Array<DataSourceTypeOption>;
  timeZonesInfoOptions: Array<TimeZoneInfo>;
  netUsersSubscription: Subscription;
  timeZoneInfosSubscription: Subscription;
  dataSourceTypeOptionsSubscription: Subscription;
  constructor(
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private commonService: CommonService,
    private homeService: HomeService,
    private monitorGroupService: MonitorGroupService,
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.getLoggedUserInfo();
    // this.loadDataSearchRequest();
    this.subscribeDataSourceTypeOptions();
    this.subscribeNetUsersOptions();
    this.subscribeTimeZoneInfoOptions();
  }

  ngAfterViewInit(): void {
    // document.getElementsByTagName(MonitorGroupListComponent.ROOT_SELECTOR)[0].parentElement.firstElementChild.remove();
  }

  ngOnDestroy(): void {
    if (this.dataSourceTypeOptionsSubscription) {
      this.dataSourceTypeOptionsSubscription.unsubscribe();
    }
    if (this.netUsersSubscription) {
      this.netUsersSubscription.unsubscribe();
    }
    if (this.timeZoneInfosSubscription) {
      this.timeZoneInfosSubscription.unsubscribe();
    }
  }

  getLoggedUserInfo() {
    this.loggedUserDetails = JSON.parse(window.localStorage.getItem('user'));
    this.is42qAdmin = isNull(this.loggedUserDetails) ? false : this.loggedUserDetails.is42QAdmin;
    this.is42qSite = JSON.parse(window.localStorage.getItem('IS_42Q_SITE'));
    this.enableActionsRules = this.is42qSite ? monitorGroupsEnableActionsRules42Q : monitorGroupsEnableActionsRulesSite;
    this.monitorGroupService.setIs42qSite(this.is42qSite);
    this.tableColumns = this.is42qAdmin && this.is42qSite ?
      monitorGroupsColumns42QAdmin : monitorGroupsColumnsSite;
    this.setDefaultFilters();
    this.setAvailableFilters();
  }

  subscribeDataSourceTypeOptions() {
    this.dataSourceTypeOptionsSubscription = this.monitorGroupService.getDataSourceTypeOptions().subscribe(dataSourceTypeOptions => {
        this.dataSourceTypeOptions = dataSourceTypeOptions;
      }
    );
  }

  subscribeNetUsersOptions() {
    this.netUsersSubscription = this.commonService.getNetUsers().subscribe(netUsers => {
      this.netUserOptions = netUsers;
      // this.selectedNetUserOption = netUsers[0];
    });
  }

  subscribeTimeZoneInfoOptions() {
    this.timeZoneInfosSubscription = this.commonService.getTimeZoneInfos().subscribe(timeZoneInfos => {
      this.timeZonesInfoOptions = timeZoneInfos;
    });
  }

  getDropdownOptions() {
    this.setDefaultFilters();
    this.setAvailableFilters();
    if (this.filterBySite) {
      if (!this.defaultFilters.find((column) => column.field === 'access')) {
        this.defaultFilters.push(this.tableColumns.find((column) => column.field === 'access'));
      }
      if (this.availableFilters.find((column) => column.field === 'access')) {
        this.availableFilters = this.availableFilters.filter((column) => column.field !== 'access');
      }
    }
    if (this.filterByPlant) {
      if (!this.defaultFilters.find((column) => column.field === 'plants')) {
        this.defaultFilters.push(this.tableColumns.find((column) => column.field === 'plants'));
      }
      if (this.availableFilters.find((column) => column.field === 'plants')) {
        this.availableFilters = this.availableFilters.filter((column) => column.field !== 'plants');
      }
    }
    if (this.filterByCustomer) {
      if (!this.defaultFilters.find((column) => column.field === 'customer')) {
        this.defaultFilters.push(this.tableColumns.find((column) => column.field === 'customer'));
      }
      if (this.availableFilters.find((column) => column.field === 'customer')) {
        this.availableFilters = this.availableFilters.filter((column) => column.field !== 'customer');
      }
    }
  }

  setDefaultFilters() {
    this.defaultFilters = this.tableColumns.filter((column) => column.field === 'name');
  }

  setAvailableFilters() {
    this.availableFilters = this.tableColumns.filter((column) => column.field !== 'loginId' && column.field !== 'userName');
  }

  onLazyLoad(lazyEventData: { searchRequest: any, table: CustomizedTableComponent }) {
    // this.getDataSearchRequest();
    this.monitorGroupsTable = lazyEventData.table;
    this.getMonitorGroupDataSearchRequest(lazyEventData);
  }

  getData(url: string, searchRequest) {
    return this.httpClient.post(url, searchRequest, {
      observe: 'response'
    });
  }

  getMonitorGroupDataSearchRequest(lazyEventData: { searchRequest: any, table: CustomizedTableComponent }) {
    /*this.monitorGroupListSubscription = this.monitorGroupService.getMonitorGroups().subscribe(value => {
      console.log(JSON.stringify(value));
      // const response = data.body as DataTableResponse;
      // debugger;
      this.tableData.push(value);
    });*/
    this.monitorGroupListSubscription = this.getData(lazyEventData.table.dataUrl, lazyEventData.searchRequest).subscribe(
      (data) => {
        const monitorGroupsList = data.body as MonitorGroupsList;
        this.totalRecords = this.getTotalRecords(monitorGroupsList.hasMoreElements, lazyEventData.searchRequest);
        this.tableData = monitorGroupsList.dtoList;
      },
      () => {
        const toastTitle = this.translateService.instant('general.error.system-error');
        const toastMessage = this.translateService.instant('general.error.retrieve-data');
        // this.showToaster(toastTitle, toastMessage);
        // this.showLoading = false;
      }
    );
    //     (data) => {
    //         const response = data.body as DataTableResponse;
    //         if (!this.staticTable) {
    //             if (this.selectedRows && this.selectedRows.length > 0) {
    //                 this.selectedRows = this.replaceSelectedRowsWithNewData(response.dtoList);
    //             }
    //             this.getSavedTableSettings();
    //         } else {
    //             this.selectedFilters = this.availableFilters;
    //             this.displayedColumns = this.tableColumns;
    //         }
    //         this.lazyLoad.emit({ records: data, searchRequest });
    //         this.showLoading = false;
    //     },
    //     () => {
    //         const toastTitle = this.translateService.instant('general.error.system-error');
    //         const toastMessage = this.translateService.instant('general.error.retrieve-data');
    //         this.showToaster(toastTitle, toastMessage);
    //         this.showLoading = false;
    //     }
    // );
  }

  private getTotalRecords(hasMoreElements, searchRequest) {
    return hasMoreElements
      ? (searchRequest.paginationDirectives.page + 1) * searchRequest.paginationDirectives.size + 1
      : (searchRequest.paginationDirectives.page + 1) * searchRequest.paginationDirectives.size;
  }

  onSelectedAction(event) {
    /*const actionUserListIds = this.getActionUserListIds(event[1]);
    if (event[0] === ActionType.changePass) {
      this.changePassword.openAside(event[1]);
    } else if (event[0] === ActionType.activate) {
      this.handleActivateConfirmation(actionUserListIds);
    } else if (event[0] === ActionType.deactivate) {
      this.handleDeactivateConfirmation(actionUserListIds);
    } else if (event[0] === ActionType.impersonate) {
      this.handleImpersonateUser(event[1]);
    } else if (event[0] === ActionType.view) {
      this.handleViewUser(event[1]);
    }*/
    switch (event[0]) {
      case ActionType.edit:
        this.editMonitorGroup(event[1][0]);
        break;
      case ActionType.delete:
        // this.deleteProfile(event[1][0]);
        break;
      case ActionType.copy:
        // this.copyProfile(event[1][0]);
        break;
      case ActionType.view:
        // this.viewProfile(event[1][0]);
        break;
      case ActionType.edit_as_view:
        // this.viewProfile(event[1][0]);
        break;
    }
  }

  editMonitorGroup(monitorGroup) {
    this.monitorGroup = monitorGroup;
    this.showForm = true;
    this.formState = FormState.edit;
  }

  getSelectedFilters(selectedFilters) {
    selectedFilters = selectedFilters.filter((filter) => !this.defaultFilters.find((elem) => elem.field === filter.field));
    this.getDropdownOptionList(selectedFilters, '');
  }

  private getDropdownOptionList(filters, filterValue) {
    filters.forEach((column) => {
      if (column.field === 'tags') {
        this.getTagsSuggestions(column, { page: 0, property: 'tagName', value: filterValue });
      } else if (column.field === 'access') {
        this.getSitesSuggestions(column, { page: 0, property: 'siteName', value: filterValue, isGetAllRequest: true });
      } else if (column.field === 'plants') {
        this.getPlansSuggestions(column, { page: 0, property: 'plantName', value: filterValue, isGetAllRequest: true });
      } else if (column.field === 'active') {
        this.getStatusSuggestions(column, filterValue);
      } else if (column.field === 'userType') {
        this.getUserTypeSuggestions(column, filterValue);
      } else if (column.field === 'profiles') {
        this.getProfilesSuggestions(column, { page: 0, property: 'profileName', value: filterValue });
      } else if (column.field === 'customer') {
        this.getCustomersSuggestions(column, { page: 0, property: 'customerName', value: filterValue });
      }
    });
  }

  private getTagsSuggestions(column: any, requestBody) {
    /*this.usersListService.getTags(requestBody).subscribe((data) => {
      column['filterDropdownOptions'] = data;
    });*/
  }

  private getSitesSuggestions(column: any, requestBody, refreshFilters = false) {
    /*this.usersListService.getSitesByCustomer(requestBody, -1).subscribe((data) => {
      column['filterDropdownOptions'] = data;
      if (refreshFilters) {
        this.getDropdownOptions();
      }
    });*/
  }

  private getPlansSuggestions(column: any, requestBody, refreshFilters = false) {
    /*this.usersListService.getPlantsByCustomer(requestBody, -1).subscribe((data) => {
      column['filterDropdownOptions'] = data;
      if (refreshFilters) {
        this.getDropdownOptions();
      }
    });*/
  }

  private getStatusSuggestions(column: any, filterValue) {
    /*if (filterValue === '' && !column['filterDropdownOptions']) {
      this.usersListService.getStatus().subscribe((data: FilterDropdownOptions) => {
        column['filterDropdownOptions'] = data;
        this.statusOptions = data.dtoList;
      });
    } else {
      this.handleSuggestionsWithoutPagination(this.statusOptions, filterValue, column);
    }*/
  }

  private getUserTypeSuggestions(column: any, filterValue) {
    /*if (filterValue === '' && !column['filterDropdownOptions']) {
      this.usersListService.getUserTypes().subscribe((data: FilterDropdownOptions) => {
        column['filterDropdownOptions'] = data;
        this.userTypeOptions = data.dtoList;
        this.handleSuggestionsWithoutPagination(data.dtoList, filterValue, column);
      });
    } else {
      this.handleSuggestionsWithoutPagination(this.userTypeOptions, filterValue, column);
    }*/
  }

  private getProfilesSuggestions(column: any, requestBody) {
    /*this.usersListService.getProfiles(requestBody).subscribe((data) => {
      column['filterDropdownOptions'] = data;
    });*/
  }

  private getCustomersSuggestions(column: any, requestBody, refreshFilters = false) {
    /*this.usersListService.getCustomers(requestBody).subscribe((data) => {
      column['filterDropdownOptions'] = data;
      if (refreshFilters) {
        this.getDropdownOptions();
      }
    });*/
  }

  onChangeAutocompleteFilter(event) {
    const autocompleteFilterField = event.selectedFilters.filter((filter) => filter.field === event.eventQuery.field);
    this.getDropdownOptionList(autocompleteFilterField, event.eventQuery.query ? event.eventQuery.query : '');
  }

  onBlurMoreButton() {
    this.addMonitorGroupButton.nativeElement.focus();
  }

  onGoToFunctionPage($event: MouseEvent) {
    this.confirmationService.confirm({
      icon: 'icon-info',
      message: this.translateService.instant('spc.monitor-groups-list.confirm-go-to-function-home-page-message'),
      accept: () => {
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getFunctionHomePage());
      },
      reject: () => {
      }
    });
  }

  openForm() {
    this.showForm = true;
    this.formState = FormState.add;
    console.log('monitor-group-list openForm...');
  }

  onCloseForm() {
    this.showForm = false;
    this.monitorGroup = null;
    this.monitorGroupsTable.filters.focusFirstFilter();
  }
}
