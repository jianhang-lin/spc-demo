import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeCardModel } from '../../domain/home-card.model';
import { Column } from 'shared-ui';
import { UsersEnableActionsRules, UsersTableActions } from '../table-actions';
import { CustomizedTableComponent } from 'shared-ui/lib/components/primeng/customized-table/customized-table.component';
import { TranslateService } from '@ngx-translate/core';
import { admin42QMonitorGroupsListHeaderColumns, siteAdminMonitorGroupsListHeaderColumns } from '../monitor-groups-list.columns';
import { isNull } from 'util';
import { Customer } from '../../domain/list-user.model';

export enum UserDetailsType {
  FEDERATED = 'FEDERATED',
  NONFEDERATED = 'NONFEDERATED'
}

@Component({
  selector: 'spc-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss']
})
export class MonitorGroupListComponent implements OnInit {

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
  enableActionsRules = UsersEnableActionsRules;
  availableTableActions = UsersTableActions;
  filterBySite;
  filterByPlant;
  filterByCustomer;
  constructor(private translateService: TranslateService, private httpClient: HttpClient) {
    this.translateService.setDefaultLang('zh');
    this.translateService.use('zh');
  }

  ngOnInit() {
    this.dropdownPlaceholder = this.translateService.instant('users-list.add-user');
    this.showForm = false;
    this.addUserOptions = [
      { label: this.translateService.instant('users-list.federated'), value: UserDetailsType.FEDERATED },
      { label: this.translateService.instant('users-list.non-federated'), value: UserDetailsType.NONFEDERATED }
    ];
    let anyDefaultFilter = false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      const siteId = urlParams.get('siteId');
      if (siteId) {
        anyDefaultFilter = true;
        this.httpClient.get('/user-administration/sites/' + siteId).subscribe((response) => {
          this.filterBySite = response;
          this.getLoggedUserInfo();
        });
      }

      const plantId = urlParams.get('plantId');
      if (plantId) {
        anyDefaultFilter = true;
        this.httpClient.get('/user-administration/plants/' + plantId).subscribe((response) => {
          this.filterByPlant = response;
          this.getLoggedUserInfo();
        });
      }

      const customerId = urlParams.get('customerId');
      if (customerId) {
        anyDefaultFilter = true;
        this.httpClient.get('/user-administration/customers/' + customerId).subscribe((response) => {
          this.filterByCustomer = response;
          this.getLoggedUserInfo();
        });
      }
    }
    if (!anyDefaultFilter) {
      this.getLoggedUserInfo();
    }
    // this.totalRecords = 1;
  }

  getLoggedUserInfo() {
    this.loggedUserDetails = JSON.parse(window.localStorage.getItem('user'));
    this.is42qAdmin = isNull(this.loggedUserDetails) ? false : this.loggedUserDetails.is42QAdmin;
    this.is42qSite = JSON.parse(window.localStorage.getItem('IS_42Q_SITE'));
    const currentSiteCache = JSON.parse(window.localStorage.getItem('CURRENT_SITE'));
    this.loggedCustomer = isNull(currentSiteCache) ? null : currentSiteCache.customerDto as Customer;
    this.tableColumns = this.is42qAdmin && this.is42qSite ?
      admin42QMonitorGroupsListHeaderColumns : siteAdminMonitorGroupsListHeaderColumns;
    let anyDefaultFilter = false;
    if (this.filterBySite || this.filterByPlant || this.filterByCustomer) {
      this.tableColumns = this.tableColumns.map((column) => {
        if (this.filterBySite) {
          if (column.field === 'access') {
            anyDefaultFilter = true;
            column.selectedValue = this.filterBySite;
            column.prefilledFilter = true;
            this.getSitesSuggestions(column, { page: 0, property: 'siteName', value: '', isGetAllRequest: true }, true);
          }
        }
        if (this.filterByPlant) {
          if (column.field === 'plants') {
            anyDefaultFilter = true;
            column.selectedValue = this.filterByPlant;
            column.prefilledFilter = true;
            this.getPlansSuggestions(column, { page: 0, property: 'plantName', value: '', isGetAllRequest: true }, true);
          }
        }
        if (this.filterByCustomer) {
          if (column.field === 'customer') {
            anyDefaultFilter = true;
            column.selectedValue = this.filterByCustomer;
            column.prefilledFilter = true;
            this.getCustomersSuggestions(column, { page: 0, property: 'customerName', value: '' }, true);
          }
        }
        return column;
      });
    }
    if (!anyDefaultFilter) {
      this.getDropdownOptions();
    }
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

  onLazyLoad(lazyEventData: HomeCardModel) {
    // console.log('onLazyLoad ...' + JSON.stringify(data));
    // this.totalRecords = 1;
    // this.tableData.push({a: '1', b: '2'});
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
}
