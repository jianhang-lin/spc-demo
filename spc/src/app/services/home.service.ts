import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HomeCardModel } from '../domain/home-card.model';

@Injectable()
export class HomeService {

  constructor() {}

  initHomeCards(): Observable<HomeCardModel[]> {
    const homeCards: HomeCardModel[] = [
      {id: 1, src: 'assets/img/SPCwelcome_1.png'},
      {id: 2, src: 'assets/img/SPCwelcome_2.png'},
      {id: 3, src: 'assets/img/SPCwelcome_logo.png'},
      {id: 4, src: 'assets/img/SPCwelcome_3.png'},
      {id: 5, src: 'assets/img/SPCwelcome_4.png'},
    ];
    return of(homeCards);
  }
}
