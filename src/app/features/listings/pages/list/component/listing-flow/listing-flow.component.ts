import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {LoadingComponent} from '../../../../../../shared/loading/loading.component';
import {LoadingService} from '../../../../../../core/services/loading.service';
import {SnackbarService, SnackbarType} from '../../../../../../core/services/snackbar.service';

@Component({
  selector: 'app-listing-flow',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    LoadingComponent,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './listing-flow.component.html',
  standalone: true,
  styleUrl: './listing-flow.component.css'
})
export class ListingFlowComponent {
  listings = signal<any[]>([]);
  private http = inject(HttpClient);

  constructor(
    protected loadingService: LoadingService,
    private snackbarService: SnackbarService
  ) {
    this.loadingService.show();
    this.http.get<any>(
      environment.jsonBin.bins.listingsBin.url,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(
      data => {
        // Adjust 'record' to match the actual property containing the array
        this.listings.set(Array.isArray(data.record) ? data.record : []);
        this.snackbarService.show('Listings loaded successfully', SnackbarType.Success);
        this.loadingService.hide();
      },
      error => {
        this.snackbarService.show('Failed to load listings', SnackbarType.Error);
        console.error('Error loading listings:', error);
        this.loadingService.hide();
      }
    );
  }
}
