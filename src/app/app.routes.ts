import {Routes} from '@angular/router';

// Enumeration of all the routes in the app
export const APP_ROUTES = {
  INTRO: {
    LANDING: '',
    ABOUT: 'about',
    CONTACT: 'contact',
  },
  LISTINGS: {
    LIST: 'listings',
    DETAIL: ':id',
    EDIT: ':id/edit',
  },
  PROFILE: {
    PROFILE: 'profile',
    DASHBOARD: 'profile/dashboard',
  },
  AUTH: {
    AUTH: 'auth',
    SIGN_IN: 'sign-in',
    SIGN_UP: 'sign-up',
    FORGOT_PASSWORD: 'forgot-password',
  }
};

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/intro/intro.routes')
        .then(m => m.INTRO_ROUTES)   // <- pulls in the array above
  },
  {
    path: APP_ROUTES.LISTINGS.LIST,
    loadChildren: () =>
      import('./features/listings/listings.routes')
        .then(m => m.LISTINGS_ROUTES)   // <- pulls in the array above
  },
  {
    path: APP_ROUTES.PROFILE.PROFILE,
    loadChildren: () =>
      import('./features/profile/profile.routes')
        .then(m => m.PROFILE_ROUTES)   // <- pulls in the array above
  },
  {
    path: APP_ROUTES.AUTH.AUTH,
    loadChildren: () =>
      import('./core/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)   // <- pulls in the array above
  },
  {path: '', redirectTo: 'listings', pathMatch: 'full'},
  {path: '**', redirectTo: 'listings'}
];
