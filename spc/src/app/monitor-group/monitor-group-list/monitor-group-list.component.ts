import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNull } from 'util';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Column } from 'shared-ui';
import { CustomizedTableComponent } from 'shared-ui/lib/components/primeng/customized-table/customized-table.component';
import { ConfirmationService } from 'primeng/api';
import { HomeService } from '../../services/home.service';
import { MonitorGroupService } from '../../services/monitor-group.service';
import { monitorGroupsColumns42QAdmin, monitorGroupsColumnsSite } from '../monitor-groups-list.columns';
import {
  monitorGroupsEnableActionsRules42Q,
  monitorGroupsEnableActionsRulesSite,
  monitorGroupsEnableActionsRules,
  monitorGroupsTableActions
} from '../monitor-group-table-actions';
import { Customer } from '../../domain/list-user.model';
import { MonitorGroupsList } from '../../domain/monitor-groups-list.model';
import { HomePageBuilder } from '../../domain/home-page.model';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}

@Component({
  selector: 'spc-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss']
})
export class MonitorGroupListComponent implements OnInit, AfterViewInit {

  @ViewChild('monitorGroupsTable', { static: false }) monitorGroupsTable: CustomizedTableComponent;
  @ViewChild('bulkUploadButton', { static: false }) bulkUploadButton: ElementRef;
  tableData = [];
  tableColumns = [];
  totalRecords: number;
  addUserOptions = [
    { label: 'users-list.federated', value: UserDetailsType.FEDERATED },
    { label: 'users-list.non-federated', value: UserDetailsType.NONFEDERATED }
  ];
  dropdownPlaceholder = 'users-list.add-user';
  showForm: boolean;
  is42qAdmin: boolean;
  is42qSite: boolean;
  defaultFilters: Array<Column> = [];
  availableFilters: Array<Column> = [];
  loggedUserDetails: any;
  loggedCustomer: Customer;
  enableActionsRules = monitorGroupsEnableActionsRules;
  availableTableActions = monitorGroupsTableActions;
  filterBySite;
  filterByPlant;
  filterByCustomer;
  monitorGroupListSubscription: Subscription;
  constructor(
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private homeService: HomeService,
    private monitorGroupService: MonitorGroupService,
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.getLoggedUserInfo();
    // this.loadDataSearchRequest();
  }

  ngAfterViewInit(): void {
    // document.getElementsByTagName(MonitorGroupListComponent.ROOT_SELECTOR)[0].parentElement.firstElementChild.remove();
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
    this.defaultFilters = this.tableColumns.filter((column) => column.field === 'loginId');
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

  handleSelectedAction(event) {
    /*const actionUserListIds = this.getActionUserListIds(event[1]);
    if (event[0] === ActionType.changePass) {
      this.changePassword.openAside(event[1]);
    } else if (event[0] === ActionType.activate) {
      this.handleActivateConfirmation(actionUserListIds);
    } else if (event[0] === ActionType.deactivate) {
      this.handleDeactivateConfirmation(actionUserListIds);
    } else if (event[0] === ActionType.edit) {
      this.handleEditUser(event[1]);
    } else if (event[0] === ActionType.impersonate) {
      this.handleImpersonateUser(event[1]);
    } else if (event[0] === ActionType.view) {
      this.handleViewUser(event[1]);
    }*/
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
    this.bulkUploadButton.nativeElement.focus();
  }

  onGoToFunctionPage($event: MouseEvent) {
    this.confirmationService.confirm({
      message: 'Are you sure you want go to function page?',
      accept: () => {
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getFunctionHomePage());
      },
      reject: () => {
      }
    });
  }
}
