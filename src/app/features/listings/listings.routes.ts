// features/listings/listings.routes.ts
import {Routes} from '@angular/router';

export const LISTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/listing-page/listing-page.component').then(m => m.ListingPageComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/detail/listing-detail-page/listing-detail-page.component').then(m => m.ListingDetailPageComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/edit/listing-edit-page/listing-edit-page.component').then(m => m.ListingEditPageComponent)
  }
];
