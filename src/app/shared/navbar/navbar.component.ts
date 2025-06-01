import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {APP_ROUTES} from '../../app.routes';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;
  showDropdown = false;
  dropdownTimeout: any;
  APP_ROUTES = APP_ROUTES;
  userAvatarUrl: string | null = null;

  constructor(private authService: AuthService) {
    if (this.isLoggedIn() && this.authService.getCurrentUser) {
      const user = this.authService.getCurrentUser();
      this.userAvatarUrl = user?.avatarUrl || null;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onDropdownEnter() {
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
    this.showDropdown = true;
  }

  onDropdownLeave() {
    this.dropdownTimeout = setTimeout(() => {
      this.showDropdown = false;
    }, 200); // 200ms delay to allow mouse to move
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.signOut();
  }
}
