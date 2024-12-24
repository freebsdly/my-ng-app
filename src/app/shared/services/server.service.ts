import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ServerInfo {
  disabled: boolean;
  id: string;
  name: string;
  model: string;
  ipAddresses: string[];
  lastRebootTime: string;
  nextRebootTime: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor() {}

  getServerInfos(): Observable<ServerInfo[]> {
    const data: ServerInfo[] = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        disabled: false,
        id: `${i}`,
        name: `Edward ${i}`,
        model: `model${i % 10}`,
        ipAddresses: [`10.128.255.${i}`, `10.128.255.${i + 1}`],
        lastRebootTime: '2024-05-03 17:18:20',
        nextRebootTime: '2024-12-30',
      });
    }

    return of(data);
  }
}
