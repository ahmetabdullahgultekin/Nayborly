import {Component, inject, signal} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {LoadingComponent} from '../../../../../../shared/loading/loading.component';
import {NgIf} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';
import {LoadingService} from '../../../../../../core/services/loading.service';

@Component({
  selector: 'app-view-post',
  imports: [
    HttpClientModule,
    LoadingComponent,
    NgIf,
    RouterLink,
  ],
  templateUrl: './view-post.component.html',
  standalone: true,
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  listing = signal<any>(null);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  constructor(protected loading: LoadingService) {
    const id = this.route.snapshot.paramMap.get('id');
    loading.show();
    // detail.component.ts  (GET one)
    this.http.get<any>(
      `https://api.jsonbin.io/v3/b/${environment.jsonBin.id}/${id}`,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(
      data => {
        this.listing.set(data);
        loading.hide();
      },
      error => {
        console.error('Error fetching listing:', error);
        loading.hide();
      }
    );
  }
}
