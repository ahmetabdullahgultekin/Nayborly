import {Component, inject} from '@angular/core';
import {LoadingService} from '../../core/services/loading.service';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './loading.component.html',
  standalone: true,
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  svc = inject(LoadingService);
}
