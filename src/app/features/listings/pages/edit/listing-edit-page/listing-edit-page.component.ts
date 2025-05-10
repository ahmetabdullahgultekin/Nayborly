import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-listing-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  template: `
    <section class="p-4 max-w-xl mx-auto space-y-4">
      <h1 class="text-2xl font-bold">Edit listing</h1>

      <form #f="ngForm" (ngSubmit)="save()" class="space-y-4">
        <label class="block">
          <span class="block text-sm font-medium">Title</span>
          <input name="title" [(ngModel)]="model.title" required class="mt-1 p-2 border rounded w-full"/>
        </label>
        <label class="block">
          <span class="block text-sm font-medium">Description</span>
          <textarea name="description" [(ngModel)]="model.description" rows="4"
                    class="mt-1 p-2 border rounded w-full"></textarea>
        </label>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded">Save</button>
      </form>
    </section>
  `
})
export class ListingEditPageComponent {
  model: any = {title: '', description: ''};
  private http = inject(HttpClient);
  private router = inject(Router);

  save() {
    // edit.component.ts  (PUT update)
    this.http.put(
      `https://api.jsonbin.io/v3/b/${environment.jsonBin.id}`,
      this.model,
      {headers: {'X-Access-Key': environment.jsonBin.master}}
    ).subscribe(() => this.router.navigate(['..']));
  }
}
