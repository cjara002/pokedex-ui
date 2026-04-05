import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'browse',
    pathMatch: 'full',
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./pages/browse/browse.component').then((m) => m.BrowseComponent),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./pages/detail/detail.component').then((m) => m.DetailComponent),
  },
  {
    path: '**',
    redirectTo: 'browse',
  },
];
