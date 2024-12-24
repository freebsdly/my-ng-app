import { Routes } from '@angular/router';
import { ListComponent } from '@/features/servers/list/list.component';
import { TestComponent } from '@/features/test/test.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servers', children: [{ path: 'list', component: ListComponent }] },
  { path: 'test', component: TestComponent },
];
