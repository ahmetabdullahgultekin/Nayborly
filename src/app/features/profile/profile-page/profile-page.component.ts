import {Component} from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {APP_ROUTES} from '../../../app.routes';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf,
    DatePipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(private authService: AuthService) {
  }

  get user() {
    return this.authService.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
