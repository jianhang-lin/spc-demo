import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { zip } from "rxjs";
import { SingleSpaService } from "../../service/single-spa.service";

@Component({
  selector: 'slb-spa-host',
  templateUrl: './spa-host.component.html',
  styleUrls: ['./spa-host.component.scss']
})
export class SpaHostComponent implements OnInit, OnDestroy {

  @ViewChild('app1', { static: true }) private app1: ElementRef;
  @ViewChild('spc', { static: true }) private spc: ElementRef;

  constructor(private service: SingleSpaService) { }

  ngOnInit() {
    this.service.mount('app1', this.app1.nativeElement).subscribe();
    this.service.mount('spc', this.spc.nativeElement).subscribe();
  }

  async ngOnDestroy() {
    await zip(
      this.service.unmount('app1'),
      this.service.unmount('spc')
    ).toPromise();
  }
}
