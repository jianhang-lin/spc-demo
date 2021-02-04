import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from '../../services/common.service';
import { MonitorGroupForm } from './monitor-group.form';
import { FormState } from '../../domain/form-state.model';
import { TimeZoneInfo } from '../../domain/time-zone-info.model';
import { NetUser } from '../../domain/net-user.model';
import { MonitorGroup } from '../../domain/monitor-group.model';
import { MonitorGroupTabs } from '../../domain/monitor-group-tabs.model';
import { MonitorGroupService } from '../../services/monitor-group.service';
import { DataSourceTypeOption } from '../../domain/data-source-type-option.model';

@Component({
  selector: 'spc-monitor-group-details-form',
  templateUrl: './monitor-group-details-form.component.html',
  styleUrls: ['./monitor-group-details-form.component.scss']
})
export class MonitorGroupDetailsFormComponent implements OnInit, OnDestroy {

  @Input() titleLabel: string;
  @Input() showForm: boolean;
  @Input() formState: FormState;
  @Input() monitorGroup: MonitorGroup;
  @Output() doCloseForm: EventEmitter<any> = new EventEmitter<any>();
  is42qAdmin: boolean;
  is42qSite: boolean;
  asideTitle: string;
  selectedTab: MonitorGroupTabs = MonitorGroupTabs.customerDetail;
  savedButtonClicked: boolean;
  // Present if is edit monitorGroup
  monitorGroupForm: MonitorGroupForm;
  showLoading: boolean;
  hasCustomLabels: boolean;
  errorMonitorGroupExists: boolean;
  netUserOptions: Array<NetUser>;
  dataSourceTypeOptions: Array<DataSourceTypeOption>;
  selectedNetUserOption: NetUser;
  selectedDataSourceTypeOption: DataSourceTypeOption;
  timeZonesInfos: TimeZoneInfo[];
  netUsersSubscription: Subscription;
  timeZoneInfosSubscription: Subscription;
  dataSourceTypeOptionsSubscription: Subscription;
  constructor(
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    // private preferencesService: PreferencesService,
    private commonService: CommonService,
    private monitorGroupService: MonitorGroupService,
  ) { }

  ngOnInit() {
    this.monitorGroupForm = new MonitorGroupForm();
    this.dataSourceTypeOptionsSubscription = this.monitorGroupService.getDataSourceTypeOptions().subscribe(dataSourceTypeOptions => {
        this.dataSourceTypeOptions = dataSourceTypeOptions;
        // this.selectedDataSourceTypeOption = dataSourceTypeOptions[0];
      }
    );
    this.netUsersSubscription = this.commonService.getNetUsers().subscribe(netUsers => {
      this.netUserOptions = netUsers;
      // this.selectedNetUserOption = netUsers[0];
    });
    this.getLoggedUserInfo();
    this.openForm();
    this.getTreeWidgetPermissions();
    this.setAsideTitle();
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
    this.is42qAdmin = true; // JSON.parse(window.localStorage.getItem('user')).is42QAdmin;
    this.is42qSite = false; // JSON.parse(window.localStorage.getItem('IS_42Q_SITE'));
  }

  openForm() {
    if (this.monitorGroup && this.formState !== FormState.add) {
      this.initializeEditForm();
      return;
    }
    if (this.is42qSite) {
      this.getTreeWidgetPermissions();
    }
  }

  private getTreeWidgetPermissions() {

  }

  public initializeEditForm() {
    console.log('initializeEditForm');
  }

  private checkIfExistingCustomLabels() {
    // const preferencesQuery = new PreferecesQueryItem({ customerId: this.customer.id });
    this.hasCustomLabels = false;
  }

  private resetMonitorGroupData(monitorGroup: MonitorGroup) {
    this.showLoading = true;
    this.getNetUsers();
    this.getTimeZones();
  }

  private getNetUsers() {
    this.netUsersSubscription = this.commonService.getNetUsers().subscribe(netUsers => {
      this.netUserOptions = netUsers;
    });
  }

  private getTimeZones() {
    this.timeZoneInfosSubscription = this.commonService.getTimeZoneInfos().subscribe(timeZoneInfos => {
      this.timeZonesInfos = timeZoneInfos;
    });
    console.log(JSON.stringify(this.timeZonesInfos));
  }

  private setAsideTitle() {
    switch (this.formState) {
      case FormState.add:
        this.asideTitle = 'spc.monitor-groups.add-monitor-group-title-label';
        break;
      case FormState.edit:
        this.asideTitle = 'spc.monitor-groups.edit-monitor-group-title-label';
        break;
      case FormState.view:
        this.asideTitle = 'spc.monitor-groups.edit-monitor-group-title-label';
        break;
      default:
        break;
    }
  }

  closeForm() {
    this.formState === FormState.copy ? this.displayCloseFormConfirmationMessage() : this.hideForm();
  }

  private displayCloseFormConfirmationMessage() {
    this.confirmationService.confirm({
      message: this.translateService.instant('spc.monitor-groups.add-monitor-group-cancel-message'),
      accept: () => {
        this.hideForm();
      },
      reject: () => {
        event.preventDefault();
        this.focusOnAside();
      }
    });
  }

  private hideForm() {
    this.doCloseForm.emit();
    this.errorMonitorGroupExists = false;
  }

  focusOnAside() {
    // this.assignUsersButton ? this.assignUsersButton.nativeElement.focus() : this.customersDropdown.focusInput();
  }
}