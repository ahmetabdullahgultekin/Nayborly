import {Component, inject, signal} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {LoadingComponent} from '../../../../../../shared/loading/loading.component';
import {NgIf} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-view-post',
  imports: [
    HttpClientModule,
    LoadingComponent,
    NgIf,
    RouterLink
  ],
  template: `
    <section class="p-4 max-w-xl mx-auto">
      <a routerLink="/listings" class="text-primary underline">← back to listings</a>
      <ng-container *ngIf="loading(); else loaded">
        <app-loading></app-loading>
      </ng-container>

      <ng-template #loaded>
        <h1 class="text-3xl font-bold mb-2">{{ listing()?.title }}</h1>
        <p class="mb-4">{{ listing()?.description }}</p>
        <button routerLink="edit" class="px-4 py-2 bg-primary text-white rounded">Edit</button>
      </ng-template>
    </section>
  `,
  standalone: true,
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  listing = signal<any>(null);
  loading = signal(true);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    // detail.component.ts  (GET one)
    this.http.get<any>(
      `https://api.jsonbin.io/v3/b/${environment.jsonBin.id}/${id}`,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(
      data => {
        this.listing.set(data);
        this.loading.set(false);
      },
      error => {
        console.error('Error fetching listing:', error);
        this.loading.set(false);
      }
    );
  }
}
