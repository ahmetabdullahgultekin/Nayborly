import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ViewPostComponent} from '../component/view-post/view-post.component';

@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ViewPostComponent],
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.css'
})
export class ListingDetailPageComponent {

}
