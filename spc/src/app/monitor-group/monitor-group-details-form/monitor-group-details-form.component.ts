import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { MonitorGroupForm } from './monitor-group.form';
import { FormState } from '../../domain/form-state.model';
import { TimeZoneInfo } from '../../domain/time-zone-info.model';
import { NetUser } from '../../domain/net-user.model';
import { MonitorGroup } from '../../domain/monitor-group.model';
import { MonitorGroupTabs } from '../../domain/monitor-group-tabs.model';

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
  is42qAdmin: boolean;
  is42qSite: boolean;
  asideTitle: string;
  selectedTab: MonitorGroupTabs = MonitorGroupTabs.customerDetail;
  savedButtonClicked: boolean;
  // Present if is edit monitorGroup
  monitorGroupForm: MonitorGroupForm;
  showLoading: boolean;
  hasCustomLabels: boolean;
  netUsers: NetUser[];
  timeZonesInfos: TimeZoneInfo[];
  netUsersSubscription: Subscription;
  timeZoneInfosSubscription: Subscription;
  constructor(
    private translateService: TranslateService,
    // private preferencesService: PreferencesService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.monitorGroupForm = new MonitorGroupForm();
    this.getLoggedUserInfo();
    this.openForm();
    this.getTreeWidgetPermissions();
    this.setAsideTitle();
  }

  ngOnDestroy(): void {
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
      this.netUsers = netUsers;
    });
    console.log(JSON.stringify(this.netUsers));
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
}
