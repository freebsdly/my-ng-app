import { Injectable } from '@angular/core';
import { delay, Observable, observeOn, of, animationFrameScheduler } from 'rxjs';

export interface ItemData {
  disabled: boolean;
  id: string;
  name: string;
  age: number;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor() {}

  getServers(): Observable<ItemData[]> {
    const data: ItemData[] = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        disabled: false,
        id: `${i}`,
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }

    return of(data);
  }
}
