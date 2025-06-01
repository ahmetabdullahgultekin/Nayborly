import {Routes} from '@angular/router';
import {APP_ROUTES} from '../../app.routes';

export const DASHBOARD_VIEW_ROUTES: Routes = [
  {
    path: APP_ROUTES.PROFILE.DASHBOARD_VIEW.OVERVIEW,
    loadComponent: () => import('./dashboard-page/overview/overview.component').then(m => m.OverviewComponent)
  },
  {
    path: APP_ROUTES.PROFILE.DASHBOARD_VIEW.POSTS,
    loadComponent: () => import('./dashboard-page/posts/posts.component').then(m => m.PostsComponent)
  },
  {
    path: APP_ROUTES.PROFILE.DASHBOARD_VIEW.USERS,
    loadComponent: () => import('./dashboard-page/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: APP_ROUTES.PROFILE.DASHBOARD_VIEW.CONTACT_MESSAGES,
    loadComponent: () => import('./dashboard-page/contact-messages/contact-messages.component').then(m => m.ContactMessagesComponent)
  }
];

