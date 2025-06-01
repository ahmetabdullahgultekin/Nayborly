import {Routes} from '@angular/router';
import {APP_ROUTES} from '../../app.routes';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./profile-page/profile-page.component').then(m => m.ProfilePageComponent)
  },
  {
    path: APP_ROUTES.PROFILE.DASHBOARD,
    loadComponent: () => import('./dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
    loadChildren: () => import('./dashboard.view.routes').then(m => m.DASHBOARD_VIEW_ROUTES)
  }
];
