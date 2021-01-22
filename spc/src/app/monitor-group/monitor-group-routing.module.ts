import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorGroupListComponent } from './monitor-group-list/monitor-group-list.component';

const routes: Routes = [
  {path: 'aa', component: MonitorGroupListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MonitorGroupRoutingModule { }