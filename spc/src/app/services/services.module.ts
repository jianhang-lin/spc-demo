import { ModuleWithProviders, NgModule } from '@angular/core';
import { HomeService } from './home.service';
import { MonitorGroupService } from './monitor-group.service';
import { FunctionService } from './function.service';
import { MonitorService } from './monitor.service';
import { ChartService } from './chart.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        HomeService,
        MonitorGroupService,
        FunctionService,
        MonitorService,
        ChartService,
      ]
    };
  }
}
