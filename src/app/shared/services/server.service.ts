import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModelInfo } from './model.service';
import { Page } from './api';

export interface ServerInfo {
  disabled: boolean;
  id: string;
  name: string;
  model: ModelInfo;
  ipAddresses: string[];
  lastRebootTime: string;
  nextRebootTime: string;
}

export interface ServerQueryOptions {
  pageIndex: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor() {}

  getServerInfos(options: ServerQueryOptions): Observable<Page<ServerInfo>> {
    if (!options.pageIndex || options.pageIndex <= 1) {
      options.pageIndex = 0;
    }
    const data: Page<ServerInfo> = {
      pageIndex: options.pageIndex,
      pageSize: options.pageSize,
      total: 1000,
      content: [],
    };
    for (
      let i = options.pageIndex * options.pageSize + 1;
      i <= (options.pageIndex + 1) * options.pageSize;
      i++
    ) {
      data.content.push({
        disabled: false,
        id: `${i}`,
        name: `Edward ${i}`,
        model: {
          id: 1,
          name: `模型${i % 10}`,
          key: `model${i % 10}`,
        } as ModelInfo,
        ipAddresses: [`10.128.255.${i}`, `10.128.255.${i + 1}`],
        lastRebootTime: '2024-05-03 17:18:20',
        nextRebootTime: '2024-12-30',
      });
    }
    return of(data);
  }
}
