import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-listing-flow',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  template: `
    <section class="p-4 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Neighbour Listings</h1>

      <div *ngIf="loading()">Loading…</div>
      <ul *ngIf="!loading()" class="space-y-2">
        <li *ngFor="let item of listings()" class="border p-2 rounded shadow-sm hover:shadow">
          <a [routerLink]="item.id" class="underline text-primary">{{ item.title }}</a>
        </li>
      </ul>
    </section>
  `,
  standalone: true,
  styleUrl: './listing-flow.component.css'
})
export class ListingFlowComponent {
  listings = signal<any[]>([]);
  loading = signal(true);
  private http = inject(HttpClient);

  constructor() {
    this.http.get<any[]>(
      `https://api.jsonbin.io/v3/b/${environment.jsonBin.id}`,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(
      data => {
        this.listings.set(data);
        this.loading.set(false);
      },
      error => {
        console.error('Error fetching listings:', error);
        this.loading.set(false);
      }
    );
  }
}
