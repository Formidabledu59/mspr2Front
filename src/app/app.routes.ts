import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then(m => m.default)
  },
  {
    path: 'stats',
    loadChildren: () => import('./features/stats/stats.routes')
      .then(m => m.default)
  },
  {
    path: 'prediction',
    loadChildren: () => import('./features/prediction/prediction.routes')
    .then(m => m.default)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes')
    .then(m => m.default)
  },
  {
    path: 'prediction',
    loadChildren: () => import('./features/prediction/prediction.routes')
      .then(m => m.default)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
