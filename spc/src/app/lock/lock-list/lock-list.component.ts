import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNull } from 'util';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CustomizedTableComponent } from 'shared-ui/lib/components/primeng/customized-table/customized-table.component';
import { ConfirmationService } from 'primeng/api';
import { HomeService } from '../../services/home.service';
import { MonitorGroupService } from '../../services/monitor-group.service';
import { Column } from 'shared-ui';
import { Customer } from '../../domain/list-user.model';
import { LockList } from '../../domain/lock-list.model';
import {
  locksEnableActionsRules, locksEnableActionsRules42Q, locksEnableActionsRulesSite,
  locksTableActions
} from '../../lock/lock-table-actions';
import { locksColumns42QAdmin, locksColumnsSite } from '../../lock/locks-list.columns';
import { UserDetailsType } from '../../monitor-group/monitor-group-list/monitor-group-list.component';
import { HomePageBuilder } from '../../domain/home-page.model';


@Component({
  selector: 'spc-lock-list',
  templateUrl: './lock-list.component.html',
  styleUrls: ['./lock-list.component.scss']
})
export class LockListComponent implements OnInit, AfterViewInit {

  @ViewChild('locksTable', { static: false }) locksTable: CustomizedTableComponent;
  @ViewChild('goToFunctionHomePageButton', { static: false }) goToFunctionHomePageButton: ElementRef;
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
  enableActionsRules = locksEnableActionsRules;
  availableTableActions = locksTableActions;
  filterBySite;
  filterByPlant;
  filterByCustomer;
  lockListSubscription: Subscription;
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
  }

  ngAfterViewInit(): void {
  }

  getLoggedUserInfo() {
    this.loggedUserDetails = JSON.parse(window.localStorage.getItem('user'));
    this.is42qAdmin = isNull(this.loggedUserDetails) ? false : this.loggedUserDetails.is42QAdmin;
    this.is42qSite = JSON.parse(window.localStorage.getItem('IS_42Q_SITE'));
    this.enableActionsRules = this.is42qSite ? locksEnableActionsRules42Q : locksEnableActionsRulesSite;
    this.monitorGroupService.setIs42qSite(this.is42qSite);
    this.tableColumns = this.is42qAdmin && this.is42qSite ?
      locksColumns42QAdmin : locksColumnsSite;
    this.setDefaultFilters();
    this.setAvailableFilters();
  }

  setDefaultFilters() {
    this.defaultFilters = this.tableColumns.filter((column) => column.field === 'loginId');
  }

  setAvailableFilters() {
    this.availableFilters = this.tableColumns.filter((column) => column.field !== 'loginId' && column.field !== 'userName');
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

  onLazyLoad(lazyEventData: { searchRequest: any, table: CustomizedTableComponent }) {
    // this.getDataSearchRequest();
    this.locksTable = lazyEventData.table;
    this.getMonitorGroupDataSearchRequest(lazyEventData);
  }

  getMonitorGroupDataSearchRequest(lazyEventData: { searchRequest: any, table: CustomizedTableComponent }) {
    /*this.monitorGroupListSubscription = this.monitorGroupService.getMonitorGroups().subscribe(value => {
      console.log(JSON.stringify(value));
      // const response = data.body as DataTableResponse;
      // debugger;
      this.tableData.push(value);
    });*/
    this.lockListSubscription = this.getData(lazyEventData.table.dataUrl, lazyEventData.searchRequest).subscribe(
      (data) => {
        const lockList = data.body as LockList;
        this.totalRecords = this.getTotalRecords(lockList.hasMoreElements, lazyEventData.searchRequest);
        this.tableData = lockList.dtoList;
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

  getData(url: string, searchRequest) {
    return this.httpClient.post(url, searchRequest, {
      observe: 'response'
    });
  }

  private getTotalRecords(hasMoreElements, searchRequest) {
    return hasMoreElements
      ? (searchRequest.paginationDirectives.page + 1) * searchRequest.paginationDirectives.size + 1
      : (searchRequest.paginationDirectives.page + 1) * searchRequest.paginationDirectives.size;
  }

  getSelectedFilters(selectedFilters) {
    selectedFilters = selectedFilters.filter((filter) => !this.defaultFilters.find((elem) => elem.field === filter.field));
    this.getDropdownOptionList(selectedFilters, '');
  }

  onChangeAutocompleteFilter(event) {
    const autocompleteFilterField = event.selectedFilters.filter((filter) => filter.field === event.eventQuery.field);
    this.getDropdownOptionList(autocompleteFilterField, event.eventQuery.query ? event.eventQuery.query : '');
  }

  private getDropdownOptionList(filters, filterValue) {
    /*filters.forEach((column) => {
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
    });*/
  }

  onBlurMoreButton() {
    this.goToFunctionHomePageButton.nativeElement.focus();
  }

  onGoToMonitor($event: MouseEvent) {
    this.confirmationService.confirm({
      message: 'Are you sure you want go to chart list page?',
      accept: () => {
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getChartHomePage());
      },
      reject: () => {
      }
    });
  }

  onGoToFunctionPage($event: MouseEvent) {
    this.confirmationService.confirm({
      icon: 'icon-info',
      message: this.translateService.instant('spc.locks-list.confirm-go-to-function-home-page-message'),
      accept: () => {
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getFunctionHomePage());
      },
      reject: () => {
      }
    });
  }
}
