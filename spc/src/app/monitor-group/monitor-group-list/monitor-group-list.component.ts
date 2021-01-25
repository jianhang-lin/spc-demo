import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spc-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss']
})
export class MonitorGroupListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('monitor_groups ngOnInit...');
  }

}
