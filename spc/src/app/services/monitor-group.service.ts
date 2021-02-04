import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { assetUrl } from '../../single-spa/asset-url';
import { HomeCardModel } from '../domain/home-card.model';
import { DataSourceTypeOption } from '../domain/data-source-type-option.model';

@Injectable()
export class MonitorGroupService {

  private is42qSite: boolean;

  constructor() {}

  getMonitorGroups(): Observable<HomeCardModel[]> {
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

  getDataSourceTypeOptions(): Observable<DataSourceTypeOption[]> {
    const dataSourceTypeOptions: DataSourceTypeOption[] = [
      {id: 1, value: 1, name: 'MDS'},
      {id: 2, value: 2, name: 'SPI'},
      {id: 3, value: 3, name: 'DotLine Source'},
    ];
    return of(dataSourceTypeOptions);
  }

  getIs42qSite(): boolean {
    return this.is42qSite;
  }

  setIs42qSite(value: boolean) {
    this.is42qSite = value;
  }
}
