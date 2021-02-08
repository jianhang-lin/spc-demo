import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { assetUrl } from '../../single-spa/asset-url';
import { HomeCardModel } from '../domain/home-card.model';
import { DataSourceTypeOption } from '../domain/data-source-type-option.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MonitorGroupService {

  private is42qSite: boolean;

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  deleteMonitorGroup(monitorGroupKey: number): Observable<any> {
    return this.http.delete(`${this.config.uri}/monitor-groups/${monitorGroupKey}`);
  }

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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
