import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HomeCardModel } from '../domain/home-card.model';
import { assetUrl } from '../../single-spa/asset-url';
import { HomePageModel, HomePageModelBuilder } from '../domain/home-page.model';

@Injectable()
export class HomeService {

  public currentHomePageSubject = new BehaviorSubject<HomePageModel>(new HomePageModelBuilder().getDefaultHomePageModel());

  constructor() {}

  initHomeCards(): Observable<HomeCardModel[]> {
    const imgUrl = assetUrl('img');
    const homeCards: HomeCardModel[] = [
      {id: 1, src: `${imgUrl}/SPCwelcome_1.png`},
      {id: 2, src: `${imgUrl}/SPCwelcome_2.png`},
      {id: 3, src: `${imgUrl}/SPCwelcome_logo.png`},
      {id: 4, src: `${imgUrl}/SPCwelcome_3.png`},
      {id: 5, src: `${imgUrl}/SPCwelcome_4.png`},
      {id: 6, src: `${imgUrl}/SPCwelcome_enter.png`},
    ];
    return of(homeCards);
  }

  switchCurrentHomePage(homePage: HomePageModel): void {
    this.currentHomePageSubject.next(homePage);
  }

}
