import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ModelInfo {
  id: number;
  name: string;
  key: string;
  group: string;
}

export interface ModelQueryOptions {
  keyword?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor() {}

  getModelInfos(options?: ModelQueryOptions): Observable<ModelInfo[]> {
    let infos: ModelInfo[] = [];
    if (options && options.keyword && options.keyword !== '') {
      infos = [
        { id: 1, name: '虚拟服务器', key: 'vm', group: '主机类' },
        {
          id: 2,
          name: 'x86物理服务器',
          key: 'hardwareServer',
          group: '主机类',
        },
        { id: 3, name: 'Power虚拟服务器', key: 'powervm', group: '主机类' },
        { id: 4, name: '小型机', key: 'minicomputer', group: '主机类' },
      ];
    } else {
      infos = [];
      for (let i = 1; i <= 200; i++) {
        let info = {
          id: i,
          name: `模型${i}`,
          key: `model${i}`,
          group: `group${i % 10}`,
        };
        infos.push(info);
      }
    }
    return of(infos);
  }
}
