import { ModuleWithProviders, NgModule } from '@angular/core';
import { HomeService } from './home.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        HomeService,
      ]
    };
  }
}
