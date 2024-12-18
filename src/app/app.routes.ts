import { Routes } from '@angular/router';
import { ListComponent } from '../servers/list/list.component';

export const routes: Routes = [
  { path: 'servers', children: [{ path: 'list', component: ListComponent }] },
];
