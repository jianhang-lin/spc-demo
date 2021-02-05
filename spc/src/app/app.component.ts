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
    this.initSpcBanner();
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

  initSpcBanner() {
    console.log('  _________   _____    _______      _____  .___ _______      _____      ____________________________\n');
    console.log(' /   _____/  /  _  \\   \\      \\    /     \\ |   |\\      \\    /  _  \\    /   _____/\\______   \\_   ___ \\\n');
    console.log(' \\_____  \\  /  /_\\  \\  /   |   \\  /  \\ /  \\|   |/   |   \\  /  /_\\  \\   \\_____  \\  |     ___/    \\  \\/\n');
    console.log(' /        \\/    |    \\/    |    \\/    Y    \\   /    |    \\/    |    \\  /        \\ |    |   \\     \\____\n');
    console.log('/_______  /\\____|__  /\\____|__  /\\____|__  /___\\____|__  /\\____|__  / /_______  / |____|    \\______  /\n');
    console.log('        \\/         \\/         \\/         \\/            \\/         \\/          \\/                   \\/\n');
  }

  initDefaultHomePage() {
    this.homePage = new HomePageBuilder().getDefaultHomePage();
  }

  isSpcHomePage() {
    return window.location.pathname === '/spc';
  }

}
