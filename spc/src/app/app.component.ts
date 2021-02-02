import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from './services/home.service';
import { HomePage, HomePageBuilder } from './domain/home-page.model';


@Component({
  selector: 'spc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'This is SPC Project';
  homePage: HomePage;

  currentHomePageSubscription: Subscription;
  monitorGroupListSubscription: Subscription;
  constructor(
    private translateService: TranslateService,
    private homeService: HomeService,
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit(): void {
    this.initDefaultHomePage();
    this.currentHomePageSubscription = this.homeService.currentHomePageSubject.subscribe(currentHomePage => {
      this.homePage = currentHomePage;
    });
  }

  ngOnDestroy(): void {
    if (this.currentHomePageSubscription) {
      this.currentHomePageSubscription.unsubscribe();
    }
    if (this.monitorGroupListSubscription) {
      this.monitorGroupListSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
  }

  initDefaultHomePage() {
    this.homePage = new HomePageBuilder().getDefaultHomePage();
  }

  isSpcHomePage() {
    return window.location.pathname === '/spc';
  }

}
