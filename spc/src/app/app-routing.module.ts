import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { MonitorHomeComponent } from './monitor/monitor-home/monitor-home.component';
import { EmailHomeComponent } from './email/email-home/email-home.component';
import { LockHomeComponent } from './lock/lock-home/lock-home.component';
import { LocationFamilyHomeComponent } from './location-family/location-family-home/location-family-home.component';
import { SystemLogHomeComponent } from './system-log/system-log-home/system-log-home.component';
import { SystemParameterHomeComponent } from './system-parameter/system-parameter-home/system-parameter-home.component';

const routes: Routes = [
  {path: 'spc/monitors', component: MonitorHomeComponent},
  {path: 'spc/emails', component: EmailHomeComponent},
  {path: 'spc/locks', component: LockHomeComponent},
  {path: 'spc/location-families', component: LocationFamilyHomeComponent},
  {path: 'spc/system-logs', component: SystemLogHomeComponent},
  {path: 'spc/system-parameters', component: SystemParameterHomeComponent},
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
