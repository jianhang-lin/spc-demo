import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { MonitorGroupListComponent } from './monitor-group/monitor-group-list/monitor-group-list.component';
import { HomeListComponent } from './home/home-list/home-list.component';

const routes: Routes = [
  {path: 'spc', component: HomeListComponent},
  {path: 'spc/monitor_groups', component: MonitorGroupListComponent},
  {
    path: '**',
    component: EmptyRouteComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
