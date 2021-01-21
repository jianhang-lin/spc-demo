import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [],
  exports: [
    AppRoutingModule
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ServicesModule.forRoot(),
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:8080'
      }
    }
  ]
})
export class CoreModule {
  // load core only one time
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ds: DomSanitizer) {
    if (parent) {
      throw new Error('Core模块已经存在，不能再次加载!');
    }
  }
}
