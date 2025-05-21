// features/listings/listings.routes.ts
import {Routes} from '@angular/router';
import {APP_ROUTES} from '../../app.routes';

export const LISTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/listing-page/listing-page.component').then(m => m.ListingPageComponent)
  },
  {
    path: APP_ROUTES.LISTINGS.DETAIL,
    loadComponent: () =>
      import('./pages/detail/listing-detail-page/listing-detail-page.component').then(m => m.ListingDetailPageComponent)
  },
  {
    path: APP_ROUTES.LISTINGS.EDIT,
    loadComponent: () =>
      import('./pages/edit/listing-edit-page/listing-edit-page.component').then(m => m.ListingEditPageComponent)
  }
];
