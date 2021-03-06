import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeZoneInfo } from '../domain/time-zone-info.model';
import { NetUser } from '../domain/net-user.model';

@Injectable()
export class CommonService {

  private readonly loadNetUsers = '/server_info/loadNetUser';
  private readonly loadTimeZones = '/server_info/loadTimeZone';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getNetUsers(): Observable<NetUser[]> {
    const uri = `${this.config.uri}/${this.loadNetUsers}`;
    return this.http.get<NetUser[]>(uri);
  }

  getTimeZoneInfos(): Observable<TimeZoneInfo[]> {
    const uri = `${this.config.uri}/${this.loadTimeZones}`;
    return this.http.get<TimeZoneInfo[]>(uri);
  }
}
