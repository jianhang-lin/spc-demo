import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FunctionCard } from '../domain/function-card.model';
import { assetUrl } from '../../single-spa/asset-url';

@Injectable()
export class FunctionService {

  private readonly monitorGroups = 'monitor-groups';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {}

  getFunctionCards(): Observable<FunctionCard[]> {
    const imgUrl = assetUrl('img');
    const functionCards: FunctionCard[] = [
      {id: 1, src: `${imgUrl}/icons/function/monitor_setting.png`, desc: 'Monitor Maintenance', monitorGroupKey: 0, communityId: 0},
      {id: 2, src: `${imgUrl}/icons/function/mail_setting.png`, desc: 'E-mail Maintenance', monitorGroupKey: 0, communityId: 0},
      {id: 3, src: `${imgUrl}/icons/function/lock.png`, desc: 'Lock Maintenance', monitorGroupKey: 0, communityId: 0},
      {id: 4, src: `${imgUrl}/icons/function/location_family_setting.png`, desc: 'Location Family Maintenance', monitorGroupKey: 0,
        communityId: 0},
      {id: 5, src: `${imgUrl}/icons/function/system_log.jpg`, desc: 'System Log Maintenance', monitorGroupKey: 0, communityId: 0},
      {id: 6, src: `${imgUrl}/icons/function/system_parameter_setting.png`, desc: 'SPC System Parameter Maintenance', monitorGroupKey: 0,
        communityId: 0},
    ];
    return of(functionCards);
  }
}
