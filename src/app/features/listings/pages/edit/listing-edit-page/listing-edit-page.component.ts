import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {EditPostComponent} from '../component/edit-post/edit-post.component';
import {Post} from '../../../../../core/interfaces/post';

@Component({
  selector: 'app-listing-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, EditPostComponent],
  templateUrl: './listing-edit-page.component.html',
})
export class ListingEditPageComponent {
  model: Post = {
    id: '',
    title: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    userId: '',
    price: 0,
    tags: [],
    rating: 0,
    views: 0,
    location: '',
    category: undefined as any,
    status: undefined as any
  };
  private http = inject(HttpClient);
  private router = inject(Router);

  save() {
    // 1. Fetch the current listings
    this.http.get<any>(
      `https://api.jsonbin.io/v3/b/${environment.jsonBin.bins.listingsBin.id}`,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(data => {
      const listings = data.record.listings || [];
      // 2. Update the item in the array
      const idx = listings.findIndex((l: Post) => l.id === this.model.id);
      if (idx !== -1) listings[idx] = this.model;
      // 3. PUT the whole updated array back
      this.http.put(
        `https://api.jsonbin.io/v3/b/${environment.jsonBin.bins.listingsBin.id}`,
        {listings},
        {headers: {'X-Master-Key': environment.jsonBin.master}}
      ).subscribe(() => this.router.navigate(['..']));
    });
  }
}
