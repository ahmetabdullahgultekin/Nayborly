import {Routes} from '@angular/router';
import {APP_ROUTES} from '../../app.routes';

export const INTRO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: APP_ROUTES.INTRO.ABOUT,
    loadComponent: () => import('./about-page/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: APP_ROUTES.INTRO.CONTACT,
    loadComponent: () => import('./contact-page/contact-page.component').then(m => m.ContactPageComponent)
  }
];

