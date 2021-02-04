import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { SharedUiModule } from 'shared-ui';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { HomeListComponent} from './home/home-list/home-list.component';
import { HomeCardComponent } from './home/home-card/home-card.component';
import { MonitorGroupHomeComponent } from './monitor-group/monitor-group-home/monitor-group-home.component';
import { MonitorGroupDetailsFormComponent } from './monitor-group/monitor-group-details-form/monitor-group-details-form.component';
import { MonitorGroupListComponent } from './monitor-group/monitor-group-list/monitor-group-list.component';
import { FunctionHomeComponent } from './function/function-home/function-home.component';
import { FunctionListComponent } from './function/function-list/function-list.component';
import { MonitorHomeComponent } from './monitor/monitor-home/monitor-home.component';
import { MonitorListComponent } from './monitor/monitor-list/monitor-list.component';
import { ChartHomeComponent } from './chart/chart-home/chart-home.component';
import { EmailHomeComponent } from './email/email-home/email-home.component';
import { EmailListComponent } from './email/email-list/email-list.component';
import { LockHomeComponent } from './lock/lock-home/lock-home.component';
import { LockListComponent } from './lock/lock-list/lock-list.component';
import { LocationFamilyHomeComponent } from './location-family/location-family-home/location-family-home.component';
import { LocationFamilyListComponent } from './location-family/location-family-list/location-family-list.component';
import { SystemLogHomeComponent } from './system-log/system-log-home/system-log-home.component';
import { SystemLogListComponent } from './system-log/system-log-list/system-log-list.component';
import { SystemParameterHomeComponent } from './system-parameter/system-parameter-home/system-parameter-home.component';
import { SystemParameterListComponent } from './system-parameter/system-parameter-list/system-parameter-list.component';
import {
  SystemParameterDetailsFormComponent
} from './system-parameter/system-parameter-details-form/system-parameter-details-form.component';
import { CardComponent } from './shared/card/card.component';
import { SpcTranslationService } from './services/spc-translation.service';
import { ConfirmationService } from 'primeng/api';
import { HomeService } from './services/home.service';
import { MonitorGroupService } from './services/monitor-group.service';
import { FunctionService } from './services/function.service';
import { MonitorService } from './services/monitor.service';
import { ChartService } from './services/chart.service';
import { EmailService } from './services/email.service';
import { LockService } from './services/lock.service';
import { CommonService } from './services/common.service';
import { SpcTranslateLoaderModel } from './domain/spc-translate-loader.model';
import { assetUrl } from '../single-spa/asset-url';

export function createSpcLocalStorageTranslateLoader(translationService: SpcTranslationService, http: HttpClient) {
  // return new SpcTranslateLoaderModel(translationService);
  return new TranslateHttpLoader(http, assetUrl('i18n') + '/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    CardComponent,
    HomeListComponent,
    HomeCardComponent,
    MonitorGroupHomeComponent,
    MonitorGroupDetailsFormComponent,
    MonitorGroupListComponent,
    FunctionHomeComponent,
    FunctionListComponent,
    MonitorHomeComponent,
    MonitorListComponent,
    ChartHomeComponent,
    EmailHomeComponent,
    EmailListComponent,
    LockHomeComponent,
    LockListComponent,
    LocationFamilyHomeComponent,
    LocationFamilyListComponent,
    SystemLogHomeComponent,
    SystemLogListComponent,
    SystemParameterHomeComponent,
    SystemParameterListComponent,
    SystemParameterDetailsFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    AppRoutingModule,
    SharedUiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createSpcLocalStorageTranslateLoader,
        deps: [SpcTranslationService, HttpClient]
      }
    })
  ],
  providers: [
    ConfirmationService,
    HomeService,
    MonitorGroupService,
    FunctionService,
    MonitorService,
    ChartService,
    EmailService,
    LockService,
    CommonService,
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:8080'
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CardComponent
  ]
})
export class AppModule { }
