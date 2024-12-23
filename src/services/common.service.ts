import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PageOptions {
  pageSizeOptions: number[];
}


@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getPageOptions(): Observable<PageOptions> {
    let options: PageOptions = {
      pageSizeOptions: [10, 30, 50, 100],
    };

    return of(options);
  }
}
