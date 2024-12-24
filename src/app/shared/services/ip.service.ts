import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IpInfo {
  id: number;
  ip: string;
  role: string;
  subnet: string;
  canReused: boolean;
}

export interface IpInfoQueryOptions {
  keyword?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IpService {
  constructor() {}

  getIpInfos(options?: IpInfoQueryOptions): Observable<IpInfo[]> {
    let ipinfos: IpInfo[] = [];
    if (options && options.keyword && options.keyword !== '') {
      for (let i = 1; i <= 50; i++) {
        let role = i % 10 == 1 ? 'biz_ip' : 'manger_ip';
        ipinfos.push({
          id: i,
          ip: `${options.keyword}.${i}`,
          subnet: `${options.keyword}.0/24`,
          role: role,
          canReused: role === 'biz_ip',
        });
      }
    } else {
      for (let i = 1; i <= 100; i++) {
        let role = i % 10 == 1 ? 'biz_ip' : 'manger_ip';
        ipinfos.push({
          id: i,
          ip: `10.128.255.${i}`,
          subnet: `10.128.255.0/24`,
          role: role,
          canReused: role === 'biz_ip',
        });
      }
    }

    return of(ipinfos);
  }
}
