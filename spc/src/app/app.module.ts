import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { MonitorGroupModule } from './monitor-group/monitor-group.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { SpcTranslationService } from './services/spc-translation.service';
import { SpcTranslateLoaderModel } from './domain/spc-translate-loader.model';

export function createSpcLocalStorageTranslateLoader(translationService: SpcTranslationService) {
  return new SpcTranslateLoaderModel(translationService);
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createSpcLocalStorageTranslateLoader,
        deps: [SpcTranslationService]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
