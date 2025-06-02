import {Component, inject, signal} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {LoadingComponent} from '../../../../../../shared/loading/loading.component';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';
import {LoadingService} from '../../../../../../core/services/loading.service';
import {SnackbarService, SnackbarType} from '../../../../../../core/services/snackbar.service';

@Component({
  selector: 'app-view-post',
  imports: [
    HttpClientModule,
    LoadingComponent,
    NgIf,
    RouterLink,
    NgForOf,
    DatePipe,
  ],
  templateUrl: './view-post.component.html',
  standalone: true,
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  listing = signal<any>(null);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  constructor(protected loading: LoadingService, private snackbar: SnackbarService) {
    const id = this.route.snapshot.paramMap.get('id');
    loading.show();
    // Fetch all listings, then find the one with the matching id
    this.http.get<any>(
      environment.jsonBin.bins.listingsBin.url,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(
      data => {
        // JSONBin returns { record: [...] }
        const listings = Array.isArray(data?.record) ? data.record : [];
        const found = listings.find((item: any) => item.id === id);
        if (!found) {
          this.snackbar.show('Edit your new listing.', SnackbarType.Warning);
        }
        this.listing.set(found || null);
        loading.hide();
      },
      error => {
        this.snackbar.show('Error fetching listings.', SnackbarType.Error);
        console.error('Error fetching listings:', error);
        loading.hide();
      }
    );
  }
}
