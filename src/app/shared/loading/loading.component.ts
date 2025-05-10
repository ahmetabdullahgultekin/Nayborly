import {Component, inject} from '@angular/core';
import {LoadingService} from '../../core/services/loading.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [
    NgIf
  ],
  template: `
    <ng-container *ngIf="svc.loading()">
      <div class="backdrop">
        <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    </ng-container>
  `,
  standalone: true,
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  svc = inject(LoadingService);
}
