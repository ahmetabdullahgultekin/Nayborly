import {Routes} from '@angular/router';
import {APP_ROUTES} from '../../app.routes';

export const AUTH_ROUTES: Routes = [
    {
        path: APP_ROUTES.AUTH.SIGN_IN,
        loadComponent: () => import('./pages/sign-in-page/sign-in-page.component').then(m => m.SignInPageComponent)
    },
    {
        path: APP_ROUTES.AUTH.SIGN_UP,
        loadComponent: () => import('./pages/sign-up-page/sign-up-page.component').then(m => m.SignUpPageComponent)
    },
    {
        path: APP_ROUTES.AUTH.FORGOT_PASSWORD,
        loadComponent: () => import('./pages/forget-password-page/forget-password-page.component').then(m => m.ForgetPasswordPageComponent)
    }
];

