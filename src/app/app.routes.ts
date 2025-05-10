import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'listings',
    loadChildren: () =>
      import('./features/listings/listings.routes')
        .then(m => m.LISTINGS_ROUTES)   // <- pulls in the array above
  },
  {path: '', redirectTo: 'listings', pathMatch: 'full'}
];
