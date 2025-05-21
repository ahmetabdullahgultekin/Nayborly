import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {EditPostComponent} from '../component/edit-post/edit-post.component';

@Component({
  selector: 'app-listing-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, EditPostComponent],
  templateUrl: './listing-edit-page.component.html',
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
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(() => this.router.navigate(['..']));
  }
}
