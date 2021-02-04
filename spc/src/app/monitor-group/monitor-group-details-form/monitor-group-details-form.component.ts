import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription} from 'rxjs';
import { CommonService } from '../../services/common.service';
import { MonitorGroup } from '../../domain/monitor-group.model';
import { MonitorGroupTabs } from '../../domain/monitor-group-tabs.model';
import { TimeZoneInfo } from '../../domain/time-zone-info.model';

@Component({
  selector: 'spc-monitor-group-details-form',
  templateUrl: './monitor-group-details-form.component.html',
  styleUrls: ['./monitor-group-details-form.component.scss']
})
export class MonitorGroupDetailsFormComponent implements OnInit, OnDestroy {

  @Input() titleLabel: string;
  selectedTab: MonitorGroupTabs = MonitorGroupTabs.customerDetail;
  savedButtonClicked: boolean;
  // Present if is edit monitorGroup
  monitorGroup: MonitorGroup;
  showForm: boolean;
  showLoading: boolean;
  hasCustomLabels: boolean;
  timeZonesInfos: TimeZoneInfo[];
  timeZoneInfosSubscription: Subscription;
  constructor(
    private translateService: TranslateService,
    // private preferencesService: PreferencesService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.timeZoneInfosSubscription = this.commonService.getTimeZoneInfos().subscribe(timeZoneInfos => {
      this.timeZonesInfos = timeZoneInfos;
    });
  }

  ngOnDestroy(): void {
    if (this.timeZoneInfosSubscription) {
      this.timeZoneInfosSubscription.unsubscribe();
    }
  }

  openForm(monitorGroup: MonitorGroup, selectedTab?: MonitorGroupTabs) {
    console.log('details openForm...');
    this.selectedTab = selectedTab ? selectedTab : MonitorGroupTabs.customerDetail;
    this.savedButtonClicked = false;
    this.monitorGroup = monitorGroup;
    // this.managePagesQuery = new ManagePagesQueryItem({ customer });
    this.titleLabel = !!monitorGroup ?
      this.translateService.instant('spc.monitor-groups.edit-monitor-group-title-label') :
      this.translateService.instant('spc.monitor-groups.add-monitor-group-title-label');
    this.showForm = true;
    // If monitorGroup is present -> get data
    if (!this.monitorGroup) {
      return;
    }

    this.checkIfExistingCustomLabels();
    this.resetMonitorGroupData(monitorGroup);
  }

  public initializeForm() {
    console.log('initializeForm');
  }

  private checkIfExistingCustomLabels() {
    // const preferencesQuery = new PreferecesQueryItem({ customerId: this.customer.id });
    this.hasCustomLabels = false;
  }

  private resetMonitorGroupData(monitorGroup: MonitorGroup) {
    this.showLoading = true;
    this.getTimeZones();
  }

  private getTimeZones() {
    console.log(JSON.stringify(this.timeZonesInfos));
  }
}
