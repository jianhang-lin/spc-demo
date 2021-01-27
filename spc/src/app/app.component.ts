import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HomePageModel, HomePageModelBuilder } from './domain/home-page.model';
import { HomeService } from './services/home.service';

@Component({
  selector: 'spc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'This is SPC Project';
  homePage: HomePageModel;

  constructor(
    private homeService: HomeService,
  ) {
  }

  ngOnInit(): void {
    this.initDefaultHomePage();
    this.homeService.currentHomePageSubject.subscribe(currentHomePage => {
      this.homePage = currentHomePage;
    });
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

  initDefaultHomePage() {
    this.homePage = new HomePageModelBuilder().getDefaultHomePageModel();
  }

  isSpcPage() {
    return window.location.pathname === '/spc';
  }

}
