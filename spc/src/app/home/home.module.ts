import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeCardComponent } from './home-card/home-card.component';


@NgModule({
  declarations: [
    HomeListComponent,
    HomeCardComponent,
  ],
  exports: [
    HomeListComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
