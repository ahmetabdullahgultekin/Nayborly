import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {LoadingComponent} from '../../../../../../shared/loading/loading.component';
import {LoadingService} from '../../../../../../core/services/loading.service';

@Component({
  selector: 'app-listing-flow',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    LoadingComponent,
    DatePipe
  ],
  templateUrl: './listing-flow.component.html',
  standalone: true,
  styleUrl: './listing-flow.component.css'
})
export class ListingFlowComponent {
  listings = signal<any[]>([]);
  private http = inject(HttpClient);

  constructor(protected loadingService: LoadingService) {
    this.loadingService.show();
    this.http.get<any>(
      `https://api.jsonbin.io/v3/b/${environment.jsonBin.id}`,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(
      data => {
        // Adjust 'record' to match the actual property containing the array
        this.listings.set(Array.isArray(data.record) ? data.record : []);
        this.loadingService.hide();
      },
      error => {
        console.error('Error fetching listings:', error);
        this.loadingService.hide();
      }
    );
  }
}
