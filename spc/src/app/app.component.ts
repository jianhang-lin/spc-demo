import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {HomePageModel, HomePageModelBuilder} from './domain/home-page.model';

@Component({
  selector: 'spc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'This is SPC Project';
  homePage: HomePageModel;

  ngOnInit(): void {
    this.initHomePage();
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

  isSpcPage() {
    return window.location.pathname === '/spc';
  }

  initHomePage() {
    this.homePage = new HomePageModelBuilder().getSpcHomePageModel();
  }

}
