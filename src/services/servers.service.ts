import { Injectable } from '@angular/core';

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
export class ServersService {
  constructor() {}
}
