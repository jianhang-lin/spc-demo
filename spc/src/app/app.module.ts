import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { MonitorGroupModule } from './monitor-group/monitor-group.module';
import { MonitorModule } from './monitor/monitor.module';
import { ChartModule } from './chart/chart.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { SpcTranslationService } from './services/spc-translation.service';
import { SpcTranslateLoaderModel } from './domain/spc-translate-loader.model';
import { assetUrl } from '../single-spa/asset-url';

export function createSpcLocalStorageTranslateLoader(translationService: SpcTranslationService, http: HttpClient) {
  // return new SpcTranslateLoaderModel(translationService);
  return new TranslateHttpLoader(http, assetUrl('i18n') + '/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    MonitorGroupModule,
    MonitorModule,
    ChartModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createSpcLocalStorageTranslateLoader,
        deps: [SpcTranslationService, HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
