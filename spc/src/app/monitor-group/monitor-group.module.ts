import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MonitorGroupRoutingModule } from './monitor-group-routing.module';

import { MonitorGroupHomeComponent } from './monitor-group-home/monitor-group-home.component';
import { MonitorGroupListComponent } from './monitor-group-list/monitor-group-list.component';

@NgModule({
  declarations: [MonitorGroupHomeComponent, MonitorGroupListComponent],
  exports: [
    MonitorGroupListComponent
  ],
  imports: [
    SharedModule,
    MonitorGroupRoutingModule
  ]
})
export class MonitorGroupModule { }
