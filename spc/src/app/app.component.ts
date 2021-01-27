import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'spc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'This is SPC Project';
  isHomePage: boolean;
  ngOnInit(): void {
    this.isHomePage = true;
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

  isSpcPage() {
    return window.location.pathname === '/spc';
  }
}
