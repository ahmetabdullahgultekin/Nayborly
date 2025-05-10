import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ListingFlowComponent} from '../component/listing-flow/listing-flow.component';

@Component({
  selector: 'app-listings-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ListingFlowComponent],
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css'
})
export class ListingPageComponent {

}
