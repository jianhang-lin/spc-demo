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
import { MonitorGroupListComponent } from './monitor-group/monitor-group-list/monitor-group-list.component';
import { FunctionHomeComponent } from './function/function-home/function-home.component';
import { FunctionListComponent } from './function/function-list/function-list.component';
import { MonitorHomeComponent } from './monitor/monitor-home/monitor-home.component';
import { ChartHomeComponent } from './chart/chart-home/chart-home.component';
import { CardComponent } from './shared/card/card.component';
import { SpcTranslationService } from './services/spc-translation.service';
import { ConfirmationService } from 'primeng/api';
import { HomeService } from './services/home.service';
import { MonitorGroupService } from './services/monitor-group.service';
import { MonitorService } from './services/monitor.service';
import { ChartService } from './services/chart.service';
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
    MonitorGroupListComponent,
    FunctionHomeComponent,
    FunctionListComponent,
    MonitorHomeComponent,
    ChartHomeComponent,
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
    MonitorService,
    ChartService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CardComponent
  ]
})
export class AppModule { }
